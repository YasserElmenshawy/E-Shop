const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ordersRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');
const { options } = require('./routes/product');
const api = process.env.API_URL;


app.use(cors());
app.options('*',cors());

//middleware 
app.use(bodyParser.json());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(morgan('tiny'));

//routes
app.use(`${api}/product/`,productRoutes)
app.use(`${api}/category/`,categoryRoutes)
app.use(`${api}/user/`,userRoutes)
app.use(`${api}/order/`,ordersRoutes)


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=> {
    console.log('DataBase connection is ready..... ');
})
.catch((err)=> {
    console.log(err);
});

app.listen(3000,()=> {
    console.log('server is ruuning http://localhost:3000');
});