const exress = require('express');
const app = exress();
const bodyParser = require("body-parser")
const morgan = require('morgan')
const mongoose = require('mongoose')


require('dotenv/config')


// middleWare
app.use(bodyParser.json());
app.use(morgan('tiny'));


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