var express = require('express');
var app = express();


//Llamamos Handlebars para usarlo en el proyecto y asignamos un layout (default)
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});


//Asignación de HB como engine de rendereo
app.engine('handlebars', handlebars.engine);

//View set 
app.set('view engine', 'handlebars');
/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

//Asignar ruta publica pra elementos estaticos
app.use(express.static(__dirname + "/public"));


app.get('/login', function (req, res) {
  res.render('login');
})

app.post('/login', function (req, res) {
  res.send('Hello World!')
})

app.get('/search', function (req, res) {
  res.send('Hello World!')
})

app.post('/search', function (req, res) {
  res.send('Hello World!')
})

app.get('/search_result', function (req, res) {
  res.send('Hello World!')
})

app.post('/search_result', function (req, res) {
  res.send('Hello World!')
})

app.get('/create', function (req, res) {
  res.send('Hello World!')
})

app.post('/create', function (req, res) {
  res.send('Hello World!')
})

app.get('/edit/:id', function (req, res) {
  res.send('Hello World!')
})

app.post('/edit/:id', function (req, res) {
  res.send('Hello World!')
})

app.get('/view/:id', function (req, res) {
  res.send('Hello World!')
})

app.post('/view/:id', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})