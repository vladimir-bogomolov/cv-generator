# AI CV Tailoring System

Generates job-specific CVs and cover letters using Claude. Given a job posting URL, it analyzes the role, selects relevant skills, and produces a tailored CV and cover letter — both as Markdown and PDF.

## How It Works

1. Paste a job posting URL into Claude Code
2. Claude analyzes the job, selects relevant skills, and generates:
   - `job_analysis.md` — structured breakdown of the role
   - `cv.md` — tailored CV aligned with the job
   - `cv.pdf` — print-ready PDF
   - `cover_letter.md` — short, human-written cover letter
   - `cover_letter.pdf` — PDF version

All output goes into `output/<company-name>/`.

## Project Structure

```
.claude/rules/       # Generation rules for Claude
assets/              # Profile photo
data/                # Candidate profile (experience, skills, education)
reference/           # CV structure reference
scripts/             # PDF generation script
output/              # Generated CVs per company (gitignored)
CLAUDE.md            # Main workflow instructions for Claude
```

## Setup

```bash
npm install
```

Requires Google Chrome installed at the default path for PDF generation.

## Usage

Open this project in Claude Code and paste a job posting URL. Claude handles the rest.

To regenerate a PDF manually:

```bash
node scripts/generate-pdf.js <company-name>
```

## Key Rules

- CV is always max 1 A4 page
- Never fabricates experience, companies, or metrics
- All 4 roles always included (Hastens, Forward, EmakinaNL, Frood)
- University skills labeled as such when included
- Summary written in first person, human tone
