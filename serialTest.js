var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("COM9", {
  baudrate: 115200,
  // parser: require("serialport").parsers.readline("\n")
}, false);
var async = require('async');

// serialPort.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log(port.comName);
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    serialPort.on('data', function(data) {
      console.log('>>',data);
    });
	var drain = function(cb){
		// setTimeout(function(){ serialPort.drain(cb) }, 100);
		serialPort.drain(cb);
		// serialPort.close();
	};
	var write = function(input, cb){
		serialPort.write(input, function(){
			serialPort.drain(cb);
		});
		// serialPort.write(new Buffer([input]), function(err, results) {
		// 	if(err) console.log('ERROR: ' + err);
		// 	console.log("results:", results);
		// 	serialPort.flush(function(err, results){
		// 		console.log("flushed", err, results)
		// 		setTimeout(function(){ cb(err) }, 100);	
		// 	})
			// setTimeout(function(){ cb(err) }, 100);
			// setTimeout(function(){
			// 	drain(cb);
			// }, 1000);
		// });	
		// serialPort.write(new Buffer([input]));
		// cb();			
	};

	async.eachSeries(
		[255, 0, 0, 0, 255, 0],
		// [1,2,3,4,5,6],
		function(input, done){
			console.log("writing input", input, String.fromCharCode(input), input.toString());
			// write(String.fromCharCode(input), done);
			write(String.fromCharCode(input), done);
		},
		function(err){
			console.log(err);
			console.log("Done");
		}
	);

  }
});