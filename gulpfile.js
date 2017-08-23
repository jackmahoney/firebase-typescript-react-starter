const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('webpack', () => {
  return gulp.src('./src/tsx/index.tsx')
    .pipe(gulpWebpack({
      devtool: "source-map",
      output: {
        filename: 'bundle.js'
      },
      resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"]
      },
      module: {
          rules: [
              { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
              { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
          ]
      }
  }, webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['sass', 'webpack'], () => {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/tsx/**/*.ts*', ['webpack']);
})