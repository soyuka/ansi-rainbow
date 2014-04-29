var ansi = require('ansi-styles');

/**
 * black, white and gray are not included
 */
var Pony = function() {
	this._colors = [
				'red',
				'green',
				'yellow',
				'blue',
				'magenta',
				'cyan',
			]
	this._colors_num = this._colors.length - 1
	this._next = 0
	this._prev = 0

	return this
}

Pony.prototype = {
	bgify: function(color) {
		return 'bg'+color.charAt(0).toUpperCase()+color.slice(1)
	},
  //wrapper to pass bg
  ponyfy: function(bg) {
    var self = this
    bg = bg ? bg : false
    return function() {
      return self.output([].slice.call(arguments).join(' '), bg)
    }
  },
	nextColor: function(s, bg) {
		if(s != ' ') { 
			var color

			if(this._prev == this._colors_num) {
				this._prev = 0, this._next = 1

				color = bg ? this.bgify(this._colors[0]) : this._colors[0] 

				s = ansi[color].open + s + ansi[color].close
			} else {

				color = bg ? this.bgify(this._colors[this._next]) : this._colors[this._next] 
				
        s = ansi[color].open + s + ansi[color].close
				
        this._next++
				this._prev++
			}
		}

		return s
	},
	output: function(input, bg) {
		var l = input.length, output = '', i = 0

		for (i; i < l; i++) {
			output += this.nextColor(input.charAt(i), bg)	
		}

		//reset state
		this._next = 0, this._prev = 0

		return output
	}
}

var pony = new Pony()

module.exports = pony.ponyfy()
module.exports.bg = pony.ponyfy(true)