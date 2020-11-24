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

function lint(files) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

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

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});


gulp.task('html', gulp.series('styles', 'scripts', () => {
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
}));

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

gulp.task('serve', 
  gulp.parallel(
    'styles', 
    function serve() {
      browserSync.init({
        server: {
          baseDir: ['app', '.tmp'],
          index: 'story.html',
          routes: {
            '/bower_components': 'bower_components'
          }
        }
      });
      gulp.watch('app/styles/**/*.scss', gulp.parallel('styles'));
      gulp.watch(['app/*.html', 'app/scripts/**/*.js', 'app/images/**/*'], browserSync.reload);
    }
  )
);

gulp.task('build', gulp.series(
  gulp.parallel('html', 'images', 'fonts', 'extras'),
  async () => {gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));}
));

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  return gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('default', gulp.series('clean', 'wiredep', 'build'));

gulp.task('serve:dist', gulp.parallel('default', () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
}));

gulp.task('serve:test', gulp.series('scripts', () => {
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
  gulp.watch('app/scripts/**/*.js', gulp.parallel('scripts'));
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', gulp.parallel('lint:test'));
}));


gulp.task('grab', async () => {
  await Promise.all([
    getUrltoFile('https://d1jz9j0gyf09j1.cloudfront.net/index.php/users/register?i=4&webview=ftcapp&v=1', './app/templates/register.html'),
    getUrltoFile('https://d1jz9j0gyf09j1.cloudfront.net/channel/exclusive.html?webview=ftcapp&bodyonly=yes&newad=yes&v=1', './app/templates/localbackup.html'),
    getUrltoFile('https://d1jz9j0gyf09j1.cloudfront.net/channel/english.html?webview=ftcapp&bodyonly=yes&newad=yes&v=1', './app/templates/dailyenglishbackup.html'),
    getUrltoFile('https://d1jz9j0gyf09j1.cloudfront.net/m/corp/preview.html?pageid=service&webview=ftcapp&v=1', './app/templates/service.html'),
    getUrltoFile('https://www.ft.com/__origami/service/build/v2/bundles/js?modules=o-ads@10.2.1', './app/templates/o-ads.js'),
    getUrltoFile('https://www.googletagservices.com/tag/js/gpt.js', './app/templates/gpt.js'),
    getUrltoFile('https://d1jz9j0gyf09j1.cloudfront.net/index.php/jsapi/applaunchschedule', './app/templates/schedule.json'),
    getUrltoFile('https://d1jz9j0gyf09j1.cloudfront.net/index.php/jsapi/hotstory/1quarterwithdetail', './app/templates/hotstories.json')
  ]);
  console.log('All grabs are done! ');
});


gulp.task('hotKeywords', async () => {
  await getHotKeywords();
});


// MARK: code created for this project specifically
async function getUrltoFile (urlSource, fileName) {
  return new Promise((resolve, reject)=>{
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
              resolve(fileName);
          });
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
        reject(false);
    });
    request.end();
  });
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

async function getHotKeywords() {
  return new Promise((resolve, reject)=>{
    const fs = require('fs');
    const hotStoriesString = fs.readFileSync('app/templates/hotstories.json', 'utf8');
    const hotStories = JSON.parse(hotStoriesString);
    var keyScores = {};
    const weight = 1;
    for (item of hotStories) {
      const keys = [
        {type: 'tag', code: item.tag},
        {type: 'author', code: item.cauthor},
        {type: 'industry', code: item.industry},
        {type: 'topic', code: item.topic},
        {type: 'area', code: item.area}
      ];
      for (key of keys) {
        if (key.code && key.code !== '') {
          const codes = key.code.split(',');
          for (const code of codes) {
            var newScore = (keyScores[code]) ? keyScores[code].score + weight : weight;
            keyScores[code] = {type: key.type, score: newScore};
          }
        }
      }
    }
    // console.log ('Key Scores to Cold Start: ');
    // console.log (keyScores);
    resolve (JSON.stringify(keyScores));
  });
}






// MARK: Create the HTML files for iOS Native App
gulp.task('ios', gulp.series('grab', 'build', async () => {
  console.log('\n\n\n\n*********************\nNow Start to update iOS app...')
  var replace = require('gulp-replace');
  var rename = require("gulp-rename");
  var thedatestamp = new Date().getTime();
  var fs = require('fs');
  var storyCSS = fs.readFileSync('dist/styles/main-story.css', 'utf8');
  var storyMainJS = fs.readFileSync('dist/scripts/main-story.js', 'utf8');
  var storyKeyJS = fs.readFileSync('dist/scripts/key.js', 'utf8');
  const audioScriptRenderJS = fs.readFileSync('dist/scripts/main-audio-script-render.js', 'utf8');
  var dbZoneHelperJS = fs.readFileSync('dist/scripts/main-db-zone-helper.js', 'utf8');
  var listCSS = fs.readFileSync('dist/styles/main-list.css', 'utf8');
  var listMainJS = fs.readFileSync('dist/scripts/main-list.js', 'utf8');
  var listKeyJS = fs.readFileSync('dist/scripts/key-list.js', 'utf8');
  var myftCSS = fs.readFileSync('dist/styles/main-myft.css', 'utf8');
  var searchCSS  = fs.readFileSync('dist/styles/main-search.css', 'utf8');
  var searchJS = fs.readFileSync('dist/scripts/search.js', 'utf8');
  var ebookCSS = fs.readFileSync('dist/styles/main-ebook.css', 'utf8');
  var ebookMainJS = fs.readFileSync('dist/scripts/main-ebook.js', 'utf8');
  var ebookKeyJS = fs.readFileSync('dist/scripts/key-ebook.js', 'utf8');
  var htmlBookCSS = fs.readFileSync('dist/styles/main-html-book.css', 'utf8');
  var htmlBookJS = fs.readFileSync('dist/scripts/main-html-book.js', 'utf8');
  const commonCSS = fs.readFileSync('dist/styles/main-common.css', 'utf8');
  const oAdsJS = fs.readFileSync('app/templates/o-ads.js', 'utf8');
  const gptJS = fs.readFileSync('app/templates/gpt.js', 'utf8');
  const adPolyfillJS = fs.readFileSync('dist/scripts/ad-polyfill.js', 'utf8');
  const gymToolsJS = fs.readFileSync('dist/scripts/gym-tools.js', 'utf8');
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

  const nightCSS = fs.readFileSync('dist/styles/main-night.css', 'utf8');
  const nightHTML = '<style>' + nightCSS + '</style>';
  const nightPath = '../NewFTCApp-iOS/Page/FTChinese/o-night.html';
  fs.writeFile(nightPath, nightHTML, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('night html writen to' + nightPath);
  });

  // MARK: - Get hot keywords from hot stories. 
  const hotKeywordsPath = '../NewFTCApp-iOS/Page/FTChinese/hot-keywords.json';
  const hotKeyWordsHTML = await getHotKeywords();
  fs.writeFile(hotKeywordsPath, hotKeyWordsHTML, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('hot keywords writen to' + hotKeywordsPath);
  });

  gulp.src(['app/templates/schedule.json'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/Ad/'));

  // gulp.src(['app/templates/hotstories.json'])
  //   .pipe(gulp.dest('../NewFTCApp-iOS/Page/Ad/'));

  gulp.src(['app/templates/register.html'])
    .pipe(replace('<!--night-style-native-app-->', nightHTML))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/register.html')
  });

  gulp.src(['app/templates/localbackup.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/localbackup.html')
  });

  gulp.src(['app/templates/dailyenglishbackup.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/dailyenglishbackup.html')
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
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/account.html')
    });


  gulp.src(['app/templates/search.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{search-css}}', searchCSS))
    .pipe(replace('{{search-js}}', searchJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/search.html')
    });

  gulp.src(['app/templates/story.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{db-zone-helper-js}}', dbZoneHelperJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(rename('story.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/story.html')
    });

  gulp.src(['app/templates/message.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(rename('message.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/message.html')
    });


  gulp.src(['app/templates/radio.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{db-zone-helper-js}}', dbZoneHelperJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(replace('/*{audio-script-render-js}*/', audioScriptRenderJS))
    .pipe(rename('radio.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/radio.html')
    });


  gulp.src(['app/templates/help.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
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
    .pipe(rename('ebook.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/ebook.html')
    });


  gulp.src(['app/templates/gym.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('<!--{gymtools}-->', gymToolsJS))
    .pipe(replace('<!--{commoncss}-->', `<style>${commonCSS}</style>`))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/gym.html')
    });

  gulp.src(['app/templates/html-book.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{html-book-css}}', htmlBookCSS))
    .pipe(replace('{{html-book-js}}', htmlBookJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/html-book.html')
    });

}));
