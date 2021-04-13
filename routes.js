const express = require('express');
const router = express.Router();
const records = require('./records');

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

// Get list of quotes
router.get('/quotes', asyncHandler(async (req, res) => {
    const quotes = await records.getQuotes();
    res.json(quotes);
}));

router.get('/quotes/quote/random', asyncHandler(async (req, res) => {
    const quote = await records.getRandomQuote();
    res.json(quote);
}))

// Get specific quote
router.get('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        res.json(quote);
    } else {
        res.status(404).json({ message: "Quote not found." })
    }
}));

// Create a quote
router.post('/quotes', asyncHandler(async (req, res) => {
    if (req.body.quote && req.body.author) {
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        })
        res.status(201).json(quote)
    } else {
        res.status(400).json({ message: "Quote and author required." })
    }
}));

// Update a quote
router.put('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        quote.quote = req.body.quote;
        quote.author = req.body.author;
        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found" })
    }
}));

// Delete a quote
router.delete('/quotes/:id', asyncHandler(async (req, res, next) => {
    const quote = await records.getQuote(req.params.id);
    if (quote) {
        await records.deleteQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Quote not found" })
    }
}));

module.exports = router;