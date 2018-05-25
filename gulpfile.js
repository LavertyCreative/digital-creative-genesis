var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
  .pipe(plumber(plumberErrorHandler))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./assets/css'))
  .pipe(cssnano())
  .pipe(concat('style.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./assets/css'));
});

gulp.task('scripts', function () {
  gulp.src('./src/js/*.js')
	.pipe(plumber(plumberErrorHandler))
  .pipe(jshint())
  .pipe(gulp.dest('./assets/js'))
	.pipe(uglify())
  .pipe(concat('site.min.js'))
	.pipe(gulp.dest('./assets/js'));
});

gulp.task('images', function () {
  gulp.src('./src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./assets/images'))
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/images/*', ['images']);
});

gulp.task('default', ['sass', 'scripts', 'images', 'watch']);
