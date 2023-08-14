const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const morgan = require('morgan');
var bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.set('view engine', 'react');
// app.use(morgan('tiny'));
// app.use(express.static('public'));

// app.use(express.json());
// app.use(express.urlencoded({
//     extended:true
// }));

require('dotenv').config();

// const DB = require(process.env.ROOT + '/ORM/ORM_init');

// app.use(sessions({
//     secret : 'thisismysecret',
//     saveUninitialized : true,
//     cookie : {maxAge : 60*60*1000*24},
//     resave : false,
// }));

// app.use(cookieParser());

app.use(require('./routes/loginRoutes/loginRoute'));
app.use(require('./routes/rootRoutes/rootRoute'));
app.use(require('./routes/registerRoutes/patientRegisterRoute'));
app.use(require('./routes/searchRoutes/searchPatientRoute'));
app.use(require('./routes/patientSummaryRoutes/patientSummaryRoute'));
app.use(require('./routes/patientSummaryRoutes/patientDemographyRoute'));


// const users = [
//   { id: 1, username: 'john_doe', name: 'John Doe', email: 'john.doe@example.com' },
//   { id: 2, username: 'jane_smith', name: 'Jane Smith', email: 'jane.smith@example.com' },
// ];

// API endpoint to get all users
// app.get('/api/users', (req, res) => {
//   console.log("here");
//   res.json(users);
// });