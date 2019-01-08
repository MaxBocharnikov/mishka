var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
    return gulp.src("less/*.less")  // only compile the entry file
        .pipe(less())
        .pipe(gulp.dest("css"))
});

gulp.task('watch', function() {
    gulp.watch("less/*.less", gulp.series('less'), function(done){
    	done();
    });  // Watch all the .less files, then run the less task
});

gulp.task('default', gulp.series('watch'),function(done){
	done();
}); // Default will run the 'entry' watch task