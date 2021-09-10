const Unit = require('../models/Unit');

module.exports = {
    create: async (req, res) => {

        try{
            const { name, capacity, released } = req.body;
            
            const unit = await Unit.create({ name, capacity, released});
    
            await unit.save();
    
            return res.send({ unit });
    
        }catch{
            return res.status(400).send({error: 'Failed creating new unit'});
        }
    },

    read: async (req, res) => {
        try{
            const units = await Unit.find();  

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
    
    delete: async (req, res) => {
        try{
            await Unit.findByIdAndRemove(req.params.unitId);
    
            return res.send();
    
        }catch{
            return res.status(400).send({error: 'Failed deleting unit'});
        }
    }

};

