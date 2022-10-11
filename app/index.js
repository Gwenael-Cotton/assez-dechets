const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models/database');
const routes = require('./routers');
const authToken = require('./middleware/auth');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN_URL,
}));
app.use(express.json());

app.use(cookieParser());
app.use(authToken);

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
});
