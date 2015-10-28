var async = require('async'),
	Jimp = require('jimp'),
	fs = require('fs');

var opened = new Jimp(process.argv[2], function(err, image){
	var RGBs = [];
	
	var y = 0,
		x = 0;
	
	async.whilst(
		function(){
			return y < image.bitmap.height;
		},
		function(done){
			async.whilst(
				function(){
					return x < image.bitmap.width;
				},
				function(done){
					var colors = Jimp.intToRGBA(image.getPixelColor(x, y));
					RGBs.push([
						colors.r,
						colors.b,
						colors.g
					]);
					x++;
					setImmediate(done);
				},
				function(err){
					x = 0;
					y++;
					setImmediate(done);
				}
			);
			
		},
		function(err){
			console.log("Image complete");
			fs.writeFile(process.argv[2] + ".json", JSON.stringify(RGBs), function(err){
				err ? console.log("Error: ", err) : console.log("File written!");
			});
		}
	);
	
	
});