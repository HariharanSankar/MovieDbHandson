const express =require('express');
const popularityRouter = require('./router/popularityRouter');
const genreRouter=require('./router/genreRouter')
const app=express();

app.use('/popularity',popularityRouter);
app.use('/genre',genreRouter);

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));



