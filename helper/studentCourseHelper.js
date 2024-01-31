const db = require("../server/database");

const assignStudentToCourse = async (student_id, course_id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `INSERT INTO student_course (student_id, course_id) VALUES (?, ?)`,
    [student_id, course_id]
  );

  await poolConnection.connection.release();
};

const studentAlreadyMember = async (student_id, course_id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  const query = await poolConnection.query(
    `SELECT * FROM student_course WHERE student_id = '${student_id}' AND course_id = '${course_id}';`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

module.exports = { assignStudentToCourse, studentAlreadyMember };
