'use strict';
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const source = require('vinyl-source-stream');
const RESOURCE_FILE = ['src/Assets/json/**'];
const TEST_RESOURCE_FILE = ['src/Helpers/TestData/**'];
const SVG_FILES = ['src/Assets/images/svg/*.svg'];
const FontsFilePath = 'src/Assets/json';

// --------------------------------------------------------
// Copying Resources
// --------------------------------------------------------
gulp.task('resource-copy', function () {
    return gulp.src(RESOURCE_FILE)
        .pipe(gulp.dest('lib/Assets/json'));
});
gulp.task('test-data-copy', function () {
    return gulp.src(TEST_RESOURCE_FILE)
        .pipe(gulp.dest('lib/Helpers/TestData/'));
});
// --------------------------------------------------------
// config task
// --------------------------------------------------------
gulp.task('default', ['watch', 'resource-copy', 'test-data-copy']);
function String2JSON(path, name, string) {
    const stream = source(name);
    stream.end(string);
    stream.pipe(gulp.dest(path));
}
gulp.task('build', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("lib"));
});