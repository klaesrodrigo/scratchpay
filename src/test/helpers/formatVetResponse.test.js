const { formatVetResponse } = require('../../helpers/formatVetResponse');

describe('formatVetResponse', () => {
  it('should format the Vet response correctly', () => {
    const resultsVet = [
      {
        clinicName: 'Good Health Home',
        stateCode: 'FL',
        opening: {
          from: '15:00',
          to: '20:00',
        },
      },
      {
        clinicName: 'National Veterinary Clinic',
        stateCode: 'CA',
        opening: {
          from: '15:00',
          to: '22:30',
        },
      },
    ];
    const expected = [
      {
        name: 'Good Health Home',
        stateName: 'FL',
        availability: {
          from: '15:00',
          to: '20:00',
        },
      },
      {
        name: 'National Veterinary Clinic',
        stateName: 'CA',
        availability: {
          from: '15:00',
          to: '22:30',
        },
      },
    ];

    expect(formatVetResponse(resultsVet)).toEqual(expected);
  });

  it('should return an empty array when no results are passed', () => {
    const resultsVet = [];
    const expected = [];
    expect(formatVetResponse(resultsVet)).toEqual(expected);
  });
});
