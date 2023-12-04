// generated on 2017-08-13 using generator-webapp 3.0.1
const gulp = require('gulp');
const imageToBase64 = require('image-to-base64');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const $ = gulpLoadPlugins();
var sass = require('gulp-dart-sass');
const reload = browserSync.reload;
let dev = true;
const fs = require('fs');
const updateImageBase64 = require('./update-image-base64-dict');

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
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.', 'node_modules']
    }).on('error', sass.logError))
    // MARK: - auto prefixer removed important styles such as -webkit-box-orient.
    // .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
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
    .pipe($.if('*.js', $.babel({
      presets: ['@babel/preset-env']
    })))
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


// Build css and js.
// gulp.task('html', gulp.series('styles', () => {
//   return gulp.src('app/*.html')
//     .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
//     .on('finish', () => {console.log ('Finished useref')})
//     .pipe($.if('*.js', $.babel({
//       presets: ['@babel/preset-env']
//     })))
//     .pipe($.if('*.js', $.uglify()))
//     .on('error', (err) => {
//       if(err) {
//         console.log(err.fileName);
//         console.log(err.cause);
//         console.log(err.line);
//       }
//     })
//     .pipe($.if('*.css', $.cssnano({
//       // MARK: - Always set autoprefixer to false because cssnano will remove useful css lines. Just handle prefix by yourself. 
//       autoprefixer: false,
//       normalizeUrl: false,
//       discardUnused: false
//     })))
//     .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
//     .pipe(gulp.dest('dist'));
// }));


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
            '/node_modules': 'node_modules'
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
        '/node_modules': 'node_modules'
      }
    }
  });
  gulp.watch('app/scripts/**/*.js', gulp.parallel('scripts'));
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', gulp.parallel('lint:test'));
}));


gulp.task('grab', async () => {
  const dest = './app/templates/';
  await Promise.all([
    downloadFile('https://d3plbs0ewhofpw.cloudfront.net/users/findpassword?i=4&webview=ftcapp&v=230', 'findpassword.html', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/index.php/users/register?i=4&webview=ftcapp&v=230', 'register.html', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/m/corp/preview.html?pageid=homelocalbackup&webview=ftcapp&bodyonly=yes&newad=yes&v=230', 'localbackup.html', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/m/corp/preview.html?pageid=bestofenglish&webview=ftcapp&bodyonly=yes&newad=yes&v=230', 'dailyenglishbackup.html', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/m/corp/preview.html?pageid=mba&webview=ftcapp&bodyonly=yes&newad=yes&v=230', 'mbabackup.html', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/m/corp/preview.html?pageid=service&webview=ftcapp&v=230', 'service.html', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/index.php/jsapi/applaunchschedule', 'schedule.json', dest),
    downloadFile('https://d1jz9j0gyf09j1.cloudfront.net/index.php/jsapi/hotstory/1quarterwithdetail', 'hotstories.json', dest),
    downloadFile('https://d2785ji6wtdqx8.cloudfront.net/styles/s.css?1512187911018', 's.css', dest),
    downloadFile('https://d2785ji6wtdqx8.cloudfront.net/js/log.js?v=9&20180412', 'ftc-log.js', dest),
    downloadFile('https://d2785ji6wtdqx8.cloudfront.net/js/ftscroller.js', 'ftscroller.js', dest),
    downloadFile('https://www.googletagservices.com/tag/js/gpt.js', 'gpt.js', dest),
    // MARK: - This can't be downloaded most of the time
    // downloadFile('https://www.ft.com/__origami/service/build/v2/bundles/js?modules=o-ads@10.2.1', 'o-ads.js', dest)

  ]);
  console.log('All grabs are done! ');
});


gulp.task('hotKeywords', async () => {
  await getHotKeywords();
});

async function downloadFile(url, fileName, directory) {
  return new Promise((resolve, reject) => {
    const dest = `${directory}${fileName}`;
    console.log(`Dowloading from ${url} to ${dest}...`);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    var file = fs.createWriteStream(dest);
    const httpRequire = (url.indexOf('https') === 0) ? require('https') : require('http');
    const req = httpRequire.get(url, res => {
      res.pipe(file);
      res.on("end", () => {
          console.log(`Dowloaded from ${url} to ${dest}! `);
          resolve({status: 'success', file: dest, url: url});
      });
    });
    req.on('error', (err) => {
      reject({status: 'error', message: err, url: url});
    });
  });
}

function handleBackgroundImages(str) {
  const dict = {
    'fticon-v1_hamburger.svg': 'PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZT4qe2ZpbGw6IzMzMzAyRSFpbXBvcnRhbnQ7fTwvc3R5bGU+PHRpdGxlPkFydGJvYXJkPC90aXRsZT48cGF0aCBkPSJNNzY4IDMwNi4yVjM4M0gyNTZ2LTc2LjhoNTEyek0yNTYgNTM2LjZoNTEydi03Ni44SDI1NnY3Ni44em0wIDE1My42aDUxMnYtNzYuOEgyNTZ2NzYuOHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPgo='
  };

}

function convert2Big5(originFile) {
    var chineseConv = require('chinese-conv');
    var htmlFileInString = fs.readFileSync(originFile, 'utf8');
    var data = chineseConv.tify(htmlFileInString);
    var fileName = originFile.replace('.html','_big5.html');
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

gulp.task('service', async () => {
  const url = 'https://d1jz9j0gyf09j1.cloudfront.net/m/corp/preview.html?pageid=service&webview=ftcapp&v=230';
  await downloadFile(url, 'service.html', './app/templates/');
});




// MARK: Create the HTML files for iOS Native App
gulp.task('ios', gulp.series('grab', 'build', async () => {

  // MARK: Update all the css files by replacing cloudfront static urls into backgrounds
  await updateImageBase64.run();

  console.log('\n\n\n\n*********************\nNow Start to update iOS app...')
  var replace = require('gulp-replace');
  var rename = require("gulp-rename");
  var thedatestamp = new Date().getTime();
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
  const webAppCSS = fs.readFileSync('app/templates/s.css', 'utf8');
  const oAdsJS = fs.readFileSync('app/templates/o-ads.js', 'utf8');
  const gptJS = fs.readFileSync('app/templates/gpt.js', 'utf8');
  const ftcLogJS = fs.readFileSync('app/templates/ftc-log.js', 'utf8');
  const adPolyfillJS = fs.readFileSync('dist/scripts/ad-polyfill.js', 'utf8');
  const gymToolsJS = fs.readFileSync('dist/scripts/gym-tools.js', 'utf8');
  const ftScrollerJS = fs.readFileSync('app/templates/ftscroller.js', 'utf8');
  const gymListenJS = fs.readFileSync('dist/scripts/gym-listen.js', 'utf8');
  const oTableCSS = fs.readFileSync('node_modules/next/app/origami/o-table.css', 'utf8');
  const oTableJS = fs.readFileSync('node_modules/next/app/origami/o-table.js', 'utf8');
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

  gulp.src(['dist/scripts/main-video.js'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'));

  // gulp.src(['app/templates/hotstories.json'])
  //   .pipe(gulp.dest('../NewFTCApp-iOS/Page/Ad/'));


  gulp.src(['app/templates/findpassword.html'])
    .pipe(replace('<!--night-style-native-app-->', nightHTML))
    .pipe(replace('{{o-ads-js}}', oAdsJS))
    .pipe(replace('{{gpt-js}}', gptJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/findpassword.html')
    }
  );

  gulp.src(['app/templates/register.html'])
    .pipe(replace('<!--night-style-native-app-->', nightHTML))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/register.html')
    }
  );

  gulp.src(['app/templates/localbackup.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/localbackup.html')
    }
  );

  gulp.src(['app/templates/dailyenglishbackup.html'])
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/dailyenglishbackup.html')
    }
  );

  gulp.src(['app/templates/service.html'])
    .pipe(replace('{{o-ads-js}}', oAdsJS))
    .pipe(replace('{{gpt-js}}', gptJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/service.html')
    }
  );
  
  gulp.src(['app/templates/account.html'])
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/account.html')
    }
  );

  gulp.src(['app/templates/search.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{search-css}}', searchCSS))
    .pipe(replace('{{search-js}}', searchJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(gulp.dest('../ftc-android-kotlin/app/src/main/res/raw/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/search.html');
      convert2Big5('../ftc-android-kotlin/app/src/main/res/raw/search.html');
    }
  );

  gulp.src(['app/templates/story.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{db-zone-helper-js}}', dbZoneHelperJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(replace('{{o-ads-js}}', oAdsJS))
    .pipe(replace('{{gpt-js}}', gptJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(rename('story.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(gulp.dest('../ftc-android-kotlin/app/src/main/res/raw/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/story.html');
      convert2Big5('../ftc-android-kotlin/app/src/main/res/raw/story.html');
    }
  );

  gulp.src(['app/templates/message.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(rename('message.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/message.html')
    }
  );


  gulp.src(['app/templates/radio.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{db-zone-helper-js}}', dbZoneHelperJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(replace('/*{audio-script-render-js}*/', audioScriptRenderJS))
    .pipe(rename('radio.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/radio.html')
    }
  );


  gulp.src(['app/templates/help.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{story-css}}', storyCSS))
    .pipe(replace('{{story-js-main}}', storyMainJS))
    .pipe(replace('{{story-js-key}}', storyKeyJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
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
    .pipe(replace('{{o-ads-js}}', oAdsJS))
    .pipe(replace('{{gpt-js}}', gptJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(replace('{{ad-pollyfill-js}}', adPolyfillJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(gulp.dest('../ftc-android-kotlin/app/src/main/res/raw/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/list.html');
      convert2Big5('../ftc-android-kotlin/app/src/main/res/raw/list.html');
    });


  gulp.src(['app/templates/list.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{list-css}}', myftCSS))
    .pipe(replace('{{list-js-main}}', listMainJS))
    .pipe(replace('{{list-js-key}}', listKeyJS))
    .pipe(replace('{{o-ads-js}}', oAdsJS))
    .pipe(replace('{{gpt-js}}', gptJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
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
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(rename('ebook.html'))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/ebook.html')
    });


  gulp.src(['app/templates/gym.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('<!--{gymtools}-->', gymToolsJS))
    .pipe(replace('<!--{ftscroller}-->', ftScrollerJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(replace('/*gym-listen*/', gymListenJS))
    .pipe(replace('<!--{commoncss}-->', `<style>${commonCSS}</style>`))
    .pipe(replace('<!--{webappcss}-->', `<style>${webAppCSS}</style>`))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .pipe(gulp.dest('../ftc-android-kotlin/app/src/main/res/raw/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/gym.html');
      convert2Big5('../ftc-android-kotlin/app/src/main/res/raw/gym.html');
    });

  gulp.src(['app/templates/html-book.html'])
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(replace('{{html-book-css}}', htmlBookCSS))
    .pipe(replace('{{html-book-js}}', htmlBookJS))
    .pipe(replace('{{ftc-log-js}}', ftcLogJS))
    .pipe(gulp.dest('../NewFTCApp-iOS/Page/FTChinese/'))
    .on('end', function() {
      convert2Big5('../NewFTCApp-iOS/Page/FTChinese/html-book.html')
    });

}));
