# 🧪 Cypress POM Project

![Cypress Tests](https://github.com/TU_USUARIO/cypress-pom-project/actions/workflows/cypress.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Cypress](https://img.shields.io/badge/Cypress-13-brightgreen)

E2E Testing framework built with Cypress and TypeScript using 
Page Object Model architecture.

## 🚀 Tech Stack
- **Cypress** — E2E Testing framework
- **TypeScript** — Type safety
- **Page Object Model** — Design pattern
- **GitHub Actions** — CI/CD pipeline

## 📁 Project Structure
cypress/
├── e2e/           # Test files
├── fixtures/      # Test data
├── pages/         # Page Objects
└── support/       # Commands & config

## ▶️ How to Run

# Install dependencies
npm install

# Open Cypress UI
npm run cy:open

# Run all tests headless
npm run cy:run

# Run on specific browser
npm run cy:run:chrome

## 🌐 CI/CD
Tests run automatically on every push and pull request via GitHub Actions.
Results include screenshots and videos as artifacts.