module.exports = ({ record, query }) => {
  return Object.values(record).some((attribute) => {
    if (Array.isArray(attribute)) {
      return query.some((searchTerm) => attribute.includes(searchTerm));
    }
    return query.some((searchTerm) => attribute === searchTerm);
  });
};
