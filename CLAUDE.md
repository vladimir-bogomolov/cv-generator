# AI CV Tailoring System

This project generates **job-specific CVs and cover letters** based on a job posting.

Claude analyzes the job description or job URL, identifies the domain and relevant keywords, and generates a tailored CV using the candidate's real experience and skills.

The output must look **human-written** and **professional**, never machine generated.

---

# Core Workflow

When a job posting or URL is provided:

1. Analyze the job using the rules in  
   @.claude/rules/job-analysis.md

2. Select relevant skills using  
   @.claude/rules/skills-selection.md

3. Generate the CV using  
   @.claude/rules/cv-generation.md

4. Generate the cover letter using  
   @.claude/rules/cover-letter.md

5. Apply writing style constraints from  
   @.claude/rules/writing-style.md

6. Ensure ATS keyword coverage using  
   @.claude/rules/ats-optimization.md

7. Ensure truthfulness using  
   @.claude/rules/truthfulness.md

8. Save outputs using  
   @.claude/rules/output-format.md

---

# Data Sources

All candidate information comes from the following files.

Professional experience:
@data/experience.md

Professional skills:
@data/professional_skills.md

University skills:
@data/university_skills.md

Education:
@data/education.md

Projects:
@data/projects.md

Certifications:
@data/certifications.md

CV structure reference:
@reference/example_cv.md

Profile photo:
@assets/photo.jpeg


Claude must **never invent information** outside these sources.

---

# Technical Skills Rules

Skills must be selected from:

- professional_skills.md
- university_skills.md

Professional skills can be used normally.

University skills must be labeled as: (university project experience)

# Professional Experience Rules
Experience data is stored in: data/experience.md


Claude should:

- rewrite bullet points to align with job keywords
- emphasize relevant technologies
- highlight impact where possible

Claude must:

- never invent roles
- never invent companies
- never exaggerate experience

---

# Keyword Optimization

Important job keywords should appear naturally in:

- summary
- technical skills
- experience bullet points

Avoid keyword stuffing.

The CV must still read naturally.

---

# Writing Style

The CV and cover letter must sound **human-written**.

Requirements:

- natural language
- concise phrasing
- professional tone

Strict rules:

- never use em dashes
- avoid robotic phrasing
- avoid generic AI filler
- prefer simple verbs like:
  - built
  - developed
  - designed
  - implemented
  - improved

---

# CV Structure

Use the structure defined in:
reference/example_cv.md

# Output

For each job application create a folder:
output/<company-name>/

Files generated:
job_analysis.md
cv.md
cv.pdf
cover_letter.md


The PDF must match the CV structure and look professional.

---

# General Principle

The goal is **a believable human CV tailored for the job**.

The CV should feel like it was carefully written for the company, not generated automatically.

# Context usage

Do not use context from @output folder. It is used only for storing the results.
