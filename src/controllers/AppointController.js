const Appoint = require('../models/Appointment');
const Unit = require('../models/Unit');
const User = require('../models/User');

module.exports = {
    create: async (req, res) => {
        try{
            const { unit, ap_date } = req.body;
            const authHeader = req.headers.token;
                
            const count = await Appoint.find({unit: unit, ap_date:ap_date}).count();
            const r = await Unit.findOne({name: unit});
            const released = r.released;
            const user = await User.findOne({token: authHeader});
            const sch = await Appoint.findOne({ap_date:ap_date, user: user._id});
            if(!sch && user){
                //console.log('disponivel');
                if(count < released){
                    const appoint = await Appoint.create({ unit, ap_date, user: user._id});
        
                    return res.send({ appoint });
                  //  return res.send({ message:'OK' });
                }else{
                    return res.status(400).send({error: 'No schedule available'});
                }
            }else {
                return res.status(401).send({error: 'scheduling already made.'});
            }
                                
        }catch{
            return res.status(404).send({error: 'Failed creating new appointment'});
        }
    },

    read: async (req, res) => {
        try{
            const { unit } = req.body;
            const authHeader = req.headers.token;
            const user = await User.findOne({token: authHeader});

            if(user){
                const appoints = await Appoint.find({user: user._id});  //unit: unit, 
        
                return res.send({appoints});
            }else{
                return res.status(401).send({error: 'Token not provided'});
            }
    
        }catch{
            return res.status(400).send({error: 'Failed loading appointment'});
        }
    },

    update: async (req, res) => {
        try{
            const { unit, ap_date } = req.body;
            const authHeader = req.headers.token;
            const user = await User.findOne({token: authHeader});
            
            if(user){
                const appoint = await Appoint.findByIdAndUpdate(req.params.appointId, { unit, ap_date}, { new: true});

                await appoint.save();
        
                return res.send({ appoint });
            }else{
                return res.status(401).send({error: 'Token not provided'});
            }
    
        }catch{
            return res.status(400).send({error: 'Failed updating appointment'});
        }
    },
    
    delete: async (req, res) => {
        try{
            const authHeader = req.headers.token;
            const user = await User.findOne({token: authHeader});

            if(user){
                await Appoint.findByIdAndRemove(req.params.appointId);

                return res.send({message: 'Successfully deleted'});
            }else{
                return res.status(401).send({error: 'Token not provided'});
            }
    
        }catch{
            return res.status(400).send({error: 'Failed deleting appointment'});
        }
    }

};

