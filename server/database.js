const _ = require("lodash");
const MySQL = require("promise-mysql2");

const ConnectionPool = MySQL.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dummy_college_db",
  port: "3306",
  connectionLimit: "1",
});

const constructQueryResult = (query) => {
  const result = [];
  if (!_.isEmpty(query[0])) {
    query[0].forEach((item) => {
      const key = Object.keys(item);

      // Reconstruct query result
      const object = {};
      key.forEach((data) => {
        object[data] = item[data];
      });

      result.push(object);
    });
  }

  return result;
};

module.exports = { ConnectionPool, constructQueryResult };
