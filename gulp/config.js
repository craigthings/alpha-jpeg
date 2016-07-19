'use strict';

var exampleDest = './examples/commonjs/dist';
var buildDest = './build/';

var config = {

  flags: {
    minify: false,
    sourcemap: true
  },

  clean: {
    src: exampleDest
  },

  styles: {
    src: './styles/**/*',
    entry: './styles/index.styl',
    dist: exampleDest + '/css/'
  },

  static: {
    src: ['./examples/commonjs/static/**/*'],
    dist: exampleDest
  },

  images: {
    src: ['./examples/commonjs/static/images/**/*.{gif,jpg,png,svg}'],
    dist: exampleDest + '/images/'
  },

  tests: {
    lint: {
      src: ['./examples/commonjs/app/**/*.js', '!examples/commonjs/app/vendor/**/*.js', './gulp/**/*.js', './tests/**/*.js']
    },
    mocha: {
      src: ['./tests/**/*.js'],
      config: {
        ui: 'tdd',
        reporter: 'spec'
      }
    }
  },

  scripts: {
    app: {
      src: ['./src/**/*.js','./examples/commonjs/app/**/*.js', '!./examples/commonjs/app/vendor/**/*.js'],
      entry: './examples/commonjs/app/Main.js'
    },
    vendor: {
      src: './examples/commonjs/app/vendor/**/*.js'
    },
    tests: {
      src: './tests/**/*.js'
    },
    dist: exampleDest + '/js/'
  },

  build: {
    app: {
      src: ['./src/**/*.js'],
      entry: './src/alpha-jpeg.js'
    },
    tests: {
      src: './tests/**/*.js'
    },
    dist: buildDest
  },

  server: {
    root: exampleDest,
    port: 8080
  },

  version: {
    css: exampleDest + '/css/*.css',
    cssDist: exampleDest + '/css/',

    html: exampleDest + '/*.html',
    htmlDist: exampleDest + '/',

    js: exampleDest + '/js/*.js',
    jsDist: exampleDest + '/js/',

    jsMap: exampleDest + '/js/*.map',
    jsMapDist: exampleDest + '/js/'
  },

  bower: './bower_components/'

};

module.exports = config;
