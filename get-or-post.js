var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7362);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',function(req,res){
    var getParams = [];
    for (var param in req.query) {
        getParams.push({'name':param, 'value':req.query[param]});
    }
    var context = {};
    context.dataList = getParams;
    res.render('get-it', context);
});

app.post('/',function(req,res){
    var postParams = [];
    for (var para in req.query){
        postParams.push({'name':para, 'value':req.query[para]});
    }
    var sentParams = [];
    for (var sent in req.body) {
        sentParams.push({'name':sent, 'value':req.body[sent]});
    }
    var context = {};
    context.dataList = postParams;
    context.bodyList = sentParams;
    res.render('post-it', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});