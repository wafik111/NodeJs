let express = require("express"),
    adminRouter = express.Router(),
    path = require("path");


// adminRouter.use((request,response,next)=>{
//     if(request.session.userName == "wafik"){
//         next();
//     }
//     else if(request.session.userName){
//         // response.locals.userName = request.session.userName;
//         request.flash("msg"," you are not an admin ..... ");
//         response.redirect("/login");
//     }
//     else{
//         request.flash("msg","session ended ");
//         response.redirect("/login");
//     }

// });
///// end MW /////
adminRouter.get("/profile",(request,response)=>{
    // response.sendFile(path.join(__dirname,"..","views","admin","profile.html"))
    response.render("admin/profile");
});

module.exports = adminRouter;