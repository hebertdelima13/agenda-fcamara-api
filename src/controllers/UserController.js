const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');
const { update } = require('../models/User');
const User = require('../models/User');

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
        let token = req.headers.authorization;

        const user = await User.findOne({token:token});

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({error: '300', msg: 'Dados inválido!'});
        }

        if(user){
            const data = matchedData(req);        

            let updates = {};

            if(data.name) {
                updates.name = data.name;
            }

            if(data.email) {
                const emailCheck = await User.findOne({email: data.email});

                if(emailCheck) {
                    return res.status(401).json({error: '303', msg: 'E-mail já existe!'});
                }

                updates.email = data.email;
            }

            if(data.password) {
                updates.passwordHash = await bcrypt.hash(data.password, 10);
            }

            const nuser = await User.findOneAndUpdate({token: token}, {$set: updates}, { new: true}); //data.token   
            //const appoint = await Appoint.findByIdAndUpdate(req.params.appointId, { unit, ap_date}, { new: true});

            await nuser.save();
        
            return res.send({ nuser });

            //return res.status(200).send({message: 'Dados alterados com sucesso!'});
        }
    },

    delete: async (req, res) => {
        try{
            const authHeader = req.headers.authorization;
            const user = await User.findOne({token: authHeader});

            if(user){
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