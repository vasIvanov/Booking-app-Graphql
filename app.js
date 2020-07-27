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

app.use(cors());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.resolve(__dirname, 'public', 'index.html')));
})

mongoose.connect(
    `mongodb+srv://vas:dTYvEnEwxHDu7cQT@cluster0-eevxm.mongodb.net/events-graphql?retryWrites=true&w=majority`
).then(() => {
    app.listen(8000);
}).catch(err => {
    console.log(err); 
});