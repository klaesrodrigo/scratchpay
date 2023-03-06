const { ClinicController } = require("../controllers/clinicController");
const { ClinicService } = require("../services/clinicService");

const makeClinicController = () => {
  const service = new ClinicService();
  return new ClinicController(service);
};

module.exports = {
  makeClinicController,
};
