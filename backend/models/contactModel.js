const {Schema,model } = require('../connection');
const ContactSchema = new Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    message:{ type: String, required: true },
   } ); 
module.exports= model('contacts', ContactSchema);