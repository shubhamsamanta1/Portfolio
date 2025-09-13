Portfolio Website
A modern, responsive personal portfolio website showcasing professional experience, projects, skills, certifications, and training.

Table of Contents
    1. About
    2. Features
    3. Demo
    4. Technologies Used
    5. Installation and Usage
    6. File Structure
    7. Accessibility


About
This portfolio website provides a comprehensive overview of professional skills, projects, and career development. It features a clean and modern user interface, smooth navigation, responsive layout, and subtle scroll animations for an engaging user experience across devices.

Features
Fixed header with navigation tabs and mobile menu toggle.

Smooth scrolling and dynamic tab highlighting for section navigation.

Responsive two-column layout for profile and contact details.

Project carousel with auto-play and manual controls.

Fade-in animations triggered on scroll using Intersection Observer API.

Skills, certifications, trainings, and recognitions presented as interactive elements.

Back-to-top button appears after scrolling for quick navigation.

Downloadable resume link (customizable).

Accessible markup with ARIA roles and keyboard focus support.

Demo
View the portfolio locally by opening the files in a web browser or serving the directory via a static file server.

Technologies Used
HTML5 & CSS3 (with CSS variables for theming)

Vanilla JavaScript (ES6+) including Intersection Observer for animations

Responsive design with CSS Grid and Flexbox

Google Fonts for typography

Semantic and accessible HTML

Installation and Usage
Clone or download the repository.

Ensure following files are in the root directory:

index.html

styles.css

script.js

data.js (profile data)

Assets like images, icons, and resume PDF (optional)

Open index.html in a modern browser for viewing.

Customize data.js to update profile details and content dynamically.

For development, use a live server to support smooth reloads and JavaScript features.

File Structure
text
/ (root)
│
├── index.html           # Main HTML file for portfolio
├── styles.css           # Stylesheet with variables and responsive layout
├── script.js            # JavaScript handling navigation, animations, and data insertion
├── data.js              # JavaScript file containing JSON-like data for profile content
├── resume.pdf           # Resume file (optional)
├── profile.jpg          # Profile photo (optional)
├── linkedin.svg         # Social icon assets
├── github.svg           # Social icon assets
└── fonts/               # Fonts directory if used locally (optional)
Accessibility
Fully keyboard navigable.

ARIA labels for screen reader support.

Visible focus indicators and semantic HTML tags.

Sufficient color contrast for text and interactive elements.