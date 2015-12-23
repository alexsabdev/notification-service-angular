'use_strict';

angular.module('notification-service', [])

.service('Notification', function(){

	var options = {
		delay: 3000,
		limit: 3,
		startX: 5,
		startY: 5,
		spacingY: 5
	};

	var buffer = [];
	var shift = 0;
	

	var allocate = function() {
		var i = options.startX;
		var j = options.startY;

		for (var k in buffer) {
			buffer[k].style.right = options.startX + 'px';
			buffer[k].style.top = options.startY + 'px';
			buffer[k].style.visibility = 'hidden';
		}

		if (buffer.length >= options.limit) {
			shift = buffer.length - options.limit;
		}

		for (var n = shift; n < buffer.length; n++) {

			buffer[n].style.right = i + 'px';
			buffer[n].style.top = j + 'px';
			buffer[n].style.visibility = 'visible';
			j += buffer[n].offsetHeight + options.spacingY;
		}
	};

	this.notify = function(note) {
		var templateNote = document.createElement('div');
		templateNote.className = 'alert alert-' + note.category + ' alert-dismissible notification';
		var att = document.createAttribute('role'); att.value = 'alert'; templateNote.setAttributeNode(att);
		var attId = document.createAttribute('id'); attId.value = note.id; templateNote.setAttributeNode(attId);
		templateNote.innerHTML = '<strong>' + note.header + ' ' + note.id + '</strong> <br />' + note.content;
		templateNote.style.visibility = 'hidden';
		document.getElementsByTagName('body')[0].appendChild(templateNote);
		buffer.push(templateNote);
		allocate();
	};

});