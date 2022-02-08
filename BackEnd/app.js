const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb')  //mongoDB connection handler
const { verifyAccessToken } = require('./helpers/jwt_helper')
//initialize app
const app = express();


//Routes
const AuthRoute = require('./Routes/Auth.route')
const IdDetailRoute = require('./Routes/Id_Detail.route')
// const UserRoute = require('./Routes/User.route')
// const AdminRoute = require('./Routes/Admin.route')



//env variables
const PORT = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Acess-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});


app.get('/', verifyAccessToken, async (req, res, next) => {
    res.send('<h1>Hello again!</h1>')
});

//  -----------Route Use--------------//
app.use('/uploads', express.static('uploads'))  // for image and pdf reading
app.use('/auth', AuthRoute);
// app.use('/user', UserRoute)
// app.use('/admin', AdminRoute)
app.use('/id', IdDetailRoute)








//-------------HTTP Error Handling -------//

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exist!!'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


//-------------PORT Listening -------//

app.listen(PORT, () => {
    console.log(`.....SERVER started at ${PORT}`)
});