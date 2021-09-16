const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const appointSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    unit: {
        type: String,
        require: true  
    },
    ap_date: {
        type: Date,
    },
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
