const buildFilters = (filters) => {
  if (filters.availability) {
    const splited = filters.availability.split(', ');
    splited.forEach((element) => {
      const [name, ...value] = element.split(':');
      filters[name] = value.join(':');
    });
  }
  return filters;
};

module.exports = {
  buildFilters,
};
