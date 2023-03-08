const { buildFilters } = require('../../helpers/buildFilters');

describe('buildFilters', () => {
  it('should return the same object if availability key is not provided', () => {
    const filters = {
      name: 'Good Health Home',
      stateName: 'Alaska',
    };
    expect(buildFilters(filters)).toEqual(filters);
  });

  it('should parse the availability string and add properties to the filters object', () => {
    const filters = {
      name: 'Good Health Home',
      stateName: 'Alaska',
      availability: 'from:10:00, to:19:30',
    };
    const expected = {
      name: 'Good Health Home',
      stateName: 'Alaska',
      availability: 'from:10:00, to:19:30',
      from: '10:00',
      to: '19:30',
    };
    expect(buildFilters(filters)).toEqual(expected);
  });

  it('should parse multiple availability strings and add properties to the filters object', () => {
    const filters = {
      name: 'Good Health Home',
      stateName: 'Alaska',
      availability: 'from:10:00, to:19:30, until:22:00',
    };
    const expected = {
      name: 'Good Health Home',
      stateName: 'Alaska',
      availability: 'from:10:00, to:19:30, until:22:00',
      from: '10:00',
      to: '19:30',
      until: '22:00',
    };
    expect(buildFilters(filters)).toEqual(expected);
  });
});
