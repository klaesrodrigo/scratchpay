class ClinicController {
  clinicService;
  constructor(service) {
    this.clinicService = service;
  }
  list = async (req, res) => {
    const result = await this.clinicService.list(req.query);
    return res.json(result);
  };
}

module.exports = {
  ClinicController,
};
