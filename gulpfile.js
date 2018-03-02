var gulp = require('gulp');

const { spawn } = require('child_process');


/**
 * Run webpack-dev-server
 */
gulp.task('ds', function() {
    let p = spawn('npm', ['start'])

    p.stdout.on('data', (data) => {
        console.log("%s", data)
    })
    p.stderr.on('data', (data) => {
        console.log("%s", data)
    })
});



/**
 * Run some arbitrary npm script. The script to be ran must be in process.env.DEV_SUBTASK
 */
gulp.task('npm-run', function() {
    let p = spawn('npm', ['run', process.env.DEV_SUBTASK])

    p.stdout.on('data', (data) => {
        console.log("%s", data)
    })
    p.stderr.on('data', (data) => {
        console.log("%s", data)
    })
});



