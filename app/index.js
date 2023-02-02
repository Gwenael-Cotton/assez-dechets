const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const eventRouter = require('./routers/event');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const errorRouter = require('./routers/error');
const db = require('./models/database');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', eventRouter);
app.use('/api', userRouter);
app.use('*', errorRouter);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
}

module.exports = app;
