const db = require("../server/database");

const getAllCourse = async () => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(`SELECT * FROM course;`);

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

const getCourseById = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT * FROM course WHERE id = ${id};`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

// Many-to-many example
const getCourseMember = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT student.*
    FROM student
    JOIN student_course ON student.id = student_course.student_id
    JOIN course ON student_course.course_id = course.id
    WHERE course.id = '${id}';`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

const addCourse = async (name, lecturer_id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `INSERT INTO course (name, lecturer_id) VALUES (?, ?)`,
    [name, lecturer_id]
  );

  await poolConnection.connection.release();
};

const updateCourse = async (id, name, lecturer_id) => {
  const currentData = await getCourseById(id);

  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    "UPDATE course SET name = ?, lecturer_id = ? WHERE id = ?",
    [
      name ? name : currentData[0].name,
      lecturer_id ? lecturer_id : currentData[0].lecturer_id,
      id,
    ]
  );

  await poolConnection.connection.release();
};

const deleteCourse = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(`DELETE FROM course WHERE id = ${id};`);

  await poolConnection.connection.release();
};

module.exports = {
  addCourse,
  getAllCourse,
  getCourseById,
  getCourseMember,
  updateCourse,
  deleteCourse,
};
