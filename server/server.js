const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouters = require('./routers/authRoutes');
const prisonsRouters = require('./routers/prisonsRouters');
const prisonersRouters = require('./routers/prisonersRouters');
const skillsRouter = require('./routers/skillsRouters');

const app = express();

app.use(express.json(), helmet(), cors());


app.use('/auth', authRouters);
app.use('/prisons', prisonsRouters);
app.use('/prisoners', prisonersRouters);
app.use('/skills', skillsRouter);

module.exports = app;