ansi-rainbow
=============

Rainbowify string with https://github.com/sindresorhus/ansi-styles 
![rainicorn](http://www.zupmage.eu/i/W8xC5EsoJb.jpg)
# Install

`npm install ansi-rainbow`

# Basic example

```javascript

var rainbow = require('ansi-rainbow')

console.log(rainbow.r("I am in the pony world"))
//or
console.log(rainbow.r("I", "am", "in", "the", "pony", "world"))

//what about background rainbows?

console.log(rainbow.bg("I am a background in the pony world"))
```

That outputs:

![pony pony](https://raw.githubusercontent.com/soyuka/ansi-rainbow/master/screen/ksh1.png)

# Features

Rainbow is skipping black and white colors (did you ever seen these on a rainbow?). But, we could imagine that in a world where Pony's are flying, black could be part of a rainbow so:


```javascript
rainbow.add('black white') //adds black and white
```

Let's write all features together to print a rainbow flag \o/:

```javascript

rainbow
	.add('black', 'white')
	.reset() //we do not want black and white anymore - note it does not reset options only colors
	.skip(rainbow._backgrounds) //skips backgrounds
	.add('bgBlue bgMagenta bgCyan') //this will keep order when rainbowified
	.options({color_space: true, gap: 3}) //this will force color spaces and change color every 3 characters

	console.log(rainbow.bg('         '))
	console.log(rainbow.bg('123456789'))
	console.log(rainbow.bg('         '))

```

That outputs:

![pony pony](https://raw.githubusercontent.com/soyuka/ansi-rainbow/master/screen/ksh2.png)

# API

- r(string)           rainbowify         
- bg(string)          background-rainbowify         
- add(colors)         do not skip colors         
- skip(colors)        skip colors         
- reset()             reset colors (skips ['black', 'white', 'bgBlack', 'bgWhite'])         
- options({})         set options - options are (bool) color_space, (int) gap

# TODO

What about everything that is not a string?
