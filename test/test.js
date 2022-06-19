const bcrypt = require("bcrypt");

const password = "abcd1234";
let hash = bcrypt.hashSync(password, 10);

console.log(bcrypt.compareSync(password, "hash"));
