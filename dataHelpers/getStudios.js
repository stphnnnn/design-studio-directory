import { parse } from "date-fns";
import compareDesc from "date-fns/compareDesc";
import shortid from "shortid";

const createDate = (dateString) => {
  return parse(dateString || "1960-06-06", "yyyy-MM-dd", new Date());
};

const getStudios = (data) => {
  return data
    .map((studio) => {
      const name = studio["Company Name"] && studio["Company Name"].toString();

      const cityEntries = Object.entries(studio).filter(
        ([cityKey, city]) => cityKey.indexOf("City") === 0 && city
      );

      const locations = cityEntries.map(([cityKey, city]) => {
        const locationId = parseInt(cityKey.substr(4));
        const country = studio[`Country ${locationId}`];

        return {
          city,
          country,
        };
      });

      const dateAdded = createDate(studio.dateAdded);

      return {
        id: shortid.generate(),
        name,
        locations,
        dateAdded,
        twitterHandle: studio["Twitter Handle"],
        url: studio.Url,
      };
    })
    .sort((a, b) => compareDesc(a.dateAdded, b.dateAdded));
};

export default getStudios;
