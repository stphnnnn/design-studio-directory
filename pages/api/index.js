import { getStudios, getLocations } from "../../dataHelpers";

export default async (req, res) => {
  const apiUrl = process.env.EXTERNAL_API_ENDPOINT;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const studios = getStudios(data);
  const locations = getLocations(studios);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ studios, locations }));
};
