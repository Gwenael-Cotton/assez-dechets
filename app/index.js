const express = require('express');
const routes = require('./routers');

const app = express();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));
