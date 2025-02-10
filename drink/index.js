var express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('HI DRINK!')
  })
  
  app.listen(port, () => {
    console.log(`Drink app is running at PORT ${port}`)
  })