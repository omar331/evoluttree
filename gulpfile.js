var gulp = require('gulp');

const exec = require('child_process').exec;

gulp.task('ds', function() {
    exec('npm start')
});

