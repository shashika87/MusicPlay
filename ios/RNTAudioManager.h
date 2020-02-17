//
//  RNTAudioManager.h
//  MobileExercise
//
//  Created by Shashi Kant on 2/12/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import "AudioVisualizer.h"

@interface RNTAudioManager : RCTViewManager<DelegateURL>
@property (nonatomic, assign) NSString *urlPreview;
@end


