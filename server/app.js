import express from 'express'
import popularityRouter from './router/popularityRouter'
import genreRouter from './router/genreRouter'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json'

const app=express();

// removed for brevity
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//Routers
app.use('/popularity',popularityRouter);
app.use('/genre',genreRouter);

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));





