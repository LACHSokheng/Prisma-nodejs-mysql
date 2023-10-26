const express = require('express')
const router = express.Router();
const service = require('..//services/profile.service')


router.get('/', service.getAllProfile)
router.get('/:id', service.getByIdProfile)
router.post('/', service.createProfile)
router.put('/:id', service.updateProfile)
router.delete('/:id', service.deleteProfile)


module.exports = router;