// declarate modules
let db = require('../../db/conexion');

let cl = {};


cl.GetTicketClient = async (req, res) => {
    let {id} = req.params
    const ticket=  await db.query(' select th.title,th.description,th.date_created,th.hour_created,ts.name,ts.color,ts.porcentaje,tsm.name from tblticket_history as th  inner join tblticket_status as ts on(th.id_estado = ts.id) inner join tblsystem_module as tsm on(th.id_modulo=tsm.id) where   th.id_user=? and th.id_modulo=? ', [req.userId,id]);
    res.status(200).json(ticket);
  
};


cl.PostTicket = async (req, res) => {
    let {id}=req.params;
    let {title,description,id_service } = req.body;
    console.log(req.body)
    await db.query('INSERT INTO `Ticket`.`tblticket_history` (`id_user`, `title`, `description`,`image`,`date_created`,`hour_created`,`id_servicio`,`id_estado`,`id_modulo`) VALUES( ?, ? , ?,null,current_date()  ,current_time() , ?,1,?); ', [req.userId,title,description,id_service,id]);
    res.status(200).json({msg:'Todo Salio bien'});

};




module.exports= cl;