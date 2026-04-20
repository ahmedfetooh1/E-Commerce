const exress = require('express');
const app = exress();
const bodyParser = require("body-parser")
const morgan = require('morgan')
const mongoose = require('mongoose')


// middleWare
app.use(bodyParser.json());
app.use(morgan('tiny'))


require('dotenv/config')


const api = process.env.API_URL

app.post(`${api}/products`,(req,res)=>{
    const product = {
        id : 1, 
        name : 'hair dresser',
        image : 'some url'
    }
    res.send(product);
})





// connect to mongo atlas database 
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
        console.error("Connection error:", err.message);
    });



// running backend server
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})