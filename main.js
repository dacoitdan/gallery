function View (data, tagName){
	this.el = $('<div></div>');
	this.data = data;
}

View.prototype.render = function(){}
View.prototype.bindEvents = function (){};
View.prototype.hide = function(){}

var urls = ['1.jpg', '2.jpg', '3.jpg', '4.jpg']

////

function appView(data){
	View.call(this, data);
	this.fv = new fullView(data);
	this.gv = new galleryView(data, this.fv.changeUrl);
	this.el.attr('id', 'app');
	this.el.append(this.fv.render());
	this.el.append(this.gv.render());
}

appView.prototype = Object.create(View.prototype);

appView.prototype.render = function (){
	var _this = this;
	$('body').append(_this.el);
	_this.fv.bindEvents();
	_this.gv.bindEvents();
}

////
function bigView(data){
	View.call(this, data)
}

bigView.prototype = Object.create(View.prototype);

bigView.prototype.render = function(){
	var _this = this;
	_this.el.attr('id', 'big');
	var img = $('<img></img>');
	img.attr('id', 'fullscreen');
	img.attr('src', _this.data);
	_this.el.append(img);
	$('body').append(_this.el);
}

bigView.prototype.bindEvents = function(){
	$('#fullscreen').on('click', function(){
		$('body').empty();
		av.render();
	})
}

////

function fullView(data){
	View.call(this, data);
}

fullView.prototype = Object.create(View.prototype);

fullView.prototype.bindEvents = function(){
	var _this = this;
	$('#fullViewImg').on('click', function(){
		bv = new bigView($(this).attr('src'));
		$('body').empty();
		bv.render();
		bv.bindEvents();
	})
}

fullView.prototype.changeUrl = function(src){
	$('#fullViewImg').attr('src', src);
}

fullView.prototype.render = function () {
	var _this = this;
	_this.el.attr('id', 'full')
	var img = $('<img></img>');
	img.attr('id', 'fullViewImg');
	img.attr('src', _this.data[0]);
	_this.el.append(img);
	return _this.el
}

////

function galleryView(data, callback){
	View.call(this, data);
	this.callback = callback;
}

galleryView.prototype = Object.create(View.prototype);

galleryView.prototype.bindEvents = function(){
	var _this = this
	$('#gallery img').on('click', function(e){
		_this.callback($(e.target).attr('src'));
	})
}

galleryView.prototype.render = function(){
	var _this = this;
	_this.el.attr('id', 'gallery');
	for(var i = 0; i < _this.data.length; i++){
		var div = $('<div></div>');
		div.addClass('image');
		var img = $('<img></img>');
		img.attr('src', _this.data[i]);
		div.append(img);
		// img.on('click', function(){
		// 	var path = $(this).attr('src');
		// 	console.log(path);
		// 	av.fv.changeUrl(path);
		// });
		_this.el.append(div);
	}
	return _this.el
}

var av = new appView(urls);
av.render();