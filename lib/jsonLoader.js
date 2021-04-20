module.exports = {
  loadUsers(json) {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      throw new TypeError("User data must be provided as an array");
    }

    return data;
  },
  loadTickets(json) {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      throw new TypeError("Ticket data must be provided as an array");
    }

    return data;
  },
  loadOrganisations(json) {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) {
      throw new TypeError("Organisation data must be provided as an array");
    }

    return data;
  },
};
