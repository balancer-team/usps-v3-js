import test from 'node:test'
import assert from 'node:assert'
import { USPS } from '../src/index'
import 'dotenv/config'

// Tests assume a .env file with USPS_CLIENT_ID and USPS_CLIENT_SECRET

const clientId = process.env.USPS_CLIENT_ID
const clientSecret = process.env.USPS_CLIENT_SECRET

const usps = new USPS({ clientId, clientSecret })

test('Test test', () => {
  console.log(usps)
})

test('Address lookup', async () => {
  const address = await usps.getAddress({
    streetAddress: '302 Riverside Drive',
    city: 'Melbourne Beach',
    state: 'FL',
  })

  console.log(address)

  // assert.strictEqual(address.firm, 'USPS')
  // assert.strictEqual(address.address.Address2, '123 MAIN ST')
  // assert.strictEqual(address.address.City, 'SPRINGFIELD')
  // assert.strictEqual(address.address.State, 'IL')
  // assert.strictEqual(address.address.Zip5, '62701')
})

test('City/State lookup', async () => {
  const cityState = await usps.getCityState({
    ZIPCode: '90210',
  })

  console.log(cityState)

  // assert.strictEqual(cityState.city, 'BEVERLY HILLS')
  // assert.strictEqual(cityState.state, 'CA')
  // assert.strictEqual(cityState.ZIPCode, '90210')
})
