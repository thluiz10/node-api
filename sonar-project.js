const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
  serverUrl: 'http://localhost:9000',
  options: {
    'sonar.inclusions': 'src/**/*.js',
    'sonar.exclusions': 'src/tests/*.js',
    'sonar.tests': 'src/tests/',
    'sonar.verbose': 'true',
    'sonar.scm.disabled': 'true',
    'sonar.dependencyCheck.htmlReportPath': 'reports/dependency-check-report.html',
    'sonar.dependencyCheck.jsonReportPath': 'reports/dependency-check-report.json',
    'sonar.javascript.lcov.reportPaths': 'reports/lcov.info',
    'sonar.testExecutionReportPaths': 'reports/output.xml',
  }
}, () => { });