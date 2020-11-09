# lvlup.js
API wrapper for LVLUP

##Example 1
```javascript
const {default: Lvlup} = require('lvlup.js')

const lvlup = new Lvlup("API KEY", {
    sandbox: false
})

(async () => {
    const services = await lvlup.services.list()
    console.log(services)
})
```

##Example 2
```typescript
import lvlup from '@zqr33/lvlup.js'

const lvlup = new Lvlup("API KEY", {
    sandbox: false
})

(async () => {
    const services = await lvlup.services.list()
    console.log(services)
})
```