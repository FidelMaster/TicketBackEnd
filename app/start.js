const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// set up port
const PORT = process.env.PORT || 3000;
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// add routes
//const router = require('./routes/AuthRoutes.js');

app.use(require('./routes/AuthRoutes.js'));
app.use('/api/client', require('./routes/client/clientRoutes.js') );
app.use('/api/agent', require('./routes/agent/agentRoutes.js') );
app.use('/api/catalog', require('./routes/catalog/CatalogsRoutes.js') );
app.use('/api/admin', require('./routes/admin/AdminRoutes.js') );
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));