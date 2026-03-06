# CV Generation Rules

Use the structure from:
reference/example_cv.md

Sections:

Summary  
Technical Skills  
Professional Experience
Languages
Education  

CV should be max 1 page A4 long - IMPORTANT!

# Contact Format

City and phone on the first line, email on the second line, LinkedIn on the third line. Each on its own line with no blank lines between (the PDF renderer treats single newlines as line breaks):

Amsterdam, The Netherlands | +31 6 4871 1578
vladimir.y.bogomolov@gmail.com
linkedin.com/in/vladi-bogomolov

---

# Summary

Create a concise summary tailored to the job.

Include:

domain  
relevant experience  
key technologies

Avoid buzzwords and exaggerated claims.

If the job is in ecommerce - highlight 5+ years of experience in the domain.

Always mention ability and openes to use AI tools like Cursor, Claude (Anthropic) to enhance productivity and code quality, and shift focus from writing code to architectural decisions and problem solving.

Write the summary in first person, but avoid starting every sentence with "I". Vary sentence structure: begin some sentences with a noun phrase (e.g. "5+ years of...", "Certified X with...") and use implicit first person (e.g. "Currently expanding into..." instead of "I am currently expanding into..."). Use "I" sparingly — at most once.

---

# Technical Skills

Group skills logically:

Languages  
Frameworks  
Cloud  
Databases  
Tools

Optionally group backend and frontend skills.

Include only relevant skills, but if there is spare space you can list all other professional skills. For university skills - only list if relevant to the job.

If the skill is important for the job, but missing in the lists - include it in CV as a topic of current learning (clearly mention it is a topic of current learning).

---

# Professional Experience

Always include ALL four roles in this order:
1. Full-Stack Developer — Hastens Beds
2. Full-Stack Developer — Forward
3. Backend Developer — EmakinaNL (EPAM Systems)
4. Independent Developer — Frood App

Frood App must always be included to demonstrate 5+ years of total experience. Keep it brief (2 bullet points max) if space is tight.

For each role:

Highlight technologies relevant to the job.

Align bullet points with job keywords where truthful.

Focus on impact and results when possible.

---

# Languages

Always list the same: 

English - C1 | Russian – Native | Dutch - B1

---

# Education  

Always list the same:

MSc Computer Science - University of Colorado Boulder - ongoing
PhD Technical Sciences
MSc & BSc Engineering

---

# Constraints

Do not fabricate:

companies
roles
projects
metrics

Do not use `---` separator lines between sections in cv.md. They add visual clutter and are hidden in the PDF anyway.

After running the PDF script, check its output. If it prints `[PAGE OVERFLOW]`, the CV is too long — shorten bullet points or remove less relevant content, rewrite cv.md, and regenerate. Repeat until no overflow warning appears.

---

# Markdown Heading Structure

The PDF renderer CSS maps heading levels strictly. Always use:

- `#` — candidate name only (first line)
- `##` — job title AND all section headers (Technical Skills, Professional Experience, Languages, Education)
- `###` — individual role headers (e.g. Full-Stack Developer — Hastens Beds)
- `*Month Year – Month Year*` — dates in italic

Correct skeleton:

```
# Vladimir Bogomolov
Amsterdam, The Netherlands | +31 6 4871 1578
vladimir.y.bogomolov@gmail.com
linkedin.com/in/vladi-bogomolov

## Job Title

[summary paragraph]

## Technical Skills

## Professional Experience

### Role — Company

*Month Year – Month Year*

- bullet

## Languages

## Education
```

Using `#` for sections and `##` for roles is wrong — it causes role headers to render centered and uppercase in the PDF.