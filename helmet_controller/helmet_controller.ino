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
  while(Serial.available()){
    /*byte inChar = Serial.read();
    
    if(inChar == 13){
      if(++resetCounter >= 5){
        resetCounter = 0;
        strip.Color(0,0,0);
        strip.show();
        finishedPixel = 0;
        pixelPointer = 0;
        Serial.println("Clearing frame");
        return;
      }
    } else {
     resetCounter = 0; 
    }*/
    int inChar = Serial.parseInt();
    Serial.println(inChar);
    if(inChar == -1){
       Serial.println("Clearing");
       strip.Color(0,0,0);
       strip.show();
       finishedPixel = 0;
       pixelPointer = 0;
       return;
    }
//    Serial.println(inChar);
    rgb[finishedPixel] = inChar;
    finishedPixel++;
    if(finishedPixel >= 3){
      Serial.println("Setting pixel");
      Serial.println((int) finishedPixel);
      Serial.println((int) rgb[0]);
      Serial.println((int) rgb[1]);
      Serial.println((int) rgb[2]);
      Serial.println((int) pixelPointer);
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
