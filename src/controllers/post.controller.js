const express = require('express');
const service = require('../services/post.service')
const router = express.Router();

router.post('/', service.createPostForUser);
router.get('/', service.getAllPost);
router.get('/:id', service.getPostById)

module.exports = router;
