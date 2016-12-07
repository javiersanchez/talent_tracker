var express = require('express');
var app = express();

firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDoRCqwF3xxMIh3AuzU4mQtvZ6i-n0xGuc",
    authDomain: "talent-tracker-be199.firebaseapp.com",
    databaseURL: "https://talent-tracker-be199.firebaseio.com",
    storageBucket: "talent-tracker-be199.appspot.com",
    messagingSenderId: "703826121754"
};
firebase.initializeApp(config);
var admin = require("firebase-admin");
var serviceAccount = require("./Talent_Tracker-73b9d4607dd9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://talent-tracker-be199.firebaseio.com"
});

//Llamamos Handlebars para usarlo en el proyecto y asignamos un layout (default)
var handlebars = require('express-handlebars').create(
    {defaultLayout: 'main',
                                                      helpers:{
                                                          section: function(name, options){
                                                              if(!this._sections) this._sections = {};
                                                              this._sections[name] = options.fn(this);
                                                              return null;
                                                          }
                                                        }
                                                      });

//Asignación de HB como engine de rendereo
app.engine('handlebars', handlebars.engine);

//View set 
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({extended:true}));

/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

//Asignar ruta publica pra elementos estaticos
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.redirect("/login");
});
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
    //Prepare for autocomplete
    var db = admin.database();
var ref = db.ref('users');
  res.send(ref);
})

app.post('/search_result', function (req, res) {
  res.send('Hello World!')
})

app.get('/create', function (req, res) {
    
 /*
  var tName= "tName";
    var tPosition= "tPosition";
    var tArea= "tArea";
    var btnSave= "btnSave";
    var form= '<form action="/create" method="post">'
            + '<label for="'+tName+'">Name</label><br/>'
            + '<input id="'+tName+'" name="'+tName+'" type="text" /><br/>'
            + '<label for="'+tPosition+'">Position</label><br/>'
            + '<input id="'+tPosition+'" name="'+tPosition+'" type="text" /><br/>'
            + '<label for="'+tName+'">Area of interest</label><br/>'
            + '<input id="'+tArea+'" name="'+tArea+'" type="text" /><br/>'
            + '<button id="'+btnSave+'" name="'+btnSave+'" type="submit">Save</button><br/>'
            + '</form>'
   // res.send(form)
    //res.render('create');
    */

  //res.send('Hello World!')2
   // var context = {name:"Marco", user:"Julius Papagorgio"};
    
    res.render("create");
})

app.post('/create', function (req, res) {
    var person = req.body;
    
    var db = firebase.database();		
    var tabla = db.ref().child("partners");	
    tabla.push().set( {
        name: person.tName,
        job_position: req.body.tPosition,
        area_of_interest : req.body.tArea
    });
    
    res.send(req.body)
})

app.get('/edit/:id', function (req, res) {
  res.send('Hello World!')
})

app.post('/edit/:id', function (req, res) {
  res.send('Hello World!')
})

app.get('/view/:id', function (req, res) {
    res.render("view");
  //res.send('Hello World!')
})

app.post('/view/:id', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})