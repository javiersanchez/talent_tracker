var express = require('express');
var app = express();

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

  //res.send('Hello World!')2
    var context = {name:"Marco", user:"Julius Papagorgio"};
    
    res.render("create", context);

})

app.post('/create', function (req, res) {
  res.send("Name: " + req.body.name + "</ br>" +
           "Job position: " + req.body.job_position + "</ br>" +
           "Area: " + req.body.area + "</ br>" +
           "Potential: " + req.body.potential + "</ br>" +
           "Career: " + req.body.career + "</ br>" +
           "Status: " + req.body.status + "</ br>" +
           "Key contributor: " + req.body.key_contributor + "</ br>" +
           "Specialist critical: " + req.body.specialist_critical + "</ br>" +
           "Probability of loss: " + req.body.probability_of_loss + "</ br>" +
           "Impact loss: " + req.body.impact_loss + "</ br>" +
           "Areas to develop: " + req.body.areas_to_develop + "</ br>" +
           "Strengths: " + req.body.strengths + "</ br>" +
           "Relevant technical knowledge: " + req.body.relevant_technical_knowledge + "</ br>" +
           "Commercial: " + req.body.commercial + "</ br>" +
           "marketing: " + req.body.marketing + "</ br>" +
           "Administration: " + req.body.administration + "</ br>" +
           "Finance: " + req.body.finance + "</ br>" +
           "Human resources: " + req.body.human_resources + "</ br>" +
           "Product: " + req.body.product + "</ br>" +
           "IT: " + req.body.it + "</ br>" +
           "Movement time for areas of interest: " + req.body.movement_time_areas_interest + "</ br>" +
           "Movement time for international mobility: " + req.body.movement_time_international_mobility + "</ br>" +
           "Possibility of development: " + req.body.possibility_of_development + "</ br>" +
           "Time development movement possibility: " + req.body.time_development_movement_possibility + "</ br>" +
           "Representation: " + req.body.representation + "</ br>" +
           "Strategic vision: " + req.body.strategic_vision + "</ br>" +
           "Business understanding and capacity analisys: " + req.body.business_understanding + "</ br>" +
           "Succesor A: " + req.body.succesor_a + "</ br>" +
           "Succesor B: " + req.body.succesor_b + "</ br>" +
           "Succesor C: " + req.body.succesor_c
           );
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