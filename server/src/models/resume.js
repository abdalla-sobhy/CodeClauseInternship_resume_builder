import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  templateId: {
    type: Number,
    required: [true, "template id is required"],
  },
  experience_company: { type: String, required: false },
  experience_details: { type: String, required: false },
  experience_position: { type: String, required: false },
  language_1: { type: String, required: false },
  language_2: { type: String, required: false },
  language_3: { type: String, required: false },
  language_4: { type: String, required: false },
  language_5: { type: String, required: false },
  profile_details: { type: String, required: false },
  refrence: { type: String, required: false },
  refrence_email: { type: String, required: false },
  refrence_number: { type: String, required: false },
  refrence_position: { type: String, required: false },
  skill_1: { type: String, required: false },
  skill_2: { type: String, required: false },
  skill_3: { type: String, required: false },
  skill_4: { type: String, required: false },
  skill_5: { type: String, required: false },
  university_name: { type: String, required: false },
  user_degree: { type: String, required: false },
  user_email: { type: String, required: false },
  user_job_title: { type: String, required: false },
  user_location: { type: String, required: false },
  user_name: { type: String, required: false },
  user_number: { type: String, required: false },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;

// experience_company, experience_details, experience_position, language_1, language_2, language_3
// language_4, language_5, profile_details, refrence, refrence_email, refrence_number, refrence_position, skill_1, skill_2, skill_3, skill_4
// skill_5, university_name, user_degree, user_email, user_job_title, user_location, user_name, user_number
