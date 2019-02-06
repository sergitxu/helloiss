//import gulp from 'gulp';
var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('sassCompile', async function() {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});