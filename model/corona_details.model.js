const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const coronasSchema = new Schema({
    

    vaccines:{
      type:[{ manufacturer:{type:String, enum:['FIZER','MODERNA','ASTRAZENECA','JANSSEN','NOVAVAX']},
               date: String,
               }],
      maxItems:4
    
    },

    positiveResult:{
        type: String,
       
     },
     recovery: {
        type: String,
        
      },
    
   idPerson: { 
        type: Schema.Types.ObjectId,
        ref: 'people'
      }
    
});

  
coronasSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const corona_details = mongoose.model('corona_details', coronasSchema);

corona_details.createCollection().then(function (collection) {
    console.log('Collection is created!');
});

module.exports  = corona_details;