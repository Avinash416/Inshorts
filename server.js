import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

//components
import Connection from './connection/db.js';
import Route from './routes/Route.js';
import DefaultData from './default.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use('/', Route);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const PORT = process.env.PORT ||8000;


const URL = `mongodb+srv://${username}:${password}@inshorts.jbnib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

Connection(process.env.MONGODB_URI || URL);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
}

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
DefaultData();

