const readlineSync = require("readline-sync");
const Store = require("./lib/store");
const normalizeInput = require("./lib/normalizeInput");

const main = () => {
  const store = new Store();
  store.loadData();

  let option = "";

  do {
    console.log(`
=============================
Support Ticket Search
=============================
1) Search users
2) Search organisations
3) Search tickets
X) Exit
    `);

    option = readlineSync.question("Choose an option: ").toLowerCase().trim();

    switch (option) {
      case "1":
        console.log("Search users");
        console.log("-----------------------------");
        searchUsers(store);
        break;
      case "2":
        console.log("Search organisations");
        console.log("-----------------------------");
        searchOrganisations(store);
        break;
      case "3":
        console.log("Search tickets");
        searchTickets(store);
        break;
      case "x":
        console.log("Exiting...");
        break;
      default:
        console.log(
          "Invalid option entered. Please select from one of the above."
        );
    }
  } while (option !== "x");
};

const searchUsers = (store) => {
  let query = normalizeInput(readlineSync.question("Query: "));
  const results = store.findUsers(query);
  results.forEach((user) => {
    printRecord({ record: user });
    console.log("-----------------------------");
  });
  console.log(`${results.length} users found.`);
};

const searchTickets = (store) => {
  let query = normalizeInput(readlineSync.question("Query: "));
  const results = store.findTickets(query);
  results.forEach((ticket) => {
    printRecord({ record: ticket });
    console.log("-----------------------------");
  });
  console.log(`${results.length} tickets found.`);
};

const searchOrganisations = (store) => {
  let query = normalizeInput(readlineSync.question("Query: "));
  const results = store.findOrganisations(query);
  results.forEach((organisation) => {
    printRecord({ record: organisation });
    console.log("-----------------------------");
  });
  console.log(`${results.length} organisations found.`);
};

const printRecord = ({ record }) => {
  for (const [key, value] of Object.entries(record)) {
    if (Array.isArray(value)) {
      console.log(`${key}:`);
      value.forEach((element) => {
        if (typeof element === "object") {
          printRecord({
            record: element,
          });
        } else {
          console.log(`${element}`);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      console.log(`${key}:`);
      printRecord({ record: value });
    } else {
      console.log(`${key}: ${value}`);
    }
  }
};

main();
