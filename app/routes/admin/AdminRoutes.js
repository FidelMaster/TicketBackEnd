const express = require('express');
const router = express.Router();
const verifyToken = require('../../security/verifyTokenAdmin');
const { ProfileAdmin,AllClient,AllEmployee,PostEmployee} = require('../../controller/admin/admin.controller');


router.get('/profile',verifyToken,ProfileAdmin);
router.get('/client/all',verifyToken,AllClient);
router.get('/employee/all',verifyToken,AllEmployee);

router.post('/employee',verifyToken,PostEmployee);

module.exports = router;