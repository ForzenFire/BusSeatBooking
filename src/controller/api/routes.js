const express = require('express');
const { createRoute, getRoute, getRouteById, updateRoute, deleteRoute, getRoutes, } =require('./routeController');

const router = express.Router();

router.post('/', createRoute);
router.get('/', getRoutes);
router.get('/:routeId', getRouteById);
router.put('/:routeId', updateRoute);
router.delete('/:routeId', deleteRoute);

module.exports = router;