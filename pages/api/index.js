import fetch from "isomorphic-unfetch";
import tabletop from "tabletop";
import { getStudios, getLocations } from "../../dataHelpers";

const SPREADSHEET_URL =
  "https://docs.google.com/spreadsheets/d/1_FirimvkCUlc1VOiNI8tuDfXGWWQW9BDQ_2xq5qgJ2E/edit?usp=sharing";

function init() {}

function showInfo(data, tabletop) {
  console.log(JSON.stringify(data, null, 2));
}

export default async (req, res) => {
  // const apiUrl = process.env.EXTERNAL_API_ENDPOINT;
  // const apiUrl = "https://api.sheety.co/46c50c36-f98f-4270-812c-f78377b90306";

  // const response = await fetch(apiUrl);
  // const data = await response.json();

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
