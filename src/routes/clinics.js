const { makeClinicController } = require("../factories/makeClinicController");

const routes = require("express").Router();
const clinicController = makeClinicController();

routes.get("/", clinicController.list);

module.exports = (app) => app.use("/clinics", routes);
