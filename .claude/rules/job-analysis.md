# URL Fetching Strategy

When a job URL is provided:

**Step 1 — Try WebFetch first**
Use the WebFetch tool. If the returned content contains the full job description (title, requirements, responsibilities), use it directly.

**Step 2 — Fall back to Playwright MCP (headless)**
If WebFetch returns empty or incomplete content (JS-rendered page), use Playwright MCP:

1. `browser_navigate` to the URL
2. `browser_wait_for` 3 seconds for JS to render
3. `browser_evaluate` to extract text:
   `() => document.body.innerText`

Do NOT use `browser_snapshot`, `browser_take_screenshot`, or any other Playwright tools.
The browser runs headless — no visible window will open.

---

# Job Analysis Rules

When given a job description or job URL:

Extract the following information.

Company name  
Job title  
Location  
Seniority level  

Technical requirements  
Preferred technologies  
Responsibilities  
Soft skills  

---

# Domain Identification

Determine the primary industry domain.

Examples:

E-commerce  
Blockchain  
Fintech  
AI / Machine Learning  
SaaS  
Cloud infrastructure  
Developer tools  
Cybersecurity  
Data engineering

The domain should be inferred from:

company product  
technologies mentioned  
industry language

---

# Keyword Extraction

Build a keyword list including:

languages  
frameworks  
platforms  
tools  
methodologies  
domain terms

Example:

React  
TypeScript  
AWS  
GraphQL  
Microservices  
Event-driven architecture

---

# Output

Save the structured analysis to:
output/<company-name>/job_analysis.md