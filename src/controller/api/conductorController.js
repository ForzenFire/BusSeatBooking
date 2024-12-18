const Conductor = require('../../model/Conductor');

exports.createConductor = async (req, res) => {
    try {
        const { nic,conductorId, name,contact,addres } = req.body;
        const conductor = new Conductor({nic,conductorId, name,contact,addres });
        await conductor.save();
        res.status(201).json({message: 'COnductor created successfully', conductor});
    } catch (error) {
        res.status(500).json({error: 'Failed to create conductor', details: error.message});
    }
};

exports.getConductors = async (req, res) => {
    try {
        const conductors = await Conductor.find();
        res.status(200).json(conductors);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch Conductors', details: error.message});
    }
};

exports.getConductorById = async (req, res) =>  {
    try {
        const conductor = await Conductor.findOne({ conductorId: req.params.conductorId});
        if(!conductor) return res.status(404).json({ message: 'Conductor not found'});
        res.status(200).json(conductor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Conductor', details: error.message });
    }
};

exports.updateConductor = async (req, res) => {
    try {
        const { name,contact,addres } = req.body;
        const conductor = await Conductor.findOneAndUpdate(
            { conductorId: req.params.conductorId },
            { name, contact, address },
            {new: true }
        );
        if(!conductor) return res.status(404).json({ message: 'Conductor Not found' });
        res.status(200).json({ message: 'Conductor updated Successfully ', conductor });
    } catch (error) {
        res.status(500).json({error: 'Failed to update Conductor', details: error.message});
    }
};

exports.deleteConductor = async (req, res) =>   {
    try {
        const conductor = await Conductor.findOneAndDelete({ routeId: req.params.conductorId});
        if(!conductor) return res.status(404).json({ message: 'Conductor not found'});
        res.status(200).json({ message: 'Conductor delete successfully'});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete Conductor', details: error.message });
    }
};