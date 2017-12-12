const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const assets = require('metalsmith-static');

let site = Metalsmith(__dirname)
  .metadata({
    // use them in layout-files
    sitename: 'OHC',
    siteurl: 'http://localhost:4444/',
    description: 'OHC'
  })
  .source('./_content')
  .destination('build')
  .use(collections({
    bike: 'bike/*.md'
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    default: 'layout.html',
    directory: '_layouts'
  }))
  .use(assets({
    src: 'static',
    dest: '.'
  }))
  .build((err) => {
    if(err) throw err
  });


