'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

// Load plugins
var $ = require('gulp-load-plugins')();

gulp.task('appjs', function () {
    return gulp.src('app/app.js')
        .pipe($.browserify())
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

gulp.task('bower', function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist/app/lib'))
        .pipe($.connect.reload());
});

// Scripts
/*.pipe($.jshint())
    .pipe($.jshint.reporter('default'))*/
gulp.task('scripts', function () {
    return gulp.src(['app/src/**/*.js'])
        .pipe($.ignore.exclude('**/app.js'))
        .pipe(gulp.dest('dist/src'))
        .pipe($.connect.reload());
    });

gulp.task('less', function () {
    return gulp.src(['app/web-app/less/app.less'])
            .pipe($.less())
            .pipe($.rename('app.css'))
            .pipe(gulp. dest('dist/css'));
});

gulp.task('html', function () {
    return gulp.src('app/src/**/*.html')
        .pipe($.ignore.exclude('**/index.html'))
        .pipe(gulp.dest('dist/src'))
        .pipe($.connect.reload());
    });

// Images
gulp.task('images', function () {
    return gulp.src('app/web-app/images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe($.size())
        .pipe($.connect.reload());
    });

gulp.task('index', function () {
    var scriptsAndStyle = gulp.src(['dist/**/*.js', 'dist/**/*.css'])
        .pipe($.order(['**/skrollr.js', '**/app.js', 'dist/**/conf.js', 'dist/**/*.js', 'dist/**/*.css']));

    return gulp.src('app/index.html')
        .pipe($.inject(scriptsAndStyle, {addRootSlash: false, read: false, ignorePath: ['dist']}))
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());
});

gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false}).pipe($.clean());
});


// Build
gulp.task('build', function(callback) {
    runSequence( 'less', 'appjs', 'scripts', 'bower', 'html', 'images', 'index',
        callback
    );
});

gulp.task('heroku:production', function(callback) {
    runSequence( 'build',
        callback
    );
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
    root: ['dist'],
    port: 9005,
    livereload: true
}));

// Watch
gulp.task('watch', function () {

    // Watch .html files
    gulp.watch('app/**/*.html', ['build']);

    // Watch less files
    gulp.watch('app/web-app/less/*.less', ['build']);

    // Watch .js files
    gulp.watch('app/**/*.js', ['build']);
});
