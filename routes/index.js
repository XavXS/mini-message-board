const Message = require('../models/message');
var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');
const MSG_DISPLAY_COUNT = 100;

router.get('/', asyncHandler(async(req, res, next) => {
  const msgCount = await Message.countDocuments().exec();
  const msgLastN = (MSG_DISPLAY_COUNT > msgCount)? msgCount : MSG_DISPLAY_COUNT;
  const messages = await Message.find().skip(msgCount - msgLastN).exec();
  res.render('index', {
    title: 'Mini Message Board',
    messages: messages,
  });
}));

module.exports = router;
