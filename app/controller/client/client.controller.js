// declarate modules
let db = require('../../db/conexion');

let cl = {};

cl.Profile = async (req, res) => {
    let data = await db.query('select cu.name,tuc.email,cu.telephone,cu.cellphone,cu.direction from tblclient_user as cu inner join  tbluser_credenciales as tuc on (cu.id_user=tuc.id) where  cu.id_user=? ', [req.userId]);
    let ticket = await db.query(' select th.id, th.title,th.description,DATE_FORMAT(th.date_created, "%y-%m-%d" ) as fecha ,th.hour_created,ts.name as estado,ts.color,ts.porcentaje,tsm.name from tblticket_history as th  inner join tblticket_status as ts on(th.id_estado = ts.id) inner join tblsystem_module as tsm on(th.id_modulo=tsm.id) where th.id_user=? ', [req.userId]);

    if (!data) {
        return res.status(404).send("No user found.");
    }
 
    res.status(200).json({ data, ticket });
};





module.exports = cl;