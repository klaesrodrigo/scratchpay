class ClinicService {
  repository;
  constructor(repository) {
    this.repository = repository;
  }
  list = async (filters) => {
    if (filters.availability) {
      const splited = filters.availability.split(", ");
      splited.forEach((element) => {
        const [name, ...value] = element.split(":");
        filters[name] = value.join(":");
      });
    }
    const resultsVet = await this.repository.getVet(filters);
    const resultsDental = await this.repository.getDental(filters);
    return { "dental clinics": resultsDental, "Vet clinics": resultsVet };
  };
}

module.exports = {
  ClinicService,
};
