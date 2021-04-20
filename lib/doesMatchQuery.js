module.exports = ({ record, query }) => {
  return Object.values(record).some((attribute) => {
    if (Array.isArray(attribute)) {
      return attribute.includes(query);
    }
    return attribute === query;
  });
};
