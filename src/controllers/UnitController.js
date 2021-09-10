const Unit = require('../models/Unit');


module.exports = {
    add: async (req, res) => {

        try{
            const { name, capacity, released } = req.body;
            
            const unit = await Unit.create({ name, capacity, released});
    
            await unit.save();
    
            return res.send({ unit });
    
        }catch{
            return res.status(400).send({error: 'Failed creating new unit'});
        }
    },

    list: async (req, res) => {
        try{
            const units = await Unit.find();  //.populate(['user','tasks']);
            const count = await Unit.find().count();
        //       console.log('contagem=',count);
        
            return res.send({units});
        
        }catch{
            return res.status(400).send({error: 'Failed loading units'});
        }
    },

    update: async (req, res) => {
        try{
            const { name, capacity, released } = req.body;
            
            const unit = await Unit.findByIdAndUpdate(req.params.unitId, { name, capacity, released}, { new: true});
            
    
            await unit.save();
    
            return res.send({ unit });
    
        }catch{
            return res.status(400).send({error: 'Failed updating unit'});
        }
    },

};

