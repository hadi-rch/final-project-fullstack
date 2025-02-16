const express = require("express") 
const dotenv = require('dotenv');
const cors = require('cors')
const router = require("./src/routes/main")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/docs/swagger-api-docs.json');




dotenv.config();
const app = express();
const port = 8080

var corsOptions = {
  origin: '*', // ini merupakan host frontend yang nantinya akan menggunakan backend ini
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const options = {
  customCssUrl: 'https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css'
};


app.use(cors(corsOptions))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use("/", router)


app.listen(port,() => {
console.log(`listening on port ${port}`);
});