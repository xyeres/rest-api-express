const express = require('express');
const app = express();
const routes = require('./routes');

// JSON-ify requests
app.use(express.json());
// Set routes to flow throw API versioning endpoint
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