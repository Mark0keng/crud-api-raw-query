const Router = require("express").Router();

const studentCourseHelper = require("../helper/studentCourseHelper");
const studentHelper = require("../helper/studentHelper");
const courseHelper = require("../helper/courseHelper");

const getStudent = async (req, res) => {
  try {
    const response = await studentHelper.getStudent();

    return res
      .status(200)
      .json({ message: "successfully get data", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createStudent = async (req, res) => {
  try {
    await studentHelper.addStudent(req.body.name, req.body.major);

    return res.status(200).json({ message: "student successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentExist = await studentHelper.getStudentById(req.params.id);

    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    await studentHelper.updateStudent(
      req.params.id,
      req.body.name,
      req.body.major
    );

    return res.status(200).json({ message: "student successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentExist = await studentHelper.getStudentById(req.params.id);

    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    await studentHelper.deleteStudent(req.params.id);

    return res.status(200).json({ message: "student successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const assignToCourse = async (req, res) => {
  try {
    const studentExist = await studentHelper.getStudentById(
      req.body.student_id
    );
    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    const courseExist = await courseHelper.getCourseById(req.body.course_id);
    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    await studentCourseHelper.assignStudentToCourse(
      req.body.student_id,
      req.body.course_id
    );

    return res
      .status(200)
      .json({ message: "student successful assigned to course" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

Router.get("/", getStudent);
Router.post("/create", createStudent);
Router.post("/assign-to-course", assignToCourse);
Router.put("/update/:id", updateStudent);
Router.delete("/delete/:id", deleteStudent);

module.exports = Router;
