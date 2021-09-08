const Agendamento = require('../models/Agendamento');


module.exports = {
    insert: async (req, res) => {      

        const newAgendamento = new Agendamento ({
            name: req.body.name,
            capacity: req.body.capacity,
            released: req.body.released
        });

        await newAgendamento.save();

        res.json({newAgendamento});
    }
};