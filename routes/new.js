var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
    res.render('new', { title: 'New Message' });
});

router.post('/', [
    body('author', 'enter a username')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('content', 'enter message')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        const message = new Message({
            author: req.body.author,
            content: req.body.content,
            date: new Date(),
    }   );

        if(!errors.isEmpty()) {
            res.render('new', {
                title: 'New Message',
            })
        }
        else {
            await message.save();
            res.redirect('/');
        }
    })
]);

module.exports = router;