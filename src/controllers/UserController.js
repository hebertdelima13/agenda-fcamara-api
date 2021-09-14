const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const { update } = require('../models/User');
const User = require('../models/User');
const Appoint = require('../models/Appointment');

module.exports = {
    info: async (req, res) => {

        let token = req.headers.token;

        const user = await User.findOne({token:token}); 

        if(user){
            return res.send({name:user.name, email:user.email});
        }else{
            return res.status(401).send({error: 'Token not provided'});
        }        
        
    },

    editAction: async (req, res) => {
        let token = req.headers.token;

        const user = await User.findOne({token:token});
        
        const errors = validationResult(req);
      
        if(user){
            const data = matchedData(req);
            const euser = await User.findOne({email: data.email});

            let updates = {};

            if(data.name) {
                updates.name = data.name;
            }     
            
            if(req.body.email) {
                if(req.body.email.indexOf('@') > -1){  
                  
                    if(euser && euser._id !== user._id){
                      
                      return res.send({error: 'Email já em uso!'});

                    } else {
                       
                        updates.email = data.email;
                    }
                }else {

                    return res.send({error: 'Email inválido!'});
                }
                
            }

            if(data.password) {
                updates.passwordHash = await bcrypt.hash(data.password, 10);
            }

            const nuser = await User.findOneAndUpdate({token: token}, {$set: updates}, { new: true}); 

            await nuser.save();
        
            return res.send({ nuser });

        }
    },

    delete: async (req, res) => {
        try{
            const authHeader = req.headers.token;
            const user = await User.findOne({token: authHeader});

            if(user){
                const myquery = {user: user._id};
                await Appoint.deleteMany(myquery);
                                
                await User.findByIdAndRemove(user);

                return res.send({message: 'Successfully deleted'});
            }else{
                return res.status(401).send({error: 'Token not provided'});
            }
    
        }catch{
            return res.status(400).send({error: 'Failed deleting user'});
        }
    }

};