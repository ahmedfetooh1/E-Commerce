const exress = require('express');
const app = exress();
const bodyParser = require("body-parser")
const morgan = require('morgan')


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

app.listen(3000,()=>{
    console.log("server is running http://localhost:3000");
})