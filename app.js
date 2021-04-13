const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/api/v1', routes);


// Global error handlers
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})


app.listen(3001, () => console.log('Quote API listening on port 3001!'));