var
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  concat = require('gulp-concat'),
  plumber = require("gulp-plumber"),
  connect = require('gulp-connect');

var path = {
  build: {
    html: 'public/',
    js: 'public/javascripts/',
    style: 'public/stylesheets/',
    fonts: 'public/fonts/',
    img: 'public/img/'
  },
  src: {
    html: 'src/*.html',
    js: [
      'src/javascripts/lib/jquery-3.2.1.js',
      'src/javascripts/lib/handlebars-v4.0.10.js',
      'src/javascripts/*.js'
      ],
    style: 'src/stylesheets/style.scss',
    fonts: 'src/fonts/*',
    img: 'src/img/*.svg'
  },
  watch: {
    html: 'src/*.html',
    js: 'src/javascripts/**/*.js',
    style: 'src/stylesheets/style.scss'
  },
  outputDir: 'public/'
};

gulp.task('connect', function(){
  connect.server({
    root: [path.outputDir],
    port: 9999,
    livereload: true
  });
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(connect.reload());
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(path.build.style))
    .pipe(connect.reload());
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(connect.reload());
});

gulp.task('img:build', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(connect.reload());
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch([path.watch.html], ['html:build']);
  gulp.watch([path.watch.style], ['style:build']);
  gulp.watch([path.watch.js], ['js:build']);
});

gulp.task('build', [
  'html:build',
  'style:build',
  'js:build',
  'img:build',
  'fonts:build'
]);

gulp.task('default', ['build', 'watch', 'connect']);
