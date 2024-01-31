const Router = require("express").Router();

const GeneralHelper = require("../helper/generalHelper");
const Validation = require("../helper/validationHelper");
const courseHelper = require("../helper/courseHelper");
const lecturerHelper = require("../helper/lecturerHelper");

const getCourse = async (req, res) => {
  try {
    const response = await courseHelper.getAllCourse();

    return res
      .status(200)
      .json({ message: "successfully get data", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

// Many-to-many case
const getCourseMember = async (req, res) => {
  try {
    const courseExist = await courseHelper.getCourseById(req.params.id);

    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    const response = await courseHelper.getCourseMember(req.params.id);
    return res
      .status(200)
      .json({ message: "successfully get data", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createCourse = async (req, res) => {
  try {
    Validation.courseValidation(req.body);

    if (req.body.lecturer_id) {
      const lecturerExist = await lecturerHelper.getLecturerById(
        req.body.lecturer_id
      );
      if (lecturerExist.length === 0)
        return res.status(404).json({ message: "Lecturer not found!" });
    }

    await courseHelper.addCourse(req.body.name, req.body.lecturer_id);

    return res.status(200).json({ message: "course successfully created" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseExist = await courseHelper.getCourseById(req.params.id);

    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    Validation.courseValidation(req.body);

    if (req.body.lecturer_id) {
      const lecturerExist = await lecturerHelper.getLecturerById(
        req.body.lecturer_id
      );
      if (lecturerExist.length === 0)
        return res.status(404).json({ message: "Lecturer not found!" });
    }

    await courseHelper.updateCourse(
      req.params.id,
      req.body.name,
      req.body.lecturer_id
    );

    return res.status(200).json({ message: "course successfully updated" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseExist = await courseHelper.getCourseById(req.params.id);

    if (courseExist.length === 0)
      return res.status(404).json({ message: "course not found!" });

    await courseHelper.deleteCourse(req.params.id);

    return res.status(200).json({ message: "course successfully deleted" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/", getCourse);
Router.get("/:id/get-student", getCourseMember);
Router.post("/create", createCourse);
Router.put("/update/:id", updateCourse);
Router.delete("/delete/:id", deleteCourse);

module.exports = Router;
