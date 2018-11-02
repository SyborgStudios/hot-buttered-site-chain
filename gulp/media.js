// Load config variables from ../gulpconfig.js
var config = require('../gulpconfig').media;

var gulp = require('gulp'),
    runSequence = require('run-sequence');


gulp.task('apps', function () {
  return gulp.src(config.src.apps)
    .pipe(gulp.dest(config.dest.apps))
});


gulp.task('media', function (callback) {
  runSequence('apps', callback);
});

