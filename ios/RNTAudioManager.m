//
//  RNTAudioManager.m
//  MobileExercise
//
//  Created by Shashi Kant on 2/12/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

@import AVFoundation;
#import "RNTAudioManager.h"
#import "MobileExercise-Swift.h"
@implementation RNTAudioManager


RCT_EXPORT_MODULE(RNTAudioView)

RCT_EXPORT_VIEW_PROPERTY(urlPreview, NSString)


AudioVisualizer *view;
AVAudioPlayer *avAudioPlayer;
AudioPlayerComposition *player;
- (UIView *)view{

  view = [[AudioVisualizer alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(25, 25, 100, 100)];
  label.text = @"Loading....";
  view.label = label;
  [view addSubview:label];
  view.delegate = self;
  
  return view;
}

-(void) downloadFileFromURL:(NSURL*)url{
  view.label.text = @"Loading....";
  if([view.player isPlaying]){
    [view.player stop];
  }
  NSURLSessionDownloadTask *downloadTask;
  downloadTask = [NSURLSession.sharedSession downloadTaskWithURL:url completionHandler:^(NSURL *location, NSURLResponse * _Nullable response, NSError * _Nullable error) {
   
    if(avAudioPlayer!=nil){
      
        avAudioPlayer = nil ;
    }
      avAudioPlayer = [[AVAudioPlayer alloc]initWithContentsOfURL:location error:nil];
      [avAudioPlayer prepareToPlay];
        
      NSLog(@"avAudioPlayer=%@",avAudioPlayer);
           //Run UI Updates
        view.player = avAudioPlayer;
        player =  [[AudioPlayerComposition alloc]initWithPlayer:avAudioPlayer view:view];
     dispatch_async(dispatch_get_main_queue(), ^{
      [player play];
      view.label.text = @"";
     });
  }];
  [downloadTask resume];

}

RCT_EXPORT_METHOD(start){
   dispatch_async(dispatch_get_main_queue(), ^{
        [player play];
     });
}

RCT_EXPORT_METHOD(stop){
   dispatch_async(dispatch_get_main_queue(), ^{
     [player stop];
    });
}



-(void)callBackAfterUrl:(NSString *)url{
   [self downloadFileFromURL:[NSURL URLWithString:url]];
}

@end
