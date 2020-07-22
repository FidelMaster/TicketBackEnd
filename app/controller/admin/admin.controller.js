let db = require('../../db/conexion');
const { query } = require('../../db/conexion');
let admin = {}




admin.ProfileAdmin = async (req, res) => {
    let product = await db.query('select * from tblinv_service order by id desc limit 8');
    let clients = await db.query('select * from tblclient_user order by id desc limit 10');
    let ticketP = await db.query('select count(id) as total from tblticket_history id_estado=1');
    let ticketT = await db.query('select count(id) as total from tblticket_history id_estado=4');
    let ticketS = await db.query('select count(id) as total from tblticket_history id_estado=3');
    let clientT = await db.query('select cound(id) from tblclient_user ');
    let services = await db.query('select * from tblservices_catalog order by id desc limit 5')

    res.status(200).json({ product, clients, ticketP, ticketS, ticketT, clientT, services });
}


admin.AllEmployee = async (req, res) => {
    let data = await db.query('select * from tblagent_user');
    res.status(200).json(data);
}

admin.PostEmployee = async (req, res) => {
    let { email, password, name, cellphone, position, id_module } = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).send({
                msg: err
            });
        } else {
            // has hashed pw => add to database
            let data = await db.query(
                `INSERT INTO tbluser_credenciales (email, password, id_role,last_signin) VALUES ( ${db.escape(
                    email
                )}, ${db.escape(hash)},2, now())`);


            await db.query(
                `INSERT INTO   tblclient_user(id_user,name,cellphone,position,id_module) VALUES ( ${db.escape(
                    data.insertId
                )}, ${db.escape(name)}, ${db.escape(cellphone)}, ${db.escape(position)}, ${db.escape(id_module)})`
            )

             
            return res.status(200).json({ message: 'Success' });



        }
    });
}

admin.AllClient = async (req, res) => {
    let data = await db.query('select * from tbluser_credenciales as tuc inner join  tblclient_user tc on(tc.id_user=tuc.id) ')
    res.status(200).json(data);
}

module.exports = admin;