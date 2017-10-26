// generated on 2017-08-13 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.', 'bower_components']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(dev, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
    .pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: {compress: {drop_console: true}},
      processConditionalComments: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch([
      'app/*.html',
      'app/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], 'build', resolve);
  });
});







// MARK: Create the HTML files for iOS Native App
gulp.task('ios', ['grab', 'build'], function () {
  var replace = require('gulp-replace');
  var rename = require("gulp-rename");
  var thedatestamp = new Date().getTime();
  var fs = require('fs');

  var storyCSS = fs.readFileSync('dist/styles/main-story.css', 'utf8');
  var storyMainJS = fs.readFileSync('dist/scripts/main-story.js', 'utf8');
  var storyKeyJS = fs.readFileSync('dist/scripts/key.js', 'utf8');

  var listCSS = fs.readFileSync('dist/styles/main-list.css', 'utf8');
  var listMainJS = fs.readFileSync('dist/scripts/main-list.js', 'utf8');
  var listKeyJS = fs.readFileSync('dist/scripts/key-list.js', 'utf8');

  var analyticsJS = fs.readFileSync('dist/scripts/analytics.js', 'utf8');
  var searchCSS  = fs.readFileSync('dist/styles/main-search.css', 'utf8');
  var searchJS = fs.readFileSync('dist/scripts/search.js', 'utf8');

  var ebookCSS = fs.readFileSync('dist/styles/main-ebook.css', 'utf8');
  var ebookMainJS = fs.readFileSync('dist/scripts/main-ebook.js', 'utf8');
  var ebookKeyJS = fs.readFileSync('dist/scripts/key-ebook.js', 'utf8');

  var htmlBookCSS = fs.readFileSync('dist/styles/main-html-book.css', 'utf8');
  var htmlBookJS = fs.readFileSync('dist/scripts/main-html-book.js', 'utf8');

  // var googleanalytics = fs.readFileSync('dist/log/ga.js', 'utf8');
  // var fa = fs.readFileSync('dist/log/analytics.js', 'utf8');

  gulp.src(['app/templates/register.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/register.html')
    });

  gulp.src(['app/templates/account.html'])
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/account.html')
    });


  gulp.src(['app/templates/search.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{search-css}}', searchCSS))
    .pipe(replace('{{search-js}}', searchJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/search.html')
    });

  gulp.src(['app/templates/story.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(rename('story.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/story.html')
    });


  gulp.src(['app/templates/list.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{list-css}}', listCSS))
    .pipe(replace('{{list-js-main}}', listMainJS))
    .pipe(replace('{{list-js-key}}', listKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/list.html')
    });

  gulp.src(['app/templates/ebook.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', ebookCSS))
    .pipe(replace('{{story-js-main}}', ebookMainJS))
    .pipe(replace('{{story-js-key}}', ebookKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(rename('ebook.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/ebook.html')
    });


  gulp.src(['app/templates/html-book.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{html-book-css}}', htmlBookCSS))
    .pipe(replace('{{html-book-js}}', htmlBookJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/html-book.html')
    });








  // MARK: FTCC Files
  var ftccPersonCSS = fs.readFileSync('dist/styles/main-ftcc-person.css', 'utf8');
  var ftccStoryCSS = fs.readFileSync('dist/styles/main-ftcc.css', 'utf8');
  var ftccStoryMainJS = fs.readFileSync('dist/scripts/main-ftcc-story.js', 'utf8');
  var ftccStoryKeyJS = fs.readFileSync('dist/scripts/key-ftcc.js', 'utf8');
  var ftccPersonJS = fs.readFileSync('dist/scripts/person-information.js', 'utf8');

  gulp.src(['app/templates/register-ftcc.html'])
    .pipe(replace('{{person-css}}', ftccPersonCSS))
    .pipe(rename('register.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/register.html')
    });

  gulp.src(['app/templates/account-ftcc.html'])
    .pipe(replace('{{person-css}}', ftccPersonCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(rename('account.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/account.html')
    });

  gulp.src(['app/templates/search.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{search-css}}', searchCSS))
    .pipe(replace('{{search-js}}', searchJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/search.html')
    });

  gulp.src(['app/templates/story-ftcc.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', ftccStoryCSS))
    .pipe(replace('{{story-js-main}}', ftccStoryMainJS))
    .pipe(replace('{{story-js-key}}', ftccStoryKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(rename('story.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/story.html')
    });


  gulp.src(['app/templates/list.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{list-css}}', listCSS))
    .pipe(replace('{{list-js-main}}', listMainJS))
    .pipe(replace('{{list-js-key}}', listKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/list.html')
    });

  gulp.src(['app/templates/ebook.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', ebookCSS))
    .pipe(replace('{{story-js-main}}', ebookMainJS))
    .pipe(replace('{{story-js-key}}', ebookKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(rename('ebook.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/ebook.html')
    });


  gulp.src(['app/templates/html-book.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{html-book-css}}', htmlBookCSS))
    .pipe(replace('{{html-book-js}}', htmlBookJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/html-book.html')
    });

 gulp.src(['app/templates/person-information.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{person-css}}', ftccPersonCSS))
    // .pipe(replace('{{story-js-key}}', ebookKeyJS))
    // .pipe(replace('{{analytics}}', analyticsJS))
    
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/person-information.html')
    });

  gulp.src(['app/templates/my-love-ftcc.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', ftccStoryCSS))
    .pipe(replace('{{person-css}}', ftccPersonCSS))
    .pipe(replace('{{person-js}}', ftccPersonJS)) 
    .pipe(rename('my-love.html')) 
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTCC/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTCC/my-love.html')
    });











    // .on('end', function() {
    //   var fs = require('fs');
    //   var chineseConv = require('chinese-conv');
    //   var htmlFileInString = fs.readFileSync('../testing/dev_www/mobile_webroot/androidapp.html', 'utf8');
    //   var data = chineseConv.tify(htmlFileInString);
    //   var fileName = '../testing/dev_www/mobile_webroot/androidappbig5.html';
    //   fs.writeFile(fileName, data, function(err) {
    //         if(err) {
    //             return console.log(err);
    //         }
    //         console.log('big 5 file writen to ' + fileName);
    //   });
    // });
    //.pipe(rename('androidappbig5.html'));
});

gulp.task('grab', function () {
  getUrltoFile('http://app003.ftmailbox.com/index.php/users/register?i=4&webview=ftcapp', './app/templates/register.html');
});


// MARK: code created for this project specifically
function getUrltoFile (urlSource, fileName) {
  var http = require('http');
  var url = require('url');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
  }
  console.log (options.path);
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      //console.log (data);
      res.on('end', function () {
        var fs = require('fs');
        fs.writeFile(fileName, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('writen to');
            console.log(fileName);
        });
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.end();
}

//convert2Big5('../NewFTCApp-iOS/Page/FTChinese/account.html')
function convert2Big5(originFile) {
    var fs = require('fs');
    var chineseConv = require('chinese-conv');
    var htmlFileInString = fs.readFileSync(originFile, 'utf8');
    var data = chineseConv.tify(htmlFileInString);
    var fileName = originFile.replace('.html','-big5.html');
    //'../NewFTCApp-iOS/Page/FTChinese/account-big5.html';
    fs.writeFile(fileName, data, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log('big 5 file writen to ' + fileName);
    });
}





