const express = require('express'); // Import the module of Express
const bodyParser = require('body-parser');
const router = express.Router();
const response = require('./network/response');

var app = express();                // Initialize our Express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));//If we want to send another body parser, just add it

//Alternatively as Express already has bodyParser
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

app.use(router);                    // Add Router to our Express app

//Separate by Routes
router.get('/message', function(req,res){
    
    //res.send('user'+req.params.id);
    console.log(req.headers);

    //We also can send Headers in the response.
    res.header({
        "custom-header" : 'Our value customized'
    });

    //Another way to set the header of cache
    res.set("Cache-Control", "public, max-age=300")

    //res.send('Message list');
    response.success(req, res, "Message list GET",201);
});
router.post('/message', function(req,res){
    //res.send('Message added');
    response.success(req, res, "Message list POST");
});
router.delete('/message', function(req,res){
    console.log(req.query);
    console.log(req.body);
    
    //res.send('Message '+req.body.text+' Deleted');
    res.send(`Mensaje ${req.body.text} deleted successfully`);
});
router.patch('/message', function(req,res){
    //res.send("Patch, one part of the information updated");
    //res.status(201).send();
    console.log(req.query);
    if(req.query.error == 'ok'){
        response.error(req, res, "Unexpected Error, try again later",500, 'es solo unan simulacion de los errores');
    }else{
        response.success(req, res, "Ok, No-Error",201);
    }

});
router.put('/message', function(req,res){
    //res.send("PUT, information updated");
    res.status(201).send({error:'', body:'Created succesfully'});
}); 
router.options('/message', function(req,res){
    //res.send("Options, information about the methods");
    res.status(202).send([{error:'', body:'Created succesfully'}]);
});
router.head('/message', function(req,res){
    res.send("Head, Same as GET but without the body");
});

// ----- Condensed methods -------
router.route("/")
.all((request, response, next) => {
   //Can work as middleware
    console.log("Accessed to the root /")
    next()
})
.get((request, response) => {
    response.send("Hi from get")
})
.post((request, response) => {
    response.send("Hi from post")
})
.delete((request, response) => {
    response.send("Hi from delete")
})



// To confirm it is working
// app.use('/', function(req, res){    // To any route, return a greeting using a function with
//     res.send('Hello!')              // req and res parameters.
// });

//Also:
//app.use('/', (req,res) => res.send("Hola") );

app.use('/app', express.static('public')); // public is the folder

app.listen(3000);                   // Indicate where to listen(port)
console.log('The app is listening in http://localhost:3000');