const Router = require("express").Router();

const GeneralHelper = require("../helper/generalHelper");
const Validation = require("../helper/validationHelper");
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
    return res.send(GeneralHelper.errorResponse(error));
  }
};

// Many-to-many case
const getStudentCourse = async (req, res) => {
  try {
    const studentExist = await studentHelper.getStudentById(req.params.id);

    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    const response = await studentHelper.getStudentCourse(req.params.id);
    return res
      .status(200)
      .json({ message: "successfully get data", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createStudent = async (req, res) => {
  try {
    Validation.studentValidation(req.body);

    await studentHelper.addStudent(req.body.name, req.body.major);

    return res.status(200).json({ message: "student successfully created" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentExist = await studentHelper.getStudentById(req.params.id);

    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    Validation.studentValidation(req.body);

    await studentHelper.updateStudent(
      req.params.id,
      req.body.name,
      req.body.major
    );

    return res.status(200).json({ message: "student successfully updated" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
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
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const assignToCourse = async (req, res) => {
  try {
    Validation.studentCourseValidation(req.body);

    const studentExist = await studentHelper.getStudentById(
      req.body.student_id
    );
    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    const courseExist = await courseHelper.getCourseById(req.body.course_id);
    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    const studentAlreadyMember = await studentCourseHelper.studentAlreadyMember(
      req.body.student_id,
      req.body.course_id
    );

    if (studentAlreadyMember.length > 0)
      return res
        .status(400)
        .json({ message: "Student already member in this course" });

    await studentCourseHelper.assignStudentToCourse(
      req.body.student_id,
      req.body.course_id
    );

    return res
      .status(200)
      .json({ message: "student successful assigned to course" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/", getStudent);
Router.get("/:id/get-course", getStudentCourse);
Router.post("/create", createStudent);
Router.post("/assign-to-course", assignToCourse);
Router.put("/update/:id", updateStudent);
Router.delete("/delete/:id", deleteStudent);

module.exports = Router;
