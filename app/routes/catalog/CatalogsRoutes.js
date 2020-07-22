//Route for auth Users
const express = require('express');
const router = express.Router();
const {GetServices,AllModule,AllServices,PostServices} = require('../../controller/catalogs/catalog.controller');
 


router.get('/services/all',AllServices);
router.get('/module/all',AllModule);
router.get('/services/module/:id',GetServices);


router.post('/service',PostServices);
module.exports = router;