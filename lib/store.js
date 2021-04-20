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

  findUsers(query) {
    const matchingUsers = this.users.where((user) => {
      return Object.values(user).some((attribute) => {
        if (Array.isArray(attribute)) {
          return attribute.includes(query);
        }
        return attribute === query;
      });
    });

    return matchingUsers.map((user) => ({
      ...user,
      organisation: this.organisations.findById(user.organization_id),
      submittedTickets: this.tickets.where(
        (ticket) => ticket.submitter_id === user._id
      ),
      assignedTickets: this.tickets.where(
        (ticket) => ticket.assignee_id === user._id
      ),
    }));
  }
}

module.exports = Store;
