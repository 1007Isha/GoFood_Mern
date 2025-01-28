const express = require('express')
const app = express()
const port = 5000
const mongoDB=require('./db')
const cors = require("cors")

mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(
  cors({
    origin: 'https://go-food-mern-ruddy.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/',require("./Routes/createuser"));
app.use('/api/',require("./Routes/DisplayData"));
app.use('/api/',require("./Routes/OrderData"));

app.use(
  cors({
    origin: 'https://go-food-mern-ruddy.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
