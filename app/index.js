const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routers');
const authRouter = require('./routers/auth');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN_URL,
}));
app.use(express.json());

app.use(cookieParser());
// app.use(authToken);

app.use('/api', routes);
app.use('/api', authRouter);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
}

module.exports = app;
