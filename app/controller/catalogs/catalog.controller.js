let db = require('../../db/conexion');

let catalog = {};


catalog.GetServices = async (req, res) => {
    let { id } = req.params;
    let ticket = await db.query(' select * from tblservices_catalog where id_modulo=?', [id]);
    res.status(200).json(ticket);

};

catalog.AllServices = async (req, res) => {
    let ticket = await db.query(' select * from tblservices_catalog');
    res.status(200).json(ticket);
};

catalog.PostServices = async (req, res) => {
    let { name, id_module } = req.body;
    await db.query(' insert tblservices_catalog(name,id_modulo) values (?,?)', [name, id_module]);
    res.status(200).json({ message: 'Success' });

};

catalog.AllModule = async (req, res) => {
    let data = await db.query('select * from tblsystem_module');
    res.status(200).json(data);
};

module.exports = catalog;