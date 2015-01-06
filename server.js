var express = require('express'),
    rocketLauncher = require("./driver"),
    app     = express();

launcher = new rocketLauncher.RocketLauncher();

app.use(express.static(__dirname + '/public'));

app.get('/rl/:cmd', function(req,res) {


    var result = launcher.runCommand(req.params.cmd);
    console.log(req.params.cmd);
   res.send({
        result: result
    });
});


app.listen(3450);
console.log('localhost:3450');


