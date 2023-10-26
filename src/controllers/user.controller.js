const express = require('express')
const service = require ('../services/user.service')

const router = express.Router();

router.post('/',service.createUserWithProfile );
router.get('/', service.getAllUser);
router.get('/:id', service.getUserbyId)
router.put('/:id', service.updateUser);
router.delete('/:id', service.deleteUser);



module.exports = router;