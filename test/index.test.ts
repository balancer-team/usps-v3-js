import test from 'node:test'
import assert from 'node:assert'
import { USPS } from '../src/index'
import 'dotenv/config'

// Tests assume a .env file with USPS_CLIENT_ID and USPS_CLIENT_SECRET

const clientId = process.env.USPS_CLIENT_ID
const clientSecret = process.env.USPS_CLIENT_SECRET

const usps = new USPS({ clientId, clientSecret })

test('Address lookup', async () => {
  const data = await usps.getAddress({
    streetAddress: '302 Riverside Drive',
    city: 'Melbourne Beach',
    state: 'FL',
  })

  assert.strictEqual(data.address.ZIPCode, '32951')
  assert.strictEqual(data.address.ZIPPlus4, '2142')
})

test('City/State lookup', async () => {
  const data = await usps.getCityState({
    ZIPCode: '90210',
  })

  assert.strictEqual(data.city, 'BEVERLY HILLS')
  assert.strictEqual(data.state, 'CA')
  assert.strictEqual(data.ZIPCode, '90210')
})
