var express = require('express');
var app = express();

var fs = require('fs');

var path = require('path');
var mime = require('mime');

var pdf = require('html-pdf');

var http = require('http');

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
  credential: admin.credential.cert("./Talent_Tracker-73b9d4607dd9.json"),
  databaseURL: "https://talent-tracker-be199.firebaseio.com"
});

//Llamamos Handlebars para usarlo en el proyecto y asignamos un layout (default)
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    checkSelector: function (v1, v2, options) {

      if (v1 == v2) {

        return options.fn(this);
      } else {

        //return options.inverse(this);    
        return null;
      }

    }
  }
});

//Asignación de HB como engine de rendereo
app.engine('handlebars', handlebars.engine);

//View set 
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('cookie-parser')("This is secret"));
//Asignar ruta publica pra elementos estaticos
app.use(express.static(__dirname + "/public"));

app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.cookies.user);
    next();
});

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get('/login', function (req, res) {
  if (req.cookies.uid) {
    res.redirect('/create');
  } else {
    res.render('login');
  }
})

app.post('/login', function (req, res) {
  var user = req.body.h_user;
  var uid = req.body.h_uid;
  var email = req.body.h_email;
  var photo = req.body.h_photo;
  var db = firebase.database();		
	var usuario = db.ref("users");
	
	 //En firebase
	usuario.child(uid).once('value', function(snapshot) {	
		if(!snapshot.val()) {
			var objUser = {"username": user, "useremail":email, "profile_picture": photo};
			usuario.child(uid).set(objUser);
		}				
	});
    res.cookie('uid',uid);
    res.cookie('user',user);
    res.cookie('photo',photo);
    res.redirect('/create');
});

app.get("/logout", function(req, res) {
    firebase.auth().signOut().then(function() {
      res.clearCookie('uid')
      res.clearCookie('user')
      res.clearCookie('photo')
      return res.redirect('/login');
    }, function(error) {
      return res.send('<script>lert("Ocurrió un error al cerrar la sesión.");</script>')
    }); 
});

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
  if(req.cookies.uid) {
    return res.render("create"); 
  }
  res.redirect("/login")
});

app.post('/create', function (req, res) {
  if(req.cookies.uid) {
    return res.render("create"); 
  }
  var person = req.body;
  /*
  var db = firebase.database();		
  var tabla = db.ref().child("partners");	
  tabla.push().set(person);
  */
  res.send(person);
})

app.get('/pdf/:id', function (req, res){

var request = require('request');

request({uri: 'http://localhost:3000/view/123'}, function(err, response, body){
  console.log(body);
});

})

app.get('/edit/:id', function (req, res) {
  if(req.cookies.uid) {
    return res.render("create"); 
  }
  res.send('Hello World!')
})

app.post('/edit/:id', function (req, res) {
  if(req.cookies.uid) {
    return res.render("create"); 
  }
  res.send('Hello World!')
})

app.get('/view/:id', function (req, res) {
  if(req.cookies.uid) {
    return res.render("create"); 
  }

    var context = {"name": "Marco Gallen",
   "job_position": "Product manager",
   "area": "Product",
   "potential": "High",
   "career": "Management",
   "status": "Do not apply",
   "key_contributor": "1",
   "specialist_critical": "1",
   "probability_of_loss": "High",
   "impact_loss": "High",
   "areas_to_develop": "Product design usability",
   "strengths": "Patience leadership",
   "relevant_technical_knowledge": "Hirer knowledge",
   "commercial": "1",
   "marketing": "1",
   "administration": "1",
   "finance": "1",
   "human_resources": "1",
   "product": "1",
   "it": "0",
   "movement_time_areas_interest": "Inmediate",
   "movement_time_international_mobility": "Inmediate",
   "possibility_of_development": "Do not apply",
   "time_development_movement_possibility": "Do not apply",
   "representation": "5",
   "strategic_vision": "5",
   "business_understanding": "5",
   "succesor_a": "ergerg5445",
   "succesor_b": "fdgdf343df",
   "succesor_c": "dfeferfe45"
    }
    res.render("view", context);

})

app.post('/view/:id', function (req, res) {
  if(req.cookies.uid) {
    return res.render("create"); 
  }
  res.send('Hello World!')
})


app.get("/get_pdf/:id",function(req,res){
  if(req.cookies.uid) {
    return res.render("create"); 
  }
    var context = {"name": "Marco Gallen",
   "job_position": "Product manager",
   "area": "Product",
   "potential": "High",
   "career": "Management",
   "status": "Do not apply",
   "key_contributor": "1",
   "specialist_critical": "1",
   "probability_of_loss": "High",
   "impact_loss": "High",
   "areas_to_develop": "Product design usability",
   "strengths": "Patience leadership",
   "relevant_technical_knowledge": "Hirer knowledge",
   "commercial": "1",
   "marketing": "1",
   "administration": "1",
   "finance": "1",
   "human_resources": "1",
   "product": "1",
   "it": "",
   "movement_time_areas_interest": "Inmediate",
   "movement_time_international_mobility": "Inmediate",
   "possibility_of_development": "Do not apply",
   "time_development_movement_possibility": "Do not apply",
   "representation": "5",
   "strategic_vision": "5",
   "business_understanding": "5",
   "succesor_a": "ergerg5445",
   "succesor_b": "fdgdf343df",
   "succesor_c": "dfeferfe45"
    }

    res.send('<script>window.location="http://www.html2pdf.it/?url=http://localhost:3000/view/123"</script>');

    //Generamos el HTML
    //console.log(__dirname + "/views/view.handlebars");
    /*var template = handlebars.render(__dirname + "/views/view.handlebars", context);
    for(var t in template){
        console.log(template[t]);
    }*/
    /*fs.writeFile(context.name + ".html",handlebars.renderView(template), function(err){
        if(err){
            return console.log(err);
        }
    });*/
    //fs.writeFileSync(context.name + ".html",template);
    
    //Generamos el PDF
    //var html = fs.readFileSync(__dirname + '/' + context.name + ".html", 'utf8');
    /*var options = { format: 'Letter' };

    var request = require('request');

    var html = "Hola";
    request({uri: 'http://localhost:3000/view/123'}, function(err, response, body){
      html = body;
      //console.log(html);
    });

    console.log(html);

    pdf.create(html.toString(), options).toFile(__dirname + '/' + context.name + ".pdf", function(err, res) {
      if (err) return console.log(err);
      //console.log(res); // { filename: '/app/businesscard.pdf' } 
    });
    //res.send("DONE");
    
    var file = __dirname + '/' + context.name + ".pdf";


  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

<<<<<<< HEAD
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);*/
    
    //res.redirect("/view/12345"); //TODO PONER LOS IDS DINAMICOS
    
  // var filestream = fs.createReadStream(file);
  //filestream.pipe(res);

  //res.redirect("/view/12345"); //TODO PONER LOS IDS DINAMICOS

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})