import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler =webpack(config);

//telling our app to use middleware to the compiler
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo:true,
    publicpath:config.output.publicPath
}));

//set the path for connection
app.get('/', function (req, res) {                             //tellS express which routes should it handle
res.sendFile(path.join(__dirname, '../src/index.html'));

}); 

app.get('/users', function(req, res){
    //hard coding for simplicity. Pretend this hits the real database.
    res.json([
        {
          "id": 1,
          "firstName": "Bob",
          "lastName": "Smith",
          "email": "bob@gmail.com"
        }, {
          "id": 2,
          "firstName": "Tommy",
          "lastName": "norton",
          "email": "tommy@gmail.com"
        }, {
          "id": 3,
          "firstName": "Tina",
          "lastName": "Lee",
          "email": "lee@gmail.com"
        }
    ]);
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        open('http://localhost:'+port);
    }
});