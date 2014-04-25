var ansi = require('ansi-styles');

/**
 * black, white and gray are not included
 */
var colors = [
				'red',
				'green',
				'yellow',
				'blue',
				'magenta',
				'cyan',
			]
  , colors_num = colors.length - 1
  , next = 0, prev = 0

var nextColor = function(s) {
	if(s != ' ') { 
		if(prev == colors_num) {
			prev = 0, next = 1
			s = ansi[colors[0]].open + s + ansi[colors[0]].close
		} else {
			s = ansi[colors[next]].open + s + ansi[colors[next]].close
			next++
			prev++
		}
	}

	return s
}

module.exports = function () {

	var input = [].slice.call(arguments).join(' ')
	  , l = input.length, output = ''

	for (var i = 0; i < l; i++) {
		output += nextColor(input.charAt(i))	
	}
	
	next = 0, prev = 0

	return output
}
