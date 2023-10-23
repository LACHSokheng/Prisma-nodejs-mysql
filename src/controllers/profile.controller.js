const express = require('express')
const router = express.Router();
const service = require('..//services/profile.service')


router.get('/', service.getAllProfile)
router.get('/:id', service.getByIdProfile)


module.exports = router;