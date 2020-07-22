// in this controller is use for controll session for client
let db = require('../../db/conexion');
let AUTH = {};




AUTH.UpdateTicketStatus = async (req, res) => {
    let { id, state } = req.body;
    await db.query('update tblticket_history set id_estado=? where id=?', [id, state]);
    res.status(200).json({ msg: 'Todo Salio bien' });

};


AUTH.GetTicketAgent  = async (req, res) => {
    
    let ticket = await db.query(' select th.title,th.description,th.date_created,th.hour_created,ts.name,ts.color,ts.porcentaje,tsm.name from tblticket_history as th  inner join tblticket_status as ts on(th.id_estado = ts.id) inner join tblsystem_module as tsm on(th.id_modulo=tsm.id) where  th.id_modulo=? ', [req.userId]);
    res.status(200).json(ticket);

};








module.exports = AUTH;
