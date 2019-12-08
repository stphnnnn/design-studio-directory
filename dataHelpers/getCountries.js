const getLocations = studios => {
  const locations = studios.reduce((acc, curr) => {
    return [...acc, ...curr.locations];
  }, []);

  const countries = locations.reduce((acc, curr) => {
    const country = curr.country || curr.city;

    // Create country key with city if it doesn't exist
    if (!acc[country]) {
      return {
        ...acc,
        [country]: [curr.city]
      };
    }

    return {
      ...acc,
      [country]: [...new Set([...acc[country], curr.city])]
    };
  }, {});

  return countries;
};

export default getLocations;
