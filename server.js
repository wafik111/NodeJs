let express = require("express"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    connect_flash = require("connect-flash"),
    express_session = require("express-session"),
    path = require("path"),
    authRouter = require("./routes/auth"),
    adminRouter = require("./routes/admin"),
    eventsRoutre = require("./routes/events"),
    speakerRouter = require("./routes/speaker"),
    body_parser = require("body-parser"),
    multer = require("multer"),
    upload = multer({dest:'uploads'})


 let server = express();
 //// connect mongo 
 mongoose.connect("mongodb://localhost:27017/nodedb").then(()=>{console.log("db connected .....")})
                        .catch((error)=>{
                            console.log("db error  "+error);
                        })

 server.set("view engine","ejs");
 server.set("views",path.join(__dirname,"views"));
 // middle wares 
 server.use(morgan("short"));


 // time MW //
 server.use((request,response,next)=>{
     let time = (new Date ()).getFullYear();
    //  console.log(time);
    if (time == "2019"){
        next();

    }
    else{
        next(new Error("time error"));
    }

 });
 
 server.use(express.static(path.join(__dirname,"public")));
 server.use(express.static(path.join(__dirname,"uploads")));
 server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")));
 server.use(express.static(path.join(__dirname,"node_modules","jquery","dist")));
 // all MW 
 server.use(/\//,(request,response)=>{
     response.redirect("/login");

 });
server.use(express_session({secret : "wafik"}));
server.use(connect_flash());
server.use(body_parser.urlencoded());
server.use(body_parser.json());
 server.use(authRouter);
 /////////////////////////////// session check //////////
 server.use((request,response,next)=>{
    if(request.session.userName){
        response.locals.userName = request.session.userName;
        next();
    }else{
        request.flash("msg","session ended ");
        response.redirect("/login");
    }
 })
 
 server.use("/speaker",speakerRouter);
 server.use((request,response,next)=>{
        if(request.session.userName == "wafik"){
            next();
        }
        else if(request.session.userName){
            // response.locals.userName = request.session.userName;
            request.flash("msg"," you are not an admin ..... ");
            response.redirect("/login");
        }
        else{
            request.flash("msg","session ended ");
            response.redirect("/login");
        }
    
    });
 server.use("/admin",adminRouter);
 server.use("/events",eventsRoutre);
 server.use((request,response)=>{
    response.send("<h1> not found </h1>")
 });


// Err MW
 server.use((error,request,response,next)=>{
     
    console.log("Error" +error)
 });
 // listen 
 server.listen(8080,()=>{
    console.log("wafik listening................................")
 });