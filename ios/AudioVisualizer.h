//
//  AudioVisualizer.h
//  MobileExercise
//
//  Created by Shashi Kant on 2/13/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
@import AVFoundation;
NS_ASSUME_NONNULL_BEGIN

@protocol DelegateURL <NSObject>

-(void) callBackAfterUrl:(NSString*)url;

@end

@interface AudioVisualizer : UIView

   
@property(nonatomic,strong) NSString *urlPreview;
@property(nonatomic,strong) AVAudioPlayer *player;
@property(nonatomic,weak) id <DelegateURL> delegate;
@property(nonatomic,strong) UILabel *label;
-(void)start;
-(void)stop;

@end

NS_ASSUME_NONNULL_END
