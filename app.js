const express =require('express');
const popularityRouter = require('./router/popularityRouter');
const genreRouter=require('./router/genreRouter')
const app=express();
const swaggerUI = require('swagger-ui-express')
    

//Routers
app.use('/popularity',popularityRouter);
app.use('/genre',genreRouter);

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));




//Swagger Validation
// const swaggerOptions ={​​​​​​​
//     openapi:"3.0.1",
//     info: {​​​​​​​​
//         version:"1.0.0",
//         title:"APIs Document",
//         description:"your description here",
//         termsOfService:"",
//         contact: {​​​​​​​​
//                 name:"abc",
//                  email:"abc@xyz.com",      
//           }​​ ​    ​​​
//       }     
// }​​​​; 
// ​​app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions));
  


//const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');
// const swaggerOptions = {
//     swaggerDefinition: {
//       info: {
//         title: "movie API",
//         version :  '1.0.0',
//       },
//     },
//     apis: ["app.js"],
//   };
  
//   const swaggerDocs = swaggerJsDoc(swaggerOptions);
//   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



