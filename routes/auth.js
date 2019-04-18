let express = require("express"),
    authRouter = express.Router(),
    path = require("path"),
    mongoose = require("mongoose"),
    encryptPassword = require("encrypt-password"),
    multer = require("multer"),
    upload = multer({dest:'uploads'});


require("./../models/usersModel");
let userSchema = mongoose.model("users");

authRouter.get("/login",(request,response)=>{
   
    response.render("auth/login",{msg : request.flash("msg")});


});
authRouter.post("/login",(request,response)=>{
   
         
    if(request.body.userName == "wafik"&& request.body.userPass == "123456"){
        request.session.userName = request.body.userName;

        response.redirect("/admin/profile");
    } 
    else{
        let password2 = encryptPassword(request.body.userPass,"wafik");
        userSchema.findOne({userName:request.body.userName,password:password2},(error,user)=>{
            if(user != null){
                request.session.userName = user.userName;
                console.log("here")
                response.redirect("/speaker/profile");
                // response.render("speaker/profile",{speaker:user});

            }
            else{
                request.flash("msg","wrong name or password....");
                response.redirect("/login");
            }
    
        })
    }
  

});

authRouter.get("/register",(request,response)=>{
    response.render("auth/register");
    

});
authRouter.post("/check/:mail",(requset,response)=>{
    // result = requset.params.id.split("&");
    // search = result[0].toString();
    // searched = result[1].toString();
    // console.log(result);
    userSchema.findOne({mail:requset.params.mail},(error,logs)=>{
        if(logs != null)
        response.json({msg:"ok"});
        else
        response.json({msg:"o"});


        console.log(logs);
    })
})
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   })
authRouter.post("/register",upload.single('avatar'),(request,response)=>{
    let password3 = encryptPassword(request.body.password,"wafik");
    // console.log(request.body.path);
    console.log(request.file);
    let user = new userSchema({
    
        name:request.body.name,
        userName:request.body.userName ,
        password : password3 ,
        mail : request.body.userMail ,
        age : request.body.age,
        avatar : request.file.filename,
    })
    user.save((error)=>{
        if(!error){
            request.session.userName = request.body.userName;
            response.redirect("/speaker/profile");
        }else{
            console.log("save speaker "+error);
        }
    });
    // request.session.userName = request.body.userName;
    console.log(request.body)
    // response.redirect("speaker/profile");
    

});

authRouter.get("/logout",(request,response)=>{
    request.session.destroy(()=>{
        response.redirect("/login");
    })

});

module.exports = authRouter;