const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

async function generateReport() {
  try {
    // Paso 1: Merge de todos los JSON
    const jsonReport = await merge({
      files: ['cypress/reports/mochawesome/mochawesome*.json'],
    })

    // Paso 2: Generar HTML
    await generator.create(jsonReport, {
      reportDir: 'cypress/reports/mochawesome',
      reportFilename: 'report',
      reportTitle: 'Cypress POM Project — E2E Test Results',
      reportPageTitle: 'cypress-pom-project — Test Results',
      inline: true,
      saveJson: true,
      saveHtml: true,
      charts: true,        // ← gráficos de resultados
    })

    console.log('✅ Reporte generado exitosamente!')
    console.log('📊 Abre: cypress/reports/mochawesome/report.html')

  } catch (error) {
    console.error('❌ Error generando reporte:', error)
    process.exit(1)
  }
}

generateReport()