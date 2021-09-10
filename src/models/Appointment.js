const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const appointSchema = new mongoose.Schema({
    /*   title: {
           type: String,
           require: true
       },
       description: {
           type: String,
           require: true
       },*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    unit: {
        type: String,
        require: true  
    },
    
    
/*   unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        require: true
    },*/
    ap_date: {
        type: Date,
    },
/*    confirmed: {
        type: Boolean,
        default: false
    }, */
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const modelName = 'Appoint';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, appointSchema);
}
