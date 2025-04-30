# usps-v3-js

Library for interfacing with the USPS v3 API. The USPS v3 API replaces the legacy Web Tools API.

### Installation

```bash
npm i @balancer-team/usps-v3
```

### Usage

Import and configure the library

```javascript
import { USPS } from '@balancer-team/usps-v3'

const usps = new USPS({
  clientId: USPS_CLIENT_ID,
  clientSecret: USPS_CLIENT_SECRET,
})
```

Validate an address

```javascript
const data = await usps.getAddress({
  streetAddress: '302 Riverside Drive',
  city: 'Melbourne Beach',
  state: 'FL',
})

// Response:
//
// {
//   firm: '',
//   address: {
//     streetAddress: '302 RIVERSIDE DR',
//     streetAddressAbbreviation: '302 RIVERSIDE DR',
//     secondaryAddress: '',
//     cityAbbreviation: 'MELBOURNE BCH',
//     city: 'MELBOURNE BCH',
//     state: 'FL',
//     ZIPCode: '32951',
//     ZIPPlus4: '2142',
//     urbanization: ''
//   },
//   additionalInfo: {
//     deliveryPoint: '02',
//     carrierRoute: 'C001',
//     DPVConfirmation: 'Y',
//     DPVCMRA: 'N',
//     business: 'N',
//     centralDeliveryPoint: 'N',
//     vacant: 'N'
//   },
//   corrections: [ { code: '', text: '' } ],
//   matches: [ { code: '31', text: 'Single Response - exact match' } ]
// }
```

Look up a city/state by ZIP code

```javascript
const data = await usps.getCityState({
  ZIPCode: '90210',
})

// Response:
//
// {
//    city: 'BEVERLY HILLS',
//    state: 'CA',
//    ZIPCode: '90210'
// }
```
