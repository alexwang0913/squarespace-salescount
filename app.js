const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const request = require('request')

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,cache-control"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of mddleware
  next();
});

app.get('/', (req, res) => {

  const options = {
    url: 'https://api.squarespace.com/1.0/commerce/transactions?modifiedAfter=2017-01-01T12:00:00Z&modifiedBefore=2020-04-15T14:30:00Z',
    headers: {
      'User-Agent': 'request',
      "Authorization": "Bearer faf514f8-bb5f-4f07-807c-0121512036bd"
    }
  }
  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      const { documents } = JSON.parse(body)
      console.log(documents)
      let totalSales = 0
      // for (var i = 0; i < documents.length; i++) {
      //   const document = documents[i]
      //   totalSales += parseInt(document.totalSales.value)
      // }
      totalSales = documents.length

      totalSales += 800;

      res.send(totalSales.toString())
    }
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))