var PixelControl = require('./pixelControl');

var pc = new PixelControl({ comport: process.argv[2] });

var frame = 
	[
		[255, 0, 0],
		[0, 0, 255]
	];
	
pc.open(function(err){
	if(err){
		console.log("Error: ", err);
		process.exit(0);
	}
	
	// pc.sp.on("data", function(data, err){
	// 	if(err) console.log("ERROR reading:", err);
	// 	console.log(">> ", data.toString("utf-8"));
	// })
	
	console.log("Connection is open");
	
	pc.setFrame(frame);
	
	pc.clearFrame(function(){
		console.log("frame clear");
		pc.writeFrame(function(){
			console.log("Frame written");
			setTimeout(function(){
				frame =
					[
						[255, 255, 255],
						[0, 0, 255]
					];
				pc.setFrame(frame);
				pc.writeFrame(function(){
					setTimeout(function(){
						pc.clearFrame(function(){ console.log("Finished"); });
					}, 1000);
				});
			}, 3000);
		});
	});	
})