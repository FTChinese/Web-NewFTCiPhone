// generated on 2017-08-13 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const gutil = require('gulp-util');

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
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
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
  var dbZoneHelperJS = fs.readFileSync('dist/scripts/main-db-zone-helper.js', 'utf8');

  var listCSS = fs.readFileSync('dist/styles/main-list.css', 'utf8');
  var listMainJS = fs.readFileSync('dist/scripts/main-list.js', 'utf8');
  var listKeyJS = fs.readFileSync('dist/scripts/key-list.js', 'utf8');
  var myftCSS = fs.readFileSync('dist/styles/main-myft.css', 'utf8');

  var analyticsJS = fs.readFileSync('dist/scripts/analytics.js', 'utf8');
  var searchCSS  = fs.readFileSync('dist/styles/main-search.css', 'utf8');
  var searchJS = fs.readFileSync('dist/scripts/search.js', 'utf8');

  var ebookCSS = fs.readFileSync('dist/styles/main-ebook.css', 'utf8');
  var ebookMainJS = fs.readFileSync('dist/scripts/main-ebook.js', 'utf8');
  var ebookKeyJS = fs.readFileSync('dist/scripts/key-ebook.js', 'utf8');

  var htmlBookCSS = fs.readFileSync('dist/styles/main-html-book.css', 'utf8');
  var htmlBookJS = fs.readFileSync('dist/scripts/main-html-book.js', 'utf8');

  const oAdsJS = fs.readFileSync('app/templates/o-ads.js', 'utf8');
  const gptJS = fs.readFileSync('app/templates/gpt.js', 'utf8');

  const adPolyfillJS = fs.readFileSync('dist/scripts/ad-polyfill.js', 'utf8');

  // var googleanalytics = fs.readFileSync('dist/log/ga.js', 'utf8');
  // var fa = fs.readFileSync('dist/log/analytics.js', 'utf8');




  gulp.src(['app/templates/schedule.json'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/Ad/'));

  gulp.src(['app/templates/register.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/register.html')
  });

  gulp.src(['app/templates/localbackup.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/localbackup.html')
  });


  gulp.src(['app/templates/service.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/service.html')
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
    .pipe(replace('{{db-zone-helper-js}}', dbZoneHelperJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(rename('story.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/story.html')
    });


  gulp.src(['app/templates/help.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(rename('help.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/help.html')
    });


  gulp.src(['app/templates/list.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{list-css}}', listCSS))
    .pipe(replace('{{list-js-main}}', listMainJS))
    .pipe(replace('{{list-js-key}}', listKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/list.html')
    });


  gulp.src(['app/templates/list.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{list-css}}', myftCSS))
    .pipe(replace('{{list-js-main}}', listMainJS))
    .pipe(replace('{{list-js-key}}', listKeyJS))
    .pipe(replace('{{analytics}}', analyticsJS))
    .pipe(replace('{{o-ads-js}}', oAdsJS))
    .pipe(replace('{{gpt-js}}', gptJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(rename('myft.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/myft.html')
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



  const oTableCSS = fs.readFileSync('bower_components/ftcnext/app/origami/o-table.css', 'utf8');
  const oTableJS = fs.readFileSync('bower_components/ftcnext/app/origami/o-table.js', 'utf8');
  const oTableHTML = '<style>' + oTableCSS + '</style><script>' + oTableJS + '</script>';
  const oTablePath = '../NewFTCApp-iOS/Page/FTChinese/o-table.html';
  fs.writeFile(oTablePath, oTableHTML, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('otable writen to' + oTablePath);
  });


});

gulp.task('grab', function () {
  getUrltoFile('http://app003.ftmailbox.com/index.php/users/register?i=4&webview=ftcapp&v=1', './app/templates/register.html');
  getUrltoFile('https://www.ftchinese.com/channel/exclusive.html?webview=ftcapp&bodyonly=yes&newad=yes&v=1', './app/templates/localbackup.html');
  getUrltoFile('http://www.ftchinese.com/m/corp/preview.html?pageid=service&webview=ftcapp&v=1', './app/templates/service.html');
  getUrltoFile('https://www.ft.com/__origami/service/build/v2/bundles/js?modules=o-ads@10.2.1', './app/templates/o-ads.js');
  getUrltoFile('https://www.googletagservices.com/tag/js/gpt.js', './app/templates/gpt.js');
  getUrltoFile('https://api003.ftmailbox.com/index.php/jsapi/applaunchschedule', './app/templates/schedule.json');
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





