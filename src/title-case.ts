const abbreviations = ['NE', 'NW', 'SE', 'SW']

// Assumes input is all caps
export function titleCase(input: string) {
  const words = input.split(' ')
  const titleCasedWords = words.map((word) => {
    if (abbreviations.includes(word)) return word
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  })
  return titleCasedWords.join(' ')
}
