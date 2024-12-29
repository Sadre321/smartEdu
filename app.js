const express = require("express");
const app = express();

const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const methodOverride = require("method-override");

const page = require("./routes/page");
const course = require("./routes/course");
const category = require("./routes/category");
const auth = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.set('trust proxy', 1) // trust first proxy
app.use(flash());
app.use(
    methodOverride('_method', {
      methods: ['POST', 'GET'],
    })
  );

const username = "haydaremre31";
const password = 'sadre.321';
const database = 'smartEdu';

app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  store: MongoStore.create({ mongoUrl: `mongodb+srv://${username}:${password}@cluster0.pgxr434.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0` }),
  saveUninitialized: true,
}));
app.use((req,res,next)=>{
    res.locals.flashMessages = req.flash();
    next();
})


app.use((req,res,next)=>{
    let userID = null;
    if(req.session.userID){
        userID = req.session.userID;
    }
    res.locals.userIN = userID;
    next();
});

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.pgxr434.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı.');

    } catch (err) {
        console.error(`Bağlantı hatası: ${err}`);
    }
})();

app.use("/",page);
app.use("/course",course);
app.use("/category",category);
app.use("/auth",auth);

const port = 3000;
app.listen(port,()=>{
    console.log("Listening port on " + port);
})