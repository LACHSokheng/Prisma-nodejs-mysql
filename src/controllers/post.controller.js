const express = require('express');
const service = require('../services/post.service')
const router = express.Router();

router.post('/', service.createPostForUser);

module.exports = router;
