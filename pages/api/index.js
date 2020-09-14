import tabletop from "tabletop";
import { getStudios, getLocations } from "../../dataHelpers";

const SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/1_FirimvkCUlc1VOiNI8tuDfXGWWQW9BDQ_2xq5qgJ2E/edit?usp=sharing";

export default async (req, res) => {
  const data = await tabletop.init({
    key: SPREADSHEET_URL,
    simpleSheet: true,
  });

  const studios = getStudios(data);
  const locations = getLocations(studios);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ studios, locations }));
};
