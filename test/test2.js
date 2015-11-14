var pony = require('../'), chalk = require('chalk')

pony.options({gap:2})

var fs = require('fs')

var through = require('through2')

var transform = through(function (chunk, enc, callback) {

    this.push(chalk.black(pony.bg(chunk)))

    callback()

   })

fs.createReadStream(__dirname + '/ascii.txt')
	.pipe(transform)
	.pipe(process.stdout)
