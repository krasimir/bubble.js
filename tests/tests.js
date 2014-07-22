var fireEvent = function(node, eventName) {
	var event = document.createEvent("HTMLEvents");
	event.initEvent(eventName, true, false);
	node.dispatchEvent(event);
};

describe('Testing Bubble.js', function() {

	describe('existence', function() {
		it('should have global bubble function', function(done) {
			expect(typeof bubble).to.be('function');
			done();
		});
	});

	describe('selection', function() {
		var b = bubble('.content');
		it('should select the root', function(done) {
			expect(b.root).not.to.be(undefined);
			done();
		});
	});

	describe('event handling', function() {
		var b = bubble('.content');
		it('should catch click event of .out-of-form', function(done) {
			b.on('clickOutOfForm', function(e) {
				expect(e.target.getAttribute('class')).to.be('out-of-form');
				done();
			});
			fireEvent(document.querySelector('.out-of-form'), 'click');
		});
		it('should catch click event of .the-link', function(done) {
			b.on('clickTheLink', function(e) {
				expect(e.target.getAttribute('class')).to.be('the-link');
				done();
			});
			fireEvent(document.querySelector('.the-link'), 'click');
		});
		it('should catch click event of [type="button"]', function(done) {
			b.on('clickButton', function(e) {
				expect(e.target.getAttribute('type')).to.be('button');
				done();
			});
			fireEvent(document.querySelector('[type="button"]'), 'click');
		});
		it('should catch focus event of the input', function(done) {
			b.on('inputFocus', function(e) {
				expect(e.target.getAttribute('name')).to.be('name');
				done();
			});
			fireEvent(document.querySelector('[name="name"]'), 'focus');
		});
		it('should catch change event of the input', function(done) {
			b.on('inputChanged', function(e) {
				expect(e.target.getAttribute('name')).to.be('name');
				done();
			});
			fireEvent(document.querySelector('[name="name"]'), 'change');
		});
	});

	describe('second bubble on the page', function() {
		var b = bubble('.content nav');
		it('should catch click event nav link', function(done) {
			b.on('navLink', function(e) {
				expect(e.target.getAttribute('class')).to.be('nav-link');
				done();
			});
			fireEvent(document.querySelector('.nav-link'), 'click');
		});
	});

	describe('root element', function() {
		var b = bubble('.footer-link');
		it('should catch click event footer link', function(done) {
			b.on('footerLink', function(e) {
				expect(e.target.getAttribute('class')).to.be('footer-link');
				done();
			});
			fireEvent(document.querySelector('.footer-link'), 'click');
		});
	});

	describe('pass an object', function() {
		var b = bubble('.dropdown');
		it('should catch change event of the dropdown', function(done) {
			b.on({
				name: 'bubble.js',
				dropdownChanged: function(e) {
					expect(e.target.value).to.be('C');
					expect(this.name).to.be('bubble.js');
					done();
				}
			});
			document.querySelector('.dropdown select').value = 'C';
			fireEvent(document.querySelector('.dropdown select'), 'change');
		});
	});

	describe('add event listener to the parent but gets data from the childs', function() {
		var b = bubble('.list');
		it('should catch click event', function(done) {
			b.on('listItemSelected', function(e) {
				expect(e.target.getAttribute('data-value')).to.be('C');
				fireEvent(document.querySelector('.list [name="listname"]'), 'focus');
			}).on('onlistNameFocused', function(e) {
				done();
			});
			fireEvent(document.querySelector('.list a[data-value="C"]'), 'click');
		});
	});

})