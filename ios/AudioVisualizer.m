//
//  AudioVisualizer.m
//  MobileExercise
//
//  Created by Shashi Kant on 2/13/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "AudioVisualizer.h"
@import UIKit;

@implementation AudioVisualizer

NSTimer *timer;
CGFloat updateInterval = 0.05;
CGFloat animatioтDuration = 0.05;
CGFloat maxPowerDelta = 30;
CGFloat minScale = 0.9;
 

-(void)start {
  
 timer = [NSTimer scheduledTimerWithTimeInterval:updateInterval target:self selector:@selector(updateMeters) userInfo:nil repeats:true];
  self.label.text = @"";
  
   
}


-(void)stop{
    if( timer == nil && !timer.isValid ) {
      return;
    }

  [timer invalidate];
  timer = nil;
  dispatch_async(dispatch_get_main_queue(), ^{
  self.transform = CGAffineTransformIdentity;
  self.label.text = @"";
  });
}

 -(void) updateMeters {
   if(self.player == nil){ return;}
   [self.player updateMeters];
   CGFloat power = [self averagePowerFromAllChannels];

   [UIView animateWithDuration:animatioтDuration animations:^{
     [self animateToPower:power];
   } completion:^(BOOL finished) {
     if(![self.player isPlaying]){
       [self.player stop];
     }
   }];
}


-(CGFloat) averagePowerFromAllChannels {
  CGFloat power = 0.0;
  for(int index=0;index<self.player.numberOfChannels;index++){
    power = power + (CGFloat)[self.player averagePowerForChannel:index];
  }
  return power / (CGFloat)self.player.numberOfChannels;
}

-(void) animateToPower:(CGFloat)power {
  CGFloat powerDelta = (maxPowerDelta + power) * 2 / 100;
  CGFloat compute = minScale + powerDelta;
  CGFloat scale = MAX(compute, minScale);
  self.transform = CGAffineTransformMakeScale(scale,scale);
 }

-(void)setUrlPreview:(NSString*)urlPreview{
  _urlPreview = urlPreview;
  
  if(self.delegate){
    [self.delegate callBackAfterUrl:urlPreview];
  }
}

@end
