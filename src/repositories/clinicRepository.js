const fs = require("fs");
const JSONStream = require("JSONStream");
const path = require("path");

class ClinicRepository {
  async getVet(filters) {
    const filePath = path.join(__dirname, "..", "data", "vet-clinics.json");
    const results = [];

    const stream = fs.createReadStream(filePath).pipe(JSONStream.parse("*"));

    stream.on("data", (clinic) => {
      if (
        (!filters.clinicName ||
          clinic.clinicName
            .toLowerCase()
            .includes(filters.clinicName.toLowerCase())) &&
        (!filters.state ||
          clinic.stateCode.toLowerCase() === filters.state.toLowerCase()) &&
        (!filters.from || clinic.opening.from === filters.from) &&
        (!filters.to || clinic.opening.to === filters.to)
      ) {
        results.push(clinic);
      }
    });

    return new Promise((resolve, reject) => {
      stream.on("end", () => {
        console.log("Finished vet searching");
        resolve(results);
      });
      stream.on("error", reject);
    });
  }

  //filtes

  async getDental(filters) {
    const filePath = path.join(__dirname, "..", "data", "dental-clinics.json");
    const results = [];

    const stream = fs.createReadStream(filePath).pipe(JSONStream.parse("*"));

    stream.on("data", (clinic) => {
      if (
        (!filters.clinicName ||
          clinic.name
            .toLowerCase()
            .includes(filters.clinicName.toLowerCase())) &&
        (!filters.state ||
          clinic.stateName.toLowerCase() === filters.state.toLowerCase()) &&
        (!filters.from || clinic.availability.from >= filters.from) &&
        (!filters.to || clinic.availability.to <= filters.to)
      ) {
        results.push(clinic);
      }
    });

    return new Promise((resolve, reject) => {
      stream.on("end", () => {
        console.log("Finished vet searching");
        resolve(results);
      });
      stream.on("error", reject);
    });
  }
}

module.exports = {
  ClinicRepository,
};
