//If we want by default value in parameter level: , status = 200)
exports.success = function(req, res, message, status){  
    //res.send(message);
    res.status(status || 200).send({
        error: '',
        body: message
    });
}
exports.error = function(req, res, error, status, details){
    console.log("[Response error]: "+details);
    res.status(status || 500).send({
        error: error,
        body: ''
    });
}