const argv = require('yargs').argv;

const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const assets = require('metalsmith-static');
const debug = require('metalsmith-debug');
const watch = require('metalsmith-watch');
const serve = require('metalsmith-serve');

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
  }));

if (argv.dev) {
  site.use(debug());
  site.use(serve());
  site.use(watch({
    paths: {
      "${source}/**/*": true,
      "_layouts/**/*": "**/*.md",
    }
  }));
}


site.build((err) => {
  if (err) throw err;

  console.log('Site Built.')
});