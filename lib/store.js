const fs = require("fs");

const config = require("../config");
const jsonLoader = require("./jsonLoader");
const doesMatchQuery = require("./doesMatchQuery");
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
    const matchingUsers = this.users.where((user) =>
      doesMatchQuery({ record: user, query })
    );

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

  findTickets(query) {
    const matchingTickets = this.tickets.where((ticket) =>
      doesMatchQuery({ record: ticket, query })
    );

    return matchingTickets.map((ticket) => ({
      ...ticket,
      organisation: this.organisations.findById(ticket.organization_id),
      submitter: this.users.findById(ticket.submitter_id),
      assignee: this.users.findById(ticket.assignee_id),
    }));
  }
}

module.exports = Store;
