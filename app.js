require('dotenv').config();
// async errors
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// MiddleWare
app.use(express.json());

// Routes

app.get('/',(req,res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products routes</a>');
})

app.use('/api/v1/products',productsRouter);

// products routes 




app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000 ;

const start = async() => {
    try{
        // Connect DB
        await connectDB(process.env.MONGO_URI)
        console.log('db is connected');
        app.listen(PORT,()=>{console.log('server is high')});
    }catch(e){
        console.log(e);
    }
}

start(); 