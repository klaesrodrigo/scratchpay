const { ClinicController } = require("../controllers/clinicController");
const { ClinicRepository } = require("../repositories/clinicRepository");
const { ClinicService } = require("../services/clinicService");

const makeClinicController = () => {
  const repository = new ClinicRepository();
  const service = new ClinicService(repository);
  return new ClinicController(service);
};

module.exports = {
  makeClinicController,
};
