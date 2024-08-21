import { Router } from "express";
import { addResume, editResume, deleteResume,getAllResumes,getResume } from "../controllers/resume.js";
import { authenticateToken } from "../middlewares/token_validation.js";

const resumeRouter = Router();

resumeRouter.post("/add-resume", authenticateToken, addResume);
resumeRouter.get("/get-resumes", authenticateToken, getAllResumes);
resumeRouter.get("/get-resume/:id", authenticateToken, getResume);
resumeRouter.patch("/edit-resume/:id", authenticateToken, editResume);
resumeRouter.delete("/delete-resume/:id", authenticateToken, deleteResume);

export default resumeRouter;
