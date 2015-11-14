var ansi = require('ansi-styles')

/**
 * black, white and gray (buggy?) are not included
 */
var Pony = function() {
  this._colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'black'
  ]

  this._colors_num = this._colors.length

  this._backgrounds = []

  for(var i = 0; i < this._colors_num; i++) {
    this._backgrounds[i] = 'bg'+this._colors[i].charAt(0).toUpperCase()+this._colors[i].slice(1)
  }

  this._skip = ['black', 'white', 'bgBlack', 'bgWhite']
  this._skip_num = this._skip.length - 1

  this._next = 0
  this._prev = -1

  this.options = {color_space: false, gap: 1, space_color: null}

  var self = this

  this.wrapper = {
    bg: this.ponyfy(true),
    r: this.ponyfy(),
    add: this.addorskip('add'),
    skip: this.addorskip('skip'),
    options: function(opts) {
      for(var i in opts)
        self.options[i] = opts[i]
      return self.wrapper
    },
    colors: function() {
      return self.colors.call(self)
    },
    reset: function() {
      self._skip = ['black', 'white', 'bgBlack', 'bgWhite']
      return self.wrapper
    },
    _colors: this._colors,
    _backgrounds: this._backgrounds
  }

  return this.wrapper

}

Pony.prototype = {
  top: function(color) {

    var index = this._colors.indexOf(color)

    if(~index) {
      this._colors.splice(index, 1)
      this._colors.unshift(color)  
    }

    index = this._backgrounds.indexOf(color)
    if(~index) {
      this._backgrounds.splice(index, 1)
      this._backgrounds.unshift(color)  
    }
      
    return this
  },
  colors: function(bg) {
    var res = [], 
        items = bg ? this._backgrounds : this._colors,
        l = items.length

    for(var i = 0; i < l; i++) {
      if(this._skip.indexOf(items[i]) === -1)
        res.push(items[i])
    }
    
    return res;
  },
  allowed: function(color) {
    return this._colors.indexOf(color) !== -1 || this._backgrounds.indexOf(color) !== -1
  },
  addorskip: function(which, wrapper) {
    var self = this
    return function() {

      colors = [].slice.call(arguments)
      colors = colors.length == 1 ? colors[0] : colors
      colors = 'string' == typeof colors ? colors.split(' ') : colors
      colors = colors instanceof Array ? colors : [colors], l = colors.length

       while(l--) {

        if(self.allowed(colors[l])) {
          index = self._skip.indexOf(colors[l])

          if(index === -1 && which === 'skip') {
            self._skip_num++
            self._skip[self._skip_num] = colors[l]
          }
          else if(~index && which === 'add') {
            self.top(colors[l])
            self._skip.splice(index, 1)
            self._skip_num--
          }
        } else {
          //console.log(colors[l])
          throw new Error('Color '+ colors[l] +' is not recognized')
        }
      }
      
      return self.wrapper
    }
  },
  //wrapper to pass bg
  ponyfy: function(bg) {
    var self = this
    bg = bg ? bg : false
    return function() {
      return self.output([].slice.call(arguments).join(' '), self.colors(bg))
    }
  },
  nextColor: function(s, colors) {
    var l = colors.length  - 1

    if(this._prev >= l) {
      this._prev = 0, this._next = 1

      s = ansi[colors[0]].open + s + ansi[colors[0]].close
    } else {
      s = ansi[colors[this._next]].open + s + ansi[colors[this._next]].close

      this._next++
      this._prev++
    }

    this._current_gap++

    return s
  }, 
  currentColor: function(s, colors) {
    var l = colors.length  - 1

    this._current_gap++

    if(this._prev >= l) {
      return ansi[colors[0]].open + s + ansi[colors[0]].close
    } else {
      return ansi[colors[this._next]].open + s + ansi[colors[this._next]].close
    }

  },
  colorSpace: function(s, color) {
    if(!this.allowed(color))
      throw new Error('Color '+ colors[l] +' is not recognized')

    return ansi[color].open + s + ansi[color].close
  },
  output: function(input, colors) {
    var l = input.length, output = '', i = 0, gap = this.options.gap, s

    this._current_gap = 1
    
    for (i; i < l; i++) {
      this._current_gap = this._current_gap > gap ? 1 : this._current_gap
      s = input.charAt(i)

      if(s == '\n') {
        output += s
      } else if(s == ' ' && !this.options.color_space) {
        output += s
      } else {

        if(s == ' ' && this.options.space_color != null)
          output += this.colorSpace(s, this.options.space_color)
        else
          output += this._current_gap == gap ? this.nextColor(s, colors) : this.currentColor(s, colors)
      }
    }

    //reset state
    this._next = 0, this._prev = -1

    return output
  }
}

module.exports = new Pony()
