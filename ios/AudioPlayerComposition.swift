import UIKit
import AVFoundation

class AudioPlayerComposition : NSObject {
    
   @objc
    private var player: AVAudioPlayer
    private weak var view: AudioVisualizer!

    @objc
    init(player: AVAudioPlayer, view: AudioVisualizer) {
        self.player = player
        self.view = view
        player.isMeteringEnabled = true
        view.player = player
    }
  
    @objc
    func play() {
        guard !player.isPlaying else {
            return
        }

        player.play()
        view.start()
        view.label.text=""
    }
    @objc
    func pause() {
        guard player.isPlaying else {
            return
        }

        player.pause()
        view.stop()
    }

    @objc
    func stop() {
        guard player.isPlaying else {
            return
        }

        player.stop()
        view.stop()
    }

}
