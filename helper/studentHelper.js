const db = require("../server/database");

const getStudent = async () => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(`SELECT * FROM student;`);

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

const getStudentById = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT * FROM student WHERE id = ${id};`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

// Many-to-many case
const getStudentCourse = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT course.*
    FROM course
    JOIN student_course ON course.id = student_course.course_id
    JOIN student ON student_course.student_id = student.id
    WHERE student.id = '${id}';`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

const addStudent = async (name, major) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `INSERT INTO student (name, major) VALUES ('${name}', '${major}');`
  );

  await poolConnection.connection.release();
};

const updateStudent = async (id, name, major) => {
  const currentData = await getStudentById(id);
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `UPDATE student
    SET name = '${name ? name : currentData[0].name}', major = '${
      major ? major : currentData[0].major
    }'
    WHERE id = ${id};`
  );

  await poolConnection.connection.release();
};

const deleteStudent = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(`DELETE FROM student WHERE id = ${id};`);

  await poolConnection.connection.release();
};

module.exports = {
  getStudent,
  getStudentById,
  getStudentCourse,
  addStudent,
  updateStudent,
  deleteStudent,
};
