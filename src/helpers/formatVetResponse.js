const formatVetResponse = (resultsVet) => {
  return resultsVet.map((element) => ({
    name: element.clinicName,
    stateName: element.stateCode,
    availability: {
      from: element.opening.from,
      to: element.opening.to,
    },
  }));
};

module.exports = {
  formatVetResponse,
};
