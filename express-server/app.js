const express = require('express');
const app = express();
const path = require('path');

/*CORS stands for Cross Origin Resource Sharing and allows modern web browsers to be able to send AJAX requests and receive HTTP responses for resource from other domains other that the domain serving the client side application.*/
const cors = require('cors');

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Our JWT logic. Uses express-jwt which is a middleware that validates JsonWebTokens and sets req.user.
const jwt = require('./_helpers/jwt');


// Our error handler
const errorHandler = require('./_helpers/error-handler');

// Handle serving frontend paths
app.use('/', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/dashboard', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/admin', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/user', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/mealList', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/communityList', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/login', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));
app.use('/register', express.static(path.join(__dirname + '../../pickmymeal-frontend/dist/pickmymeal-frontend')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

// Handle protected api paths
app.use('/api/user', require('./routes/user.router'));
app.use('/api/foodlist', require('./routes/foodlist.router'));



app.use(errorHandler);


// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const hostname = '0.0.0.0';
app.listen(port, hostname, function () {
  console.log('Server listening on port ' + port);
});