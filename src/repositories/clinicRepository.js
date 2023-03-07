const fs = require("fs");
const JSONStream = require("JSONStream");
const path = require("path");

class ClinicRepository {
  async getVet(filters) {
    const filePath = path.join(__dirname, "..", "data", "vet-clinics.json");
    const comparationFields = {
      name: "clinicName",
      state: "stateCode",
      availability: "opening",
    };
    const results = await this.searchClinics(
      filePath,
      filters,
      comparationFields
    );
    console.log("Finished vet searching");
    return results;
  }

  async getDental(filters) {
    const filePath = path.join(__dirname, "..", "data", "dental-clinics.json");
    const comparationFields = {
      name: "name",
      state: "stateName",
      availability: "availability",
    };
    const results = await this.searchClinics(
      filePath,
      filters,
      comparationFields
    );
    console.log("Finished dental searching");
    return results;
  }

  searchClinics = async (filePath, filters, comparisonFieldObject) => {
    const results = [];

    const stream = fs.createReadStream(filePath).pipe(JSONStream.parse("*"));

    stream.on("data", (clinic) => {
      if (
        (!filters.clinicName ||
          clinic[comparisonFieldObject.name]
            .toLowerCase()
            .includes(filters.clinicName.toLowerCase())) &&
        (!filters.state ||
          clinic[comparisonFieldObject.state].toLowerCase() ===
            filters.state.toLowerCase()) &&
        (!filters.from ||
          clinic[comparisonFieldObject.availability].from === filters.from) &&
        (!filters.to ||
          clinic[comparisonFieldObject.availability].to === filters.to)
      ) {
        results.push(clinic);
      }
    });

    return new Promise((resolve, reject) => {
      stream.on("end", () => {
        console.log("Finished searching");
        resolve(results);
      });
      stream.on("error", reject);
    });
  };
}

module.exports = {
  ClinicRepository,
};
