const { makeClinicController } = require('../factories/makeClinicController');

const routes = require('express').Router();
const clinicController = makeClinicController();

routes.get('/', clinicController.list);
routes.get('/vet', clinicController.listVet);
routes.get('/dental', clinicController.listDental);

module.exports = (app) => app.use('/clinics', routes);
