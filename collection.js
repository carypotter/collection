//This code executes on the client and on the server 

//Declare a collection in the Mongo Database 
var Things = new Mongo.Collection("things");


//this code executes only on the client

if (Meteor.isClient) {
  
  Template.body.helpers({
    
    //The things helper returns a list of the things.
    //find all the things in the database and return them.
    things: function() {
        return Things.find();
        
    }
    
  }); 
  
  Template.thing.events({
    
    //This function is called whenever there is a click 
    //event on a delete link in the "thing" template
    "click .delete": function(event) {
      
      //Tell the browser not to do its default behavior
      //(which would reload the page)
      event.preventDefault();
      
      //Using the Mongo id of this templates object, tell Mongo
      //to remove the object from the database
      Things.remove(this._id);
      
    }
    
  })
  
  Template.new.events({ 
  
    //This function is called whenever there is a submit 
    //event in the "new" template
    "submit": function(event) {
      
      //Tell the browser not to do its default browser
      //(which would reload the page)
      event.preventDefault();
      
      //Get the form element (which by definition is
      //the target of the submit event)
      var form = event.target;
      
      
      //Insert a thing into the collection
      Things.insert({
        name: form.name.value,
        
      })
      
      //Clear the text fields
      form.name.value = '';
      
      //Focus on the first field after
      form.name.focus();
    }
    
  });
  
}