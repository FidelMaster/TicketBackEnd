// this file verify tokeb and confirma if user is admin
// the validate is the only admin access to info in route
// Modules
const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    try {
		console.log(req.headers.authorization)
        if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'DigitechTicket');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}

		if (payload.role==1) {
			req.userId = payload.id;	
		   next();
		}else{
			return res.status(401).send('Unauhtorized Request');
		}
		
        
      
        
    } catch (error) {
        return res.status(401).send({
            msg: 'Su Session no es valida favor vuelva a iniciar session'
          });
    }
  
}

module.exports = verifyToken;