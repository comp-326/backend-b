/* eslint-disable @typescript-eslint/no-non-null-assertion */
import alias from 'gulp-ts-alias';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import ts from 'gulp-typescript';
// Gulp buildProject task
//  Language: TypeScript
//  Path: tasks/gulp/buildProject.ts
const tsProject = ts.createProject('tsconfig.json');

function buildProject() {
	const compiled = gulp
		.src('src/**/*.ts')
		.pipe(alias(tsProject.config.compilerOptions))
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return compiled.js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./build'));
}

export default gulp.task('buildProject', buildProject);