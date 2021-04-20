const readlineSync = require("readline-sync");

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
      break;
    case "2":
      console.log("Search organisations");
      break;
    case "3":
      console.log("Search tickets");
      break;
    case "":
    case "x":
      break;
    default:
      console.log(
        "Invalid option entered. Please select from one of the above."
      );
  }
} while (option !== "x");
