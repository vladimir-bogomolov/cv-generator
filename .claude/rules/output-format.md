# Output Format Rules

Each job application must create a folder:

output/<company-name>/

Example:

output/stripe/  
output/shopify/  
output/coinbase/

---

# Generated Files

position.md
job_analysis.md
cv.md
cv.pdf
cover_letter.md
cover_letter.pdf

---

# Naming Rules

Use lowercase kebab case for company folders.

Example:

amazon-web-services
google-cloud

---

# PDF Generation

After writing cv.md, generate the PDF by running:

```
node scripts/generate-pdf.js <company-name>
```

This script reads output/<company-name>/cv.md, renders it with professional CSS styling, and saves output/<company-name>/cv.pdf using the system Chrome browser.

If the script outputs `[PAGE OVERFLOW]`, the CV exceeds 1 A4 page. Shorten the cv.md (trim bullet points, remove less relevant content) and regenerate until no overflow warning appears.