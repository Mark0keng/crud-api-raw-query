const db = require("../server/database");

const getStudentCourse = async (id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `SELECT student.*
    FROM student
    JOIN course_student ON student.id = course_student.student_id
    JOIN course ON course_student.course_id = course.id
    WHERE course.id = '${id}';`
  );

  await poolConnection.connection.release();
  const result = db.constructQueryResult(query);

  return Promise.resolve(result);
};

const assignStudentToCourse = async (student_id, course_id) => {
  const poolConnection = await db.ConnectionPool.getConnection();
  await poolConnection.query(
    `INSERT INTO student_course (student_id, course_id) VALUES (?, ?)`,
    [student_id, course_id]
  );

  await poolConnection.connection.release();
};

module.exports = { assignStudentToCourse };
