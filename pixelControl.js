var SerialPort = require("serialport").SerialPort,
	async = require('async');

//Constructor
var PixelControl = function(opts){
	this.sp = new SerialPort(opts.comport, { baudrate: opts.baudrate || 115200 }, false);
	this._frame = [];
}

PixelControl.prototype.open = function(cb){
	this.sp.open(function(){
		setTimeout(cb, 5000); //To avoid arduino reset
	});	
};

PixelControl.prototype.write = function(input, cb){
	var self = this;
	
	self.sp.write(input.toString() + "x", function(){
		self.sp.drain(function(){
			setImmediate(cb);
		});
	});
}

PixelControl.prototype.sendPixel = function(rgb, cb){
	var self = this;
	
	async.eachSeries(
		rgb,
		function(color, done){
			self.write(color, done);
		},
		cb
	);
};

PixelControl.prototype.clearFrame = function(cb){
	var self = this;
	var clearedFrame = [];
	
	self._frame.forEach(function(pixel){
		clearedFrame.push([0,0,0]);
	});
	self.write(-1, function(){
		self.writeFrame(clearedFrame, function(){
			self.write(-1, function(){
				cb();
			});
		});
	});
};

PixelControl.prototype.setFrame = function(frame, cb){
	this._frame = frame;
	if(cb) cb();
};

PixelControl.prototype.writeFrame = function(frame, cb){
	var self = this;
	
	if(typeof frame == "function"){
		cb = frame;
		frame = this._frame;
	}
	
	async.eachSeries(
		frame,
		function(rgb, done){
			self.sendPixel(rgb, done)
		},
		cb	
	);
};

module.exports = PixelControl;