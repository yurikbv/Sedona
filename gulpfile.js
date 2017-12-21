'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');

gulp.task('sass', function () {
    gulp.src('sass/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('css'))
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(server.stream());
});

gulp.task('image',function () {
   return gulp.src('img/**/*.{png,jpg,svg}')
       .pipe(imagemin([
           imagemin.optipng({optimizationLevel: 5}),
           imagemin.jpegtran({progressive: true}),
           imagemin.gifsicle({interlaced: true}),
           imagemin.svgo({
               plugins: [
                   {removeViewBox: true},
                   {cleanupIDs: false}
               ]
           })
       ]))
       .pipe(gulp.dest('img'))
       .pipe(gulp.dest('sass/img'));
});

gulp.task('webp', function () {
    return gulp.src('img/**/*.{png,jpg}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('img'));
});

gulp.task("sprite", function () {
    return gulp.src("img/*-icon.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("img"));
});

gulp.task('watch',['sass'], function(){
    server.init({
        server: '.'
    });
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', server.reload);
});

