#include <Adafruit_NeoPixel.h>


int pixels = 2;
int pixelPointer = 0;
char finishedPixel = 0;
char rgb[3] = {0,0,0};

Adafruit_NeoPixel strip = Adafruit_NeoPixel(pixels, 6, NEO_GRB + NEO_KHZ800);

void setup() {
  // put your setup code here, to run once:
  strip.begin();
  strip.show();
  
  Serial.begin(115200);
}

void loop() {
  //Check to see if we have data
  if(Serial.available()){
    char inChar = Serial.read();
    if(inChar == '\n') return;
//    Serial.println(inChar);
    rgb[finishedPixel++] = inChar;
    
    if(finishedPixel == 3){
      Serial.println("Setting pixel");
      finishedPixel = 0;
      strip.setPixelColor(pixelPointer, rgb[0], rgb[1], rgb[2]);
      pixelPointer++;
      
      if(pixelPointer >= pixels){
        Serial.println("Setting strand");
        pixelPointer = 0;
        strip.show(); 
      }
    }
  }

}
