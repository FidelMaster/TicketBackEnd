// in this controller is use for controll session for client
let db = require('../../db/conexion');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

let AUTH = {};



AUTH.LoginClient = async (req, res, next) => {

    await db.query(
        `SELECT *  FROM tbluser_credenciales WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Su usuario o password estan incorrectos'
                });
            }
            // check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                async (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        throw bErr;
                        return res.status(401).send({
                            msg: 'Correo o password estan incorrectos!'
                        });
                    }
                    if (bResult) {
                        const token = await jwt.sign({

                            id: result[0].id,
                            role: result[0].id_role
                        },
                            'DigitechTicket', {
                            expiresIn: 60 * 60 * 24
                        }
                        );
                        await db.query(
                            `UPDATE tbluser_credenciales SET last_signin = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).json({ token });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
}

AUTH.signUpClient = async (req, res, next) => {

    await db.query(
        `SELECT * FROM tbluser_credenciales WHERE LOWER(email) = LOWER(${db.escape(
            req.body.email
        )});`,
        async (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'El Correo ya se encuentra en uso'
                });
            } else {
                // se comprueba que el correo fue valido

                bcrypt.hash(req.body.password, 10, async (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        let data = await db.query(
                            `INSERT INTO tbluser_credenciales (email, password, id_role,last_signin) VALUES ( ${db.escape(
                                req.body.email
                            )}, ${db.escape(hash)},3, now())`);


                        await db.query(
                            `INSERT INTO   tblclient_user(id_user,name,cellphone,telephone,direction,clientType_id,id_subs) VALUES ( ${db.escape(
                                data.insertId
                            )}, ${db.escape(req.body.name)}, ${db.escape(req.body.cellphone)}, ${db.escape(req.body.telephone)}, ${db.escape(req.body.direction)}, ${db.escape(req.body.clientType_id)}, 1)`
                        )

                        const token = jwt.sign({ id: data.insertId }, 'DigitechTicket', {
                            expiresIn: 60 * 60 * 24 // expires in 24 hours
                        });
                        return res.status(200).json({ token });



                    }
                });
            }
        }
    );
};




AUTH.GetModule = async (req, res) => {

    const data = await db.query('select id_role from   tbluser_credenciales where id=? ', [req.userId]);
    if (!data) {
        return res.status(404).send("No user found.");
    }
    console.log(data)
    res.status(200).json(data[0].id_role);

};


AUTH.LogOut = (req, res) => {

    res.status(200).send({ auth: false, token: null });

};


module.exports = AUTH;