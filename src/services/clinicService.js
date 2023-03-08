const { buildFilters } = require('../helpers/buildFilters');
const { formatVetResponse } = require('../helpers/formatVetResponse');

class ClinicService {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  list = async (filters) => {
    const resultsVet = await this.listVet(filters);
    const resultsDental = await this.listDental(filters);

    return { 'dental clinics': resultsDental, 'Vet clinics': resultsVet };
  };

  listVet = async (filters) => {
    filters = buildFilters(filters);

    let resultsVet = await this.repository.getVet(filters);
    resultsVet = formatVetResponse(resultsVet);

    return resultsVet;
  };

  listDental = async (filters) => {
    filters = buildFilters(filters);
    const resultsDental = await this.repository.getDental(filters);

    return resultsDental;
  };
}

module.exports = {
  ClinicService,
};
