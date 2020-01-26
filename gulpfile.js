const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const root_path = "/Users/jklee/Desktop/jklee/"
const deploy = require('gulp-gh-pages');
// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src([root_path + 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(root_path + "src/css"))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "/Users/jklee/Desktop/jklee/src"
    });

    gulp.watch([root_path + 'src/scss/*.scss'], ['sass']);
    gulp.watch(root_path + "src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);

gulp.task('deploy', function () {
    return gulp.src("./src/**/*")
      .pipe(deploy())
  });
