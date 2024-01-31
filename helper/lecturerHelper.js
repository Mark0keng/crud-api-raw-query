const db = require("../server/database");

const getLecturerById = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT * FROM lecturer WHERE id = ${id};`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

const addLecturer = async (name) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(`INSERT INTO lecturer (name) VALUES (?)`, [name]);

  await poolConnection.connection.release();
};

const updateLecturer = async (id, name) => {
  const currentData = await getLecturerById(id);

  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `UPDATE lecturer
    SET name = '${name ? name : currentData[0].name}' WHERE id = ${id};`
  );

  await poolConnection.connection.release();
};

const deleteLecturer = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(`DELETE FROM lecturer WHERE id = ${id};`);

  await poolConnection.connection.release();
};

const getLecturerCourse = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT course.name FROM course LEFT JOIN lecturer ON course.lecturer_id = lecturer.id WHERE course.lecturer_id = '${id}';`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

module.exports = {
  addLecturer,
  getLecturerById,
  getLecturerCourse,
  updateLecturer,
  deleteLecturer,
};
