const readlineSync = require('readline-sync');
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
  `)

  option = readlineSync.question("Choose an option: ").toLowerCase().trim();
} while (option !== 'x')
