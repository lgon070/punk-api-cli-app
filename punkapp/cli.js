const yargs = require('yargs')
const app = require('./app.js')


yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Search for a beverage in the Punk API',
        handler: argv => {
            app.search(argv._);
        }
    })
    .command({
        command: 'fetch',
        desc: 'Fetch a specific beverage using beverage id',
        handler: argv =>{
            app.fetch(argv._[1]);
        }
    })
    .help('help').argv;
