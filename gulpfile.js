var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin');


var pathCSS = {
    stylus: ['stylus/*.styl'],
    css: 'build/css/'
};


gulp.task('imagenes',function(){

	return gulp.src(['src/imagenes/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/images/'));

});

gulp.task('estilos',['imagenes'], function () {
    return gulp.src(pathCSS.stylus)
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest(pathCSS.css));
});

gulp.task('html', ['estilos'] ,function() {
  return gulp.src('vistas/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('js', ['html'], function () {
	gulp.src('js/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
});

gulp.task('dev', ['imagenes', 'estilos', 'html', 'js']);