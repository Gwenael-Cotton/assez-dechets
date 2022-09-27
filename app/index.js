const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

// import router from './routers';

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.use('/api', router);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
