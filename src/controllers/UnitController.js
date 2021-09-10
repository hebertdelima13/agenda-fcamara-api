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

};

