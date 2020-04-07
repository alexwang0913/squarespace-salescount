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

let totalSales = 0
app.get('/', (req, res) => {
  const url = 'https://api.squarespace.com/1.0/commerce/transactions?modifiedAfter=2017-01-01T12:00:00Z&modifiedBefore=2020-04-15T14:30:00Z';
  totalSales = 0
  fetchData(url, res)
})



function fetchData(url, res) {
  const options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      "Authorization": "Bearer faf514f8-bb5f-4f07-807c-0121512036bd"
    }
  }
  request(options, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      const { documents, pagination } = JSON.parse(body)


      for (var i = 0; i < documents.length; i++) {
        const document = documents[i]
        const value = parseFloat(document.totalSales.value)
        totalSales += Math.ceil(value / 7.95)
      }

      if (pagination.hasNextPage) {
        fetchData(pagination.nextPageUrl, res)
      } else {
        totalSales += 1000;

        res.send(totalSales.toString())
      }
    }
  })
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))