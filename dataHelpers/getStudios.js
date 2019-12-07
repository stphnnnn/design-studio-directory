const createDate = string => {
  const parts = string.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const getStudios = data => {
  return data.map(studio => {
    const name = studio.companyName && studio.companyName.toString();

    const cityEntries = Object.entries(studio).filter(
      ([cityKey, city]) => cityKey.indexOf("city") === 0 && city
    );

    const locations = cityEntries.map(([cityKey, city]) => {
      const locationId = parseInt(cityKey.substr(4));
      const country = studio[`country${locationId}`];

      return {
        city,
        country
      };
    });

    const dateAdded = createDate(studio.dateAdded || "1960-06-06");

    const { twitterHandle, url } = studio;

    return {
      name,
      locations,
      dateAdded,
      twitterHandle,
      url
    };
  });
};

export default getStudios;
