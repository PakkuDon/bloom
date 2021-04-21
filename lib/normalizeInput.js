module.exports = (input) => {
  let normalizedInput = input.trim();
  if (["true", "false"].includes(normalizedInput)) {
    normalizedInput = JSON.parse(normalizedInput);
  } else if (/^[\d\.]+$/.test(normalizedInput)) {
    normalizedInput = +normalizedInput;
  }
  return normalizedInput;
};
