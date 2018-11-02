/*
  Gulp configuration file.
  inhabited by source & build folder variables
  and gulp task configurations (tasks located in ./gulp/**)
*/

// default working repo setup
var src               = './components',
    content           = src + '/content',
    templates         = src + '/templates',
    assets            = src + '/assets',
    scripts           = src + '/scripts',
    styles            = src + '/styles',
    media            = src + '/media';

// build repo outside of this project…
var build             = '../pico_b2b',
    build_assets      = build +  '/assets',
    build_media      = build +  '/media';

// all gulp task configurations & settings will be found here
module.exports = {
  browserSync: {                                  // https://www.npmjs.com/package/browser-sync
    server: {
      baseDir: build
    },
    files: build,
    port: 1893,
    // https: true,
    open: "local",
    browser: "google chrome"
  },
  metalsmith: {                                   // https://www.npmjs.com/package/metalsmith
    src: src,
    dest: build,
    clean: false,
    metadata: {
      version: "1.0.0",
      title: "Pico: Moderne Software für Lieferbetriebe",
      name: "Pico Liefersystem",
      shortname: "Pico",
      // private: true,
      description: "Pico hilft Lieferbetrieben frischer Lebensmittel mit einer ganzheitlichen IT-Lösung ihr Geschäft einfacher und erfolgreicher zu betreiben.",
      author: "Pico Liefersystem",
      site: {
        url: "https://www.pico-liefersystem.de/",
        lang: "de",
        locale: "de_DE",
        analyticsID: "UA-XXXXXXX",
        googleVerification: "XXXXXXX",
        "meta-canonical": "https://www.pico-liefersystem.de/"
      }
    },
    config: {
      contentRoot: "./content",
      assetRoot: "./sources/assets",
      scriptRoot: "./sources/scripts",
      styleRoot: "./sources/styles",
      layoutRoot: "./sources/layouts",
      destRoot: "./build"
    },
    plugins:{
      "metalsmith-drafts": true,                  // https://www.npmjs.com/package/metalsmith-drafts
      "metalsmith-collections": {                 // https://www.npmjs.com/package/metalsmith-collections
        category: {
          sortBy: "rank",
          reverse: false,
        },
        project: {
          sortBy: "rank",
          reverse: false,
        }
      },
      "metalsmith-markdown": {                    // https://github.com/segmentio/metalsmith-markdown"
        smartypants: true,
        gfm: true,
        tables: true
      },
      "metalsmith-permalinks": {                  // https://www.npmjs.com/package/metalsmith-permalinks
        pattern: ":url",
        relative: false
      },
      "metalsmith-register-helpers": {            // https://www.npmjs.com/package/metalsmith-register-helpers
        directory: templates + "/helpers"
      },
      "metalsmith-layouts": {                     // https://www.npmjs.com/package/metalsmith-layouts
        engine: "handlebars",
        directory: templates,
        partials: templates + "/partials",
        default: "static.hbs",
        rename: true
      },
      "metalsmith-sitemap": {                     // https://github.com/ExtraHop/metalsmith-sitemap
        hostname: "https://pico-liefersystem.de/",
      }
    }
  },
  scripts: {                                      // just moving & watching
    src: src + "/scripts/**/*.js",
    dest: build + "/js"
  },
  sass: {                                         // https://www.npmjs.com/package/gulp-sass
    src: src + "/styles/**",
    dest: build + "/css"
  },
  assets: {                                       // just moving & watching
    src: {
      root: src + "/assets/**",
      imgs: src + "/assets/images/**",
      fonts: src + "/assets/fonts/**",
      icons: src + "/assets/icons/**"
    },
    dest: {
      root: build_assets + "/",
      imgs: build_assets + "/img",
      fonts: build_assets + "/fonts",
      icons: build_assets + "/"
    }
  },
  media: {                                       // just moving & watching
    src: {
      root: src + "/media/**",
      apps: src + "/media/apps/**"
    },
    dest: {
      root: build_media + "/",
      apps: build_media + "/apps"
    }
  },  
  minifyHTML: {                                   // https://www.npmjs.com/package/gulp-htmlmin
    src:  build + '/**/*.html',
    dest: build,
    options: {
      collapseWhitespace: true,
      removeComments: true
    }
  },
  minifyCSS: {                                    // https://www.npmjs.com/package/gulp-cleancss
    src: build + "/css/**/*.css",
    dest: build + "/css",
    options: {
      debug: true,
      processImport: true,
      // processImportFrom: ["!fonts.googleapis.com"],
      keepSpecialComments: '*' // '*',1,0
    }
  },
  purifyCSS: {                                    // https://github.com/purifycss/gulp-purifycss
    src:  build + "/css/**/*.css",
    dest: build + "/css",
    js:   build + "/**/*.js",
    html: build + "/**/*.html",
    options: {
      // rejected: true
    }
  },
  minifyJS: {                                     // https://www.npmjs.com/package/gulp-uglify
    src: src + "/scripts/**/*.js",
    dest: build + "/js",
    options: {
      preserveComments: 'license'
    }
  },
  minifySVG: {                                    // https://www.npmjs.com/package/gulp-svgo
    src: build_assets + "/img/**/*.svg",
    dest: build_assets + "/img",
  },
  minifyImages: {                                 // https://www.npmjs.com/package/gulp-imagemin
    src:  build_assets + "/img/**/*.{jpg,jpeg,png,gif}",
    dest: build_assets + "/img",
    options: {
      optimizationLevel: 9,
      progessive: true,
      interlaced: true,
      multipass: true
    }
  },
};
