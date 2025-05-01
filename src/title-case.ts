const TOKENS = /(\S+)|\s/g
const ALPHANUMERIC_PATTERN = /[\p{L}\p{N}]+/gu

const WORD_SEPARATORS = new Set(['—', '–', '-', '―', '/'])

const SENTENCE_TERMINATORS = new Set(['.', '!', '?', '\n', '\r'])

const TITLE_TERMINATORS = new Set([...SENTENCE_TERMINATORS, ':', '"', "'", '”'])

const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'because',
  'but',
  'by',
  'en',
  'for',
  'if',
  'in',
  'neither',
  'nor',
  'of',
  'on',
  'only',
  'or',
  'over',
  'per',
  'so',
  'some',
  'than',
  'that',
  'the',
  'to',
  'up',
  'upon',
  'v',
  'versus',
  'via',
  'vs',
  'when',
  'with',
  'without',
  'yet',
])

export function titleCase(input: string) {
  input = input.toLocaleLowerCase('en-US')

  const smallWords = SMALL_WORDS
  const wordSeparators = WORD_SEPARATORS
  const terminators = TITLE_TERMINATORS
  let result = ''
  let isNewSentence = true

  // tslint:disable-next-line
  for (const m of input.matchAll(TOKENS)) {
    const { 0: match, 1: token, index = 0 } = m

    if (!token) {
      result += match
      if (terminators.has(match)) isNewSentence = true
      continue
    }

    const matches = Array.from(token.matchAll(ALPHANUMERIC_PATTERN))
    let value = token
    let isSentenceEnd = false

    for (let i = 0; i < matches.length; i++) {
      const { 0: word, index: wordIndex = 0 } = matches[i]
      const nextChar = token.charAt(wordIndex + word.length)

      isSentenceEnd = terminators.has(nextChar)

      // Always the capitalize first word and reset "new sentence".
      if (isNewSentence) {
        isNewSentence = false
      }

      // Handle simple words.
      else if (matches.length === 1) {
        // Avoid capitalizing small words, except at the end of a sentence.
        if (smallWords.has(word)) {
          const isFinalToken = index + token.length === input.length

          if (!isFinalToken && !isSentenceEnd) {
            continue
          }
        }
      }
      // Multi-word tokens need to be parsed differently.
      else if (i > 0) {
        // Avoid capitalizing words without a valid word separator,
        // e.g. "apple's" or "test(ing)".
        if (!wordSeparators.has(token.charAt(wordIndex - 1))) {
          continue
        }

        // Ignore small words in the middle of hyphenated words.
        if (smallWords.has(word) && wordSeparators.has(nextChar)) {
          continue
        }
      }

      value = upperAt(value, wordIndex)
    }

    result += value
    isNewSentence = isSentenceEnd || terminators.has(token.charAt(token.length - 1))
  }

  return result
}

function upperAt(input: string, index: number) {
  return input.slice(0, index) + input.charAt(index).toLocaleUpperCase('en-US') + input.slice(index + 1)
}
