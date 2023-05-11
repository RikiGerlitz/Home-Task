const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personSchema = new Schema({
    
     fullName:{
        type: String,
        required: [true,"fullName field is required"], 
     },

     idNumber:{
        type:String,
        required: [true,"id field is required"],
        unique: true,
        minLength:[9,"The minimum digitis are 9"],
        maxLength:[9,"The maximum digitis are 9"]
     },
     
     address: {
         city: String,
         street: String,
         home: Number,
        
     },

     dateOfBirth:{
        type: Number,
        max: [new Date(), "birthDate cannot be in the future"],
        min: 1900,
       
     },

     phone:{ 
         type:String,
         min:9,
         max:9
     },

     
    mobilePhone:{ 
        type:String,
        required: [true,"mobilePhone field is required"],
        min:9,
        max:9
        

    }

});

personSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const people = mongoose.model('people', personSchema);

people.createCollection().then(function (collection) {
    console.log('Collection is created!');
});

module.exports  = people;



