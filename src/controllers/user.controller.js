const express = require('express')
const service = require ('../services/user.service')

const router = express.Router();

router.post('/',service.createUserWithProfile );
router.post('/', service.createUserWithPosts);

module.exports = router;