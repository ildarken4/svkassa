import gulp from 'gulp';
import gulpIf from 'gulp-if';
import browserSyncLib from 'browser-sync';
const browserSync = browserSyncLib.create();
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import jsImport from 'gulp-js-import';
import sourcemaps from 'gulp-sourcemaps';
import htmlPartial from 'gulp-html-partial';
import clean from 'gulp-clean';
// import postcss from 'gulp-postcss';
import autoprefixer from 'gulp-autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const isProd = process.env.NODE_ENV === 'prod';

const sass = gulpSass(dartSass);

const htmlFile = [
    'src/*.html'
];

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('build'));
}

function css() {
    return gulp.src('src/sass/*.scss')
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulpIf(!isProd, sourcemaps.write()))
        .pipe(gulpIf(isProd, cssmin()))
        .pipe(gulp.dest('build/css/'));
}

function fonts() {
    return gulp.src('src/fonts/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('build/fonts'));
}

function js() {
    return gulp.src('src/js/*.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest('build/js'));
}

function img() {
    return gulp.src('src/images/**/*.*')
        .pipe(gulpIf(isProd, imagemin()))
        .pipe(gulp.dest('build/images/'));
}

function serveTask() {
    browserSync.init({
        open: true,
        server: './build'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}


function watchFiles() {
    gulp.watch('src/**/*.html', {usePolling: true}, gulp.series(html, browserSyncReload));
    gulp.watch('src/sass/**/*.scss', {usePolling: true}, gulp.series(css, browserSyncReload));
    gulp.watch('src/js/*.js', {usePolling: true}, gulp.series(js, browserSyncReload));
    gulp.watch('src/images/**/*.*', {usePolling: true}, gulp.series(img));
    gulp.watch('src/fonts/*.{eot,svg,ttf,woff,woff2}', {usePolling: true}, gulp.series(fonts));
}

function cleanBuild() {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
}

export const del = cleanBuild;
export const serve = gulp.parallel(html, css, js, img, fonts, watchFiles, serveTask);
export default gulp.series(cleanBuild, html, css, js, img, fonts);
