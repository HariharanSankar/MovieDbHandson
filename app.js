const express =require('express');
const popularityRouter = require('./router/popularityRouter');
const genreRouter=require('./router/genreRouter')
const app=express();
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require ('./swagger/swagger.json')
// removed for brevity
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//Routers
app.use('/popularity',popularityRouter);
app.use('/genre',genreRouter);

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));





