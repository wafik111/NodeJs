let express = require("express"),
    eventsRouter = express.Router(),
    mongoose = require("mongoose");

require("./../models/eventModel");
require("./../models/usersModel");

 
let eventSchema = mongoose.model("events"),
    usersSchema = mongoose.model("users");



eventsRouter.get("/add",(request,response)=>{
    usersSchema.find({},(error,result)=>{
        if(!error)
        response.render("events/addEvent",{speakers:result});
        else
        console,log("events "+error);


    })
});
eventsRouter.post("/add",(request,response)=>{
    // response.render("events/addEvent");
    let event=new eventSchema({
        _id:request.body.id,
        title:request.body.title,
        mainSpeaker:request.body.mainSpeaker,
        otherSpeakers:request.body.otherSpeakers
    });

    event.save((error)=>{
        if(!error)
        // response.send("done");
        response.redirect("/events/list");
        else
        console.log("save event error "+error);
    });


});
eventsRouter.get("/list",(request,response)=>{
    // response.render("events/listEvent");
    eventSchema.find({})
                .populate({path:"mainSpeaker otherSpeakers"})
                .then((result)=>{
                    response.render("events/listEvent",{events:result});
                })
                .catch((error)=>{});

});
eventsRouter.get("/edit/:id",(request,response)=>{
   
   usersSchema.find({},(error,speakerResult)=>{
    eventSchema.findOne({_id:request.params.id}).populate({path : "mainSpeaker otherSpeakers"})
        .then((result)=>{
            response.render("events/editEvent",{event : result , speakers : speakerResult});

        })

   })
});
eventsRouter.post("/edit/:id",(request,response)=>{
    eventSchema.updateOne({_id:request.params.id},{
        $set:{
        title:request.body.title,
        mainSpeaker:request.body.mainSpeaker,
        otherSpeakers:request.body.otherSpeakers

        }
    },(error)=>{
        if(!error)
        response.redirect("/events/list");
        else
        console.log("edit event  "+error);

    })
    
});

eventsRouter.post("/delete/:id",(request,response)=>{
   
    eventSchema.deleteOne({_id:request.params.id},(error,result)=>{
        console.log(result['n']);
        if(!error){
            
            if(result['n'] == 1)
            // response.sendStatus(404);
            response.json({msg:"done"});
            else
            response.json({msg:"not"})
        }
        else
        console.log("err"+error);
       
    })
    
});


module.exports = eventsRouter;
