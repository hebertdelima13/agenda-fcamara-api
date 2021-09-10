const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    released: {
        type: Number,
        require: true
    },
  /*  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],*/
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const modelName = 'Unit';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}