const express = require('express');
const router = express.Router();
const verifyToken = require('../../security/verifyTokenAgent');
const { GetTicketAgent, UpdateTicketStatus} = require('../../controller/agent/ticket.controller');

const { Profile} = require('../../controller/agent/agent.controller');

router.get('/profile',verifyToken,Profile);
router.get('/ticket/history', verifyToken,GetTicketAgent);

router.put('/ticket', verifyToken,UpdateTicketStatus);

module.exports = router;