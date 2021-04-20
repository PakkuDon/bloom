const fs = require("fs");

const config = require("../config");
const jsonLoader = require("./jsonLoader");
const Repository = require("./repository");

class Store {
  constructor() {
    this.users = new Repository();
    this.tickets = new Repository();
    this.organisations = new Repository();
  }

  loadData() {
    this.loadUserData();
    this.loadTicketData();
    this.loadOrganisationData();
  }

  loadUserData() {
    const userRecords = jsonLoader.loadUsers(fs.readFileSync(config.usersFile));
    userRecords.forEach((record) => {
      this.users.add(record);
    });
  }

  loadTicketData() {
    const ticketRecords = jsonLoader.loadTickets(
      fs.readFileSync(config.ticketsFile)
    );
    ticketRecords.forEach((record) => {
      this.tickets.add(record);
    });
  }

  loadOrganisationData() {
    const organisationRecords = jsonLoader.loadOrganisations(
      fs.readFileSync(config.organisationsFile)
    );
    organisationRecords.forEach((record) => {
      this.organisations.add(record);
    });
  }
}

module.exports = Store;
