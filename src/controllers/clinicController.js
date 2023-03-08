class ClinicController {
  clinicService;
  constructor(service) {
    this.clinicService = service;
  }
  list = async (req, res) => {
    const result = await this.clinicService.list(req.query);
    return res.json(result);
  };

  listVet = async (req, res) => {
    const result = await this.clinicService.listVet(req.query);
    return res.json(result);
  };

  listDental = async (req, res) => {
    const result = await this.clinicService.listDental(req.query);
    return res.json(result);
  };
}

module.exports = {
  ClinicController,
};
