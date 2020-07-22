module.exports = {
    validateRegister: (req, res, next) => {
      console.log("estoy aqui")
      // username min length 3
      if (!req.body.email) {
        return res.status(400).send({
          msg:'porfavor inserte un correo valido'
        });
      }
      // password min 6 chars
      if (!req.body.password || req.body.password.length < 6) {
        return res.status(400).send({
          msg: 'Porfavor inserte un password que tenga mas de 6 caracteres'
        });
      }
      // password (repeat) does not match
     
      next();
    },

    isLoggedIn: (req, res, next) => {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(
            token,
            'SECRETKEY'
          );
          req.userData = decoded;
          next();
        } catch (err) {
          return res.status(401).send({
            msg: 'Your session is not valid!'
          });
        }
      }
  };
  