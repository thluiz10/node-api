module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          timeout: 6000,
          reporter: 'mocha-sonarqube-reporter',
          quiet: false,
          clearRequireCache: true,
          reporterOptions:{
            output : 'reports/output.xml'
          }
        },
        src: ['src/tests/*.js']
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');

};