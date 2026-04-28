const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');


app.use(cors());


// middleWare
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


// Routes 
const categoriesRoutes = require('./routes/categories.js')
const productsRouter = require('./routes/products.js')
const usersRoutes = require('./routes/users.js')
const ordersRoutes = require('./routes/orders.js')


const api = process.env.API_URL

// Routes
app.use(`${api}/categories`,categoriesRoutes)
app.use(`${api}/products`,productsRouter)
app.use(`${api}/users`,usersRoutes)
app.use(`${api}/orders`,ordersRoutes)







// Database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.error("Connection error:", err.message);
    });



// Server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})