const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbSession=require('connect-mongodb-session')(session);
const bcrypt=require('bcrypt');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
const router = require('./routes');
const Users = require('./model/Users');
const Callback = require('./model/Callbacks');
const Products = require('./model/Products');
const Payments = require('./model/Payments');

const Razorpay = require('razorpay');

mongoose.connect("mongodb+srv://Monisha:Monivardhan12@cluster0.74djkap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("mongoose connected!"));

const store=new mongodbSession({
    uri:"mongodb+srv://Monisha:Monivardhan12@cluster0.74djkap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    collection:"sass-session"
})



//razorpay setup
const razorpay = new Razorpay({
    key_id: 'rzp_test_1L3v9gzg9nkoYo',
    key_secret: 'et6TgSCcvo4ygU4RsNIaQVBZ',
})


//session setup
app.use(session({
    secret:"this is a secret",
    resave:false,
    saveUninitialized:false,
    store:store
}))


//routes
app.use('/', router);
app.use('/request-callback', router);
app.use('/callbacks', router);
app.use('/update-callback',router);
app.use('/login', router);
app.use('/register', router);
app.use('/create-user', router);
app.use('/auth', router);
app.use('/api-callbacks',router);
app.use('/products', router);
app.use('/create-product', router)
app.use('/store-product', router)
app.use('/edit-prouct', router)
app.use('/update-product', router)
app.use('/active-service', router)
app.use('/checkout', router)
app.use('/payment-success', router);
app.use('/paid-users', router);
app.use('*', router);





//routes end
app.listen(3001, () => {
    console.log("server running on port 3001")
})

