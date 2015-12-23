var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('assets', function() {
  gulp.src('assets/**', {base: 'assets'})
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', function () {
  browserify({
    entries: 'src/index.jsx',
    extensions: ['src/**/*.jsx'],
    debug: true
  })
  .transform(babelify, {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.src('src/**')
    .watch()
});


// gulp.task('js', function() {
//   gulp.src('src/**/*.js')
//     .pipe(sourcemaps.init())
//       .pipe(babel({
//         presets: ['es2015']
//       }))
//       .pipe(concat('app.js'))
//       .pipe(sourcemaps.write('.'))
//       .pipe(gulp.dest('dist'));
// });

gulp.task('serve', function() {
  gulp.src('./dist/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false
    }));
});

gulp.task('default', function() {
  gulp.watch(['src/**', 'assets/**'], ['build', 'assets']);
});

