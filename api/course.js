const Router = require("express").Router();

const courseHelper = require("../helper/courseHelper");

const getCourse = async (req, res) => {
  try {
    const response = await courseHelper.getAllCourse();

    return res
      .status(200)
      .json({ message: "successfully get data", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Many-to-many example
const getStudentCourse = async () => {};

const createCourse = async (req, res) => {
  try {
    await courseHelper.addCourse(req.body.name, req.body.lecturer_id);

    return res.status(200).json({ message: "student successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseExist = await courseHelper.getCourseById(req.params.id);

    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    await courseHelper.updateCourse(
      req.params.id,
      req.body.name,
      req.body.lecturer_id
    );

    return res.status(200).json({ message: "course successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
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
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

Router.get("/", getCourse);
Router.get("/:id/get-student", getStudentCourse);
Router.post("/create", createCourse);
Router.put("/update/:id", updateCourse);
Router.delete("/delete/:id", deleteCourse);

module.exports = Router;
