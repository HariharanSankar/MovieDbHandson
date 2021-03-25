import express from 'express'
import popularityRouter from'./router/popularityRouter'
import genreRouter from './router/genreRouter'
const app=express();
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json'

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//Routers
app.use('/popularity',popularityRouter);
app.use('/genre',genreRouter);

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));





