var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    pug = require('gulp-pug'), //pug.
    cssnano= require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    uglify= require('gulp-uglify-es').default, // Подключаем gulp-uglifyjs (для сжатия JS)
    rename= require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    rigger = require('gulp-rigger'),
    gcmq = require('gulp-group-css-media-queries');
    // autoprefixer=require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('dev/sass/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        // .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        //     cascade: true
        // })) // Создаем префиксы
        
        .pipe(gcmq())
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano({ 
            zindex: false,
            reduceIdent : { 
                keyframes: false
            }  
        }))
        .pipe(gulp.dest('product/style')) // Выгружаем результата в папку app/css
});

gulp.task('sassLib', function () { // Создаем таск Sass
    return gulp.src('dev/sass/lib/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('product/style/lib/')) // Выгружаем результата в папку app/css
        .pipe(cssnano({ 
            zindex: false,
            reduceIdent : { 
                keyframes: false
            }  
        }))
    });

gulp.task('views', function () {
    return gulp.src('dev/views/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: false
    }))
    .pipe(gulp.dest('product/'))
})

gulp.task('scripts', function() {
    return gulp.src('dev/js/*.js')
        .pipe(rigger())
        //.pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('product/script')); // Выгружаем в папку dev/js
});


gulp.task('watch', function () {
    gulp.watch(['dev/sass/**/*.sass','dev/sass/**/*.scss'], gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
    gulp.watch(['dev/sass/**/*.sass','dev/sass/**/*.scss','dev/sass/**/*.css'], gulp.parallel('sassLib')); // Наблюдение за sass файлами в папке sass
    gulp.watch('dev/views/**/*.pug', gulp.parallel('views')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('dev/js/**/*.js', gulp.parallel('scripts'));
});

gulp.task('start', gulp.parallel('watch'));