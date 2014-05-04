var rainbow = require('../'), expect = require('chai').expect, colors, chalk = require('chalk')

describe('PONY', function() {
	
	it('you really thing I\'ll do visual tests programmaticaly?', function() {
		console.log(rainbow.r("I am in the pony world"))
		console.log("space should not be colored")
		console.log(rainbow.r(' t'))
		console.log("long text")
		console.log(rainbow.r('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'))
		console.log("should join arguments")
		console.log(rainbow.r('First', 'Second', 'Third'))
		console.log(rainbow.bg("I am a background in the pony world"))
		colors = rainbow.colors()
	})

	it('should add black color', function() {
		rainbow.add('black')
		expect(rainbow.colors()).to.include('black')
		console.log(rainbow.r('A pony shits sequins'))
	})

	it('should add all colors', function() {
		expect(rainbow.add(rainbow._colors).colors()).to.eql(rainbow._colors)
	})

	it('should skip red color', function() {
		rainbow.skip('red')
		expect(rainbow.colors()).not.to.include('red')
		console.log(rainbow.r('A pony shits sequins'))
	})

	it('should remove all colors instead of black and white ☯', function() {
		rainbow.skip(rainbow.colors()).add(['black', 'white'])
		expect(rainbow.colors()).not.to.equal(['black', 'white'])
		console.log(rainbow.r('Does a pony even shit?'))
	})

	it('should reset colors', function() {
		rainbow.reset()
		expect(rainbow.colors()).to.have.members(colors)
		colors = rainbow.colors()
		console.log(rainbow.r('My sweet colors (:'))
		expect(rainbow.add(rainbow._colors).skip('black white').colors()).to.have.members(colors)
	})

	it('should keep background colors order', function() {
		rainbow.skip(rainbow._backgrounds).add('bgGreen bgYellow bgRed')
		console.log(chalk.bold.black(rainbow.bg('Chuck norris is born in the pony world')))
	})

	it("should color spaces with 3 gap - it's a flag \\o/", function() {
		rainbow.options({color_space: true, gap: 3})
		console.log(rainbow.bg('         '))
		console.log(rainbow.bg('         '))
	})

	it('should color characters with a 3 gap', function() {
		rainbow.reset().options({color_space: false})

		console.log(rainbow.r(' testtest    test'))
		console.log(rainbow.r('Some three caracters gap'))
	
		rainbow.options({color_space: true}).reset().skip(rainbow._backgrounds).add('bgBlue bgMagenta bgCyan')

		console.log(rainbow.bg('         '))
		console.log(rainbow.bg('123456789'))
		console.log(rainbow.bg('         '))

	})

	it('should color spaces with a blue bg', function() {
		rainbow.reset().options({gap: 1, color_space: true, space_color: 'bgBlue'}).skip('bgBlue')

		console.log(rainbow.bg('text  with  some  space'))

	})

}) 