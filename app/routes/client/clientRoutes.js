const express = require('express');
const router = express.Router();
const verifyToken = require('../../security/verifyTokenClient');
const {Profile} = require('../../controller/client/client.controller');
const {GetTicketClient,PostTicket } = require('../../controller/client/ticket.controller');


router.get('/profile',verifyToken,Profile);
router.get('/history/:id',verifyToken,GetTicketClient);

//POST Nethods
router.post('/create/Ticket/:id',verifyToken,PostTicket);



module.exports = router;