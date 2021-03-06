const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const isAuth = require('./middleware/is-auth');
const cors = require('cors');
const path  = require('path');

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-eevxm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(8000);
}).catch(err => {
    console.log(err); 
});