pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board({ port: "COM9" });

board.on("ready", function() {

    var strip = new pixel.Strip({
        data: 6,
        length: 4,
        board: this,
        controller: "FIRMATA"
    });

    strip.on("ready", function() {
        // do stuff with the strip here.
		console.log("Ready whoo!");
    });

});