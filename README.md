# 🧪 Cypress POM Project

![Cypress Tests](https://github.com/CarobethPaez/cypress-pom-proyect/actions/workflows/cypress.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Cypress](https://img.shields.io/badge/Cypress-15-brightgreen)
![Node](https://img.shields.io/badge/Node.js-18-green)

E2E Testing framework built with Cypress and TypeScript using Page Object Model architecture.

## ✨ Features
- ✅ Page Object Model architecture
- ✅ TypeScript for type safety
- ✅ Fixtures for test data management
- ✅ Custom commands
- ✅ API testing with cy.intercept()
- ✅ CI/CD with GitHub Actions
- ✅ Multi-browser testing (Chrome + Firefox)
- ✅ Automated HTML reports with Mochawesome
- ✅ Screenshot on failure
- ✅ Video recording

## 🚀 Tech Stack
- **Cypress 15** — E2E Testing framework
- **TypeScript 5** — Type safety
- **Page Object Model** — Design pattern
- **GitHub Actions** — CI/CD pipeline
- **Mochawesome** — HTML Reports

## 📁 Project Structure
```
cypress/
├── e2e/
│   ├── auth/      # Login tests
│   ├── cart/      # Cart tests
│   └── api/       # API intercept tests
├── fixtures/      # Test data (JSON)
├── pages/         # Page Objects
└── support/       # Commands & config
```

## ▶️ How to Run
```bash
# Install dependencies
npm install

# Open Cypress UI
npm run cy:open

# Run all tests headless
npm run cy:run

# Run on Chrome
npm run cy:run:chrome

# Run on Firefox
npm run cy:run:firefox
```

## 📊 Reports
```bash
# Generate full HTML report
npm run test:report
```
Reports are automatically generated on every pipeline run and saved as artifacts for 30 days.

## 🌐 CI/CD
Tests run automatically on every push to **main** via GitHub Actions.
- ✅ Multi-browser testing (Chrome + Firefox)
- ✅ HTML reports as artifacts
- ✅ Video recording
- ✅ Screenshot on failure
- ✅ Scheduled runs Monday–Friday at 8am