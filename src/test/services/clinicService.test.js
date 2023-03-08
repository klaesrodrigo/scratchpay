const { formatVetResponse } = require('../../helpers/formatVetResponse');
const { ClinicService } = require('../../services/clinicService');

describe('ClinicService', () => {
  const repository = {
    getDental: jest.fn(),
    getVet: jest.fn(),
  };

  const dentalClinics = [
    {
      name: 'Dental clinic 1',
      stateName: 'Arizona',
      availability: {
        from: '07:00',
        to: '20:00',
      },
    },
  ];

  const vetClinics = [
    {
      clinicName: 'Vet Clinic 1',
      opening: { from: '08:00', to: '16:00' },
      stateCode: 'NY',
    },
  ];

  const formattedVetClinic = formatVetResponse(vetClinics);

  const clinicService = new ClinicService(repository);

  describe('list', () => {
    it('should return the list of dental clinics and vet clinics', async () => {
      repository.getDental.mockResolvedValueOnce(dentalClinics);
      repository.getVet.mockResolvedValueOnce(vetClinics);

      const result = await clinicService.list({});

      expect(result).toEqual({
        'dental clinics': dentalClinics,
        'Vet clinics': formattedVetClinic,
      });
    });
  });

  describe('listVet', () => {
    it('should return the list of vet clinics', async () => {
      repository.getVet.mockResolvedValueOnce(vetClinics);

      const result = await clinicService.listVet({
        availability: 'from:08:00, to:16:00',
      });

      expect(result).toEqual(formattedVetClinic);
    });
  });

  describe('listDental', () => {
    it('should return the list of dental clinics', async () => {
      repository.getDental.mockResolvedValueOnce(dentalClinics);

      const result = await clinicService.listDental({
        availability: 'to:07:00, from:20:00',
      });

      expect(result).toEqual(dentalClinics);
    });
  });
});
