import personal from "./personal.json";
import education from "./education.json";
import experience from "./experience.json";
import skills from "./skills.json";
import projects from "./projects.json";
import languages from "./languages.json";
import certifications from "./certifications.json";
import interests from "./interests.json";

export { personal, education, experience, skills, projects, languages, certifications, interests };

/** Aggregated portfolio data — single import for convenience */
export const portfolioData = {
  personal,
  education,
  experience,
  skills,
  projects,
  languages,
  certifications,
  interests,
};

export default portfolioData;
