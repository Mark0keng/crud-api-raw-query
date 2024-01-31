const Router = require("express").Router();

const GeneralHelper = require("../helper/generalHelper");
const Validation = require("../helper/validationHelper");
const lecturerHelper = require("../helper/lecturerHelper");

// One-to-many case
const getLecturerCourse = async (req, res) => {
  try {
    const lecturerExist = await lecturerHelper.getLecturerById(req.params.id);
    if (lecturerExist.length === 0)
      return res.status(404).json({ message: "Lecturer not found!" });

    const response = await lecturerHelper.getLecturerCourse(req.params.id);

    return res
      .status(200)
      .json({ message: "sucessfully get course", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createLecturer = async (req, res) => {
  try {
    Validation.lecturerValidation(req.body);

    await lecturerHelper.addLecturer(req.body.name);

    return res.status(200).json({ message: "lecturer successfully created" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const updateLecturer = async (req, res) => {
  try {
    const lecturerExist = await lecturerHelper.getLecturerById(req.params.id);
    if (lecturerExist.length === 0)
      return res.status(404).json({ message: "Lecturer not found!" });

    Validation.lecturerValidation(req.body);

    await lecturerHelper.updateLecturer(req.params.id, req.body.name);

    return res.status(200).json({ message: "lecturer successfully updated" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const deleteLecturer = async (req, res) => {
  try {
    const lecturerExist = await lecturerHelper.getLecturerById(req.params.id);
    if (lecturerExist.length === 0)
      return res.status(404).json({ message: "Lecturer not found!" });

    await lecturerHelper.deleteLecturer(req.params.id);

    return res.status(200).json({ message: "lecturer successfully deleted" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/:id/get-course", getLecturerCourse);
Router.post("/create", createLecturer);
Router.put("/update/:id", updateLecturer);
Router.delete("/delete/:id", deleteLecturer);

module.exports = Router;
