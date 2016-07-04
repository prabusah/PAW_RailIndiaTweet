var gulp = require('gulp');

// define plug-ins
var gulpFilter = require('gulp-filter');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
 
// Define paths variables
var dest_path =  'static/assets';
var paths = {
  scripts: ['node_modules/bootstrap/dist/js/*.js', 'node_modules/bootstrap/dist/css/*.css', 
  'node_modules/jquery/dist/*.js', 'node_modules/typeahead.js/dist/typeahead.bundle.min.js'],
};
var customJSPath = {
  customScripts: ['static/assets/js/common.js']
};
gulp.task('js', function() {
    var jsFilter = gulpFilter('*min.js');

    return gulp.src(paths.scripts)
    .pipe(jsFilter)
    .pipe(gulp.dest(dest_path + '/js/'));
});
gulp.task('css', function() {
	 var cssFilter = gulpFilter('*min.css');

    return gulp.src(paths.scripts)
    .pipe(cssFilter)
    .pipe(gulp.dest(dest_path + '/css/'));
});
gulp.task('compressJS', function() {
     return gulp.src(customJSPath.customScripts)
    .pipe(minify({ignoreFiles: ['*min.js', '*.css']}))
    .pipe(gulp.dest(dest_path + '/js/'));
});


gulp.task('default', ['js', 'css', 'compressJS']);
