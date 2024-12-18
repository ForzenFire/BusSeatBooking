const Route = require('../models/Route');

exports.addRoute = async (req, res) => {
    try {
        const {origin, destination, distance, buses } = req.body;
        const newRoute = new Route({origin, destination, distance, buses });
        await newRoute.save();
        res.statu(201).jason({message: 'Route added successfully', route: newRoute});

    } catch (error) {
        res.status(500).jason({error: 'Failed to add reoute'});
    }
};

exports.getAllRoutes = async (req, res) =>  {
    try {
        const routes = await Route.find();
        res.status(200).jason(routes);
    } catch (error) {
        res.status(500).jason({error: "Failed to fetch routes"});
    }
};

exports.getRouteById = async (req, res) =>  {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).jason({ message:'ROute not found'}); 
        res.status(200).jason(route);
    } catch (error) {
        res.status(500).jason({error: 'Failed to fetch route'});
    }
};

exports.updateRoute = async (req, res) => {
    try {
        const { origin, destination, distance, buses } = req.body;
        const route = await Route.findByIdAndUpdate(
            req.params.id,
            { origin, destination, distance, buses },
            { new: true }
        );
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route updated successfully', route });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update route' });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete route' });
    }
};