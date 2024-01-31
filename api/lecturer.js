const Router = require("express").Router();

const lecturerHelper = require("../helper/lecturerHelper");

const getLecturerCourse = async (req, res) => {
  try {
    const response = await lecturerHelper.getLecturerCourse(req.params.id);

    return res
      .status(200)
      .json({ message: "sucessfully get course", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createLecturer = async (req, res) => {
  try {
    await lecturerHelper.addLecturer(req.body.name);

    return res.status(200).json({ message: "lecturer successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateLecturer = async (req, res) => {
  try {
    const lecturerExist = await lecturerHelper.getLecturerById(req.params.id);

    if (lecturerExist.length === 0)
      return res.status(404).json({ message: "Lecturer not found!" });

    await lecturerHelper.updateLecturer(req.params.id, req.body.name);

    return res.status(200).json({ message: "lecturer successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const deleteLecturer = async (req, res) => {
  const lecturerExist = await lecturerHelper.getLecturerById(req.params.id);
  if (lecturerExist.length === 0)
    return res.status(404).json({ message: "Lecturer not found!" });

  await lecturerHelper.deleteLecturer(req.params.id);

  return res.status(200).json({ message: "lecturer successfully deleted" });
};

Router.get("/:id/get-course", getLecturerCourse);
Router.post("/create", createLecturer);
Router.put("/update/:id", updateLecturer);
Router.delete("/delete/:id", deleteLecturer);

module.exports = Router;
