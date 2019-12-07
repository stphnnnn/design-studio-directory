/**
 *
 * @param {string} key - 'city' or 'country'
 * @param {string} term - filter term
 */

const getFilterQuery = (key, term) => `{
  allStudio(filter: {locations: {elemMatch: {${key}: {eq: "${term}"}}}}) {
    nodes {
      companyName
      locations {
        city
      }
    }
  }
}`;
