var gulp = require('gulp');
var BuildTask = require('carbon-factory/lib/gulp/build');
var SpecTask = require('carbon-factory/lib/gulp/spec');

gulp.task('default', BuildTask({
  src: './example/main.js',
  jsDest: './example',
  cssDest: './example',
  fontDest: './example/assets/fonts'
}));

gulp.task('test', SpecTask());
