const Router = require("express").Router();

const studentCourseHelper = require("../helper/studentCourseHelper");
const studentHelper = require("../helper/studentHelper");
const courseHelper = require("../helper/courseHelper");

const assignStudentToCourse = async (req, res) => {
  try {
    const studentExist = studentHelper.getStudentById();
    if (studentExist.length === 0)
      return resizeBy.status(404).json({ message: "Student not found!" });

    const courseExist = courseHelper.getCourseById();
    if (courseExist.length === 0)
      return resizeBy.status(404).json({ message: "Course not found!" });

    await studentCourseHelper.assignStudentToCourse(
      req.body.student_id,
      req.body.course_id
    );

    return res
      .status(200)
      .json({ message: "student successful assigned to course" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

Router.post("/assign-to-course", assignStudentToCourse);

module.exports = Router;
