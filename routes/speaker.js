let express = require("express"),
    speakerRouter = express.Router(),
    path = require("path"),
    mongoose = require("mongoose");
    

// require the model 
require("./../models/speakerModel");
require("./../models/eventModel");
 let speakerSchema = mongoose.model("speakers");
 let eventSchema = mongoose.model("events");
 let usersSchema = mongoose.model("users");

 


speakerRouter.get("/profile",(request,response)=>{
    // response.render("speaker/profile");
    if(request.session.userName == "wafik"){
        request.flash("msg"," you are not a speaker ..... ");
        response.redirect("/login");
        
    }
    else if(request.session.userName){
        console.log("profile")
        usersSchema.findOne({userName:request.session.userName},(error,speakerResult)=>{
            if(speakerResult != null){
                
                eventSchema.find({$or:[{mainSpeaker:speakerResult._id},{otherSpeakers:speakerResult._id}]}
                    )
                .populate({path:"mainSpeaker otherSpeakers"})
                .then((result)=>{
                    if(result.length > 0){
                    console.log("1");
                    console.log(result);
                    response.render("speaker/profile",{events:result,speaker:speakerResult});
                    }
                    else{
                        console.log("2");
                        response.render("speaker/profile",{events:"",speaker:speakerResult});

                    }// user loged in but with no events 


                })
                .catch((error)=>{});
                    // if(!err)
                    // response.render("speaker/profile",{events : result});
    
            }// if the speaker has events
            
            // console.log(speakerResult);
        })
        

    }
    else{
        request.flash("msg","session ended ");
        response.redirect("/login");
    }// that the user isnt loged in --no session
});

speakerRouter.use((request,response,next)=>{
        if(request.session.userName == "wafik"){
            next();
        }
        else if(request.session.userName){
            // response.locals.userName = request.session.userName;
            request.flash("msg"," you are not an admin ..... ");
            // response.redirect("/speaker/profile");
            response.render("speaker/profile")
        }
        else{
            request.flash("msg","session ended ");
            response.redirect("/login");
        }
    
    });
// speakerRouter.get("/add",(request,response)=>{
//     usersSchema.find({},(error,result)=>{
//         if(!error)
//         response.render("speaker/newSpeaker",{"speakers":result});
//         else
//         console.log("add Speaker "+error);
//     })
// });
// speakerRouter.post("/add",(request,response)=>{
//     let speaker = new speakerSchema(request.body);
//     speaker.save((error)=>{
//         if(!error){
//             response.redirect("/speaker/list");
//         }else{
//             console.log("save speaker "+error);
//         }
//     });

// });
speakerRouter.get("/list",(request,response)=>{
    usersSchema.find({},(error,result)=>{
        if(!error)
        response.render("speaker/listSpeaker",{speakers:result});
        else
        console.log("list speaker  "+error);

    });

});
speakerRouter.get("/edit/:id",(request,response)=>{
    // response.render("speaker/editSpeaker");
    usersSchema.findOne({_id:request.params.id},(error,result)=>{
        if(!error)
        response.render("speaker/editSpeaker",{speaker:result});
        else
        console.log("edit speaker "+error);


    });

});
speakerRouter.post("/edit/:id",(request,response)=>{
    usersSchema.updateOne({_id:request.params.id},{
        $set:{
            name:request.body.name,
            age:request.body.age,

        }
    },(error)=>{
        if(!error){
             response.redirect("/speaker/list");
        }
        else
        console.log("edit speaker "+error);

    });

});
speakerRouter.post("/delete/:id",(request,response)=>{
    usersSchema.remove({_id:request.params.id},(error,result)=>{
        if(!error){
            if(result['n'] == 1)
            response.json({msg:"done"});
            else
            response.json({msg:"not"})
        }
    
    })

});






module.exports = speakerRouter;