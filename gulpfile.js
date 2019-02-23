var gulp = require('gulp'),
 	less = require('gulp-less'),
	prefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/script.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/less/style.less',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};



var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};



gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});



gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(uglify()) //Сожмем наш js
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});


gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(less()) //Скомпилируем
        .pipe(prefixer({
        	browsers: ['> 1%, Last 2 versions, iOS 11'],
        	cascade: false
        })) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});



gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});




gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
   	gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'webserver', 'watch']);

