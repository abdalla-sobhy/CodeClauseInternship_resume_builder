"use strict";

import Resume from "../models/resume.js";

export async function getResume(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const id = req.params.id;
    console.log(req.params.id);
    const resume = await Resume.findById(id).lean();
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json("Unexpected Error");
  }
}

export async function getAllResumes(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const resumes = await Resume.find({ userId: user._id }).lean();
    return res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json("Unexpected Error");
  }
}

export async function addResume(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const data = req.body.data;

    const newResume = new Resume({
      userId: user._id,
      ...data,
    });

    await newResume.save();
    return res
      .status(201)
      .json({ message: "Resume created successfully" });
  } catch (error) {
    console.error("Error creating resume:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        details: error.errors.tmplateId,
      });
    }

    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: error.keyValue.message, details: error.keyValue });
    }

    return res
      .status(500)
      .json({ message: "Unexpected Error", error: error.message });
  }
}

export async function editResume(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const resumeId = req.params.id;
    const newData = req.body;

    const existingResume = await Resume.findById(resumeId);

    if (!existingResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const isDataSame = Object.keys(newData).every(
      (key) => newData[key] === existingResume[key]
    );

    if (isDataSame) {
      return res.status(200).json({ message: "No changes detected" });
    }
    await Resume.findByIdAndUpdate(
      resumeId,
      { ...newData },
      { runValidators: true }
    );

    return res.status(200).json({ message: "Resume updated successfully" });
  } catch (error) {
    console.error("Error updating resume:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", details: error.errors });
    }

    return res.status(500).json({ message: "Unexpected Error" });
  }
}

export async function deleteResume(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const resume = await Resume.findOne({ userId: user.id }).lean();
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    await Resume.deleteOne({ userId: user._id });
    return res.status(200).json("resume Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json("Unexpected Error");
  }
}
