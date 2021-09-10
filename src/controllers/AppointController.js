const Appoint = require('../models/Appointment');
const Unit = require('../models/Unit');
const User = require('../models/User');

module.exports = {
    create: async (req, res) => {
        try{
            const { unit, ap_date } = req.body;
            const authHeader = req.headers.authorization;
                
            const count = await Appoint.find({unit: unit, ap_date:ap_date}).count();
            const r = await Unit.findOne({name: unit});
            const released = r.released;
            const user = await User.findOne({token: authHeader});
                                
            if(count < released){
                const appoint = await Appoint.create({ unit, ap_date, user: user._id});
    
                return res.send({ appoint });
            }else{
                return res.status(400).send({error: 'No schedule available'});
            }
        }catch{
            return res.status(400).send({error: 'Failed creating new appointment'});
        }
    },

    read: async (req, res) => {
        try{
            const { unit } = req.body;
            const authHeader = req.headers.authorization;
            const user = await User.findOne({token: authHeader});

            const appoints = await Appoint.find({unit: unit, user: user._id});
     
            return res.send({appoints});
    
        }catch{
            return res.status(400).send({error: 'Failed loading appointment'});
        }
    },

    update: async (req, res) => {
        try{
            const { unit, ap_date } = req.body;
           // const authHeader = req.headers.authorization;
            
            const appoint = await Appoint.findByIdAndUpdate(req.params.appointId, { unit, ap_date}, { new: true});

            await appoint.save();
    
            return res.send({ appoint });
    
        }catch{
            return res.status(400).send({error: 'Failed updating appointment'});
        }
    },
    
    delete: async (req, res) => {
        try{
            await Appoint.findByIdAndRemove(req.params.appointId);

            return res.send({message: 'Successfully deleted'})
    
        }catch{
            return res.status(400).send({error: 'Failed deleting appointment'});
        }
    }

};

