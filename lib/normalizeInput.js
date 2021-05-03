module.exports = (input) => {
  let normalizedInput = input.trim().split(",");
  return normalizedInput.map((term) => {
    if (["true", "false"].includes(term)) {
      return JSON.parse(term);
    } else if (/^[\d\.]+$/.test(term)) {
      return +term;
    } else {
      return term;
    }
  });
};
