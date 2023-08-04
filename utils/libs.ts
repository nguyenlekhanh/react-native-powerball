import Sound from "react-native-sound";

function getRandomNumbersArray(numberOfItems: number): number[] {
  const randomNumbers: number[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    const randomNumber = Math.floor(Math.random() * 100);
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}


//Sound Util
const pauseAudio = (audio:Sound) => {
  if(audio) {
    if(audio.isPlaying()){
      audio.stop();
    }
  }
}

const playingAudio = (audio:Sound, url: string) => {
  if(audio){
    if(audio.isPlaying()){
      audio.stop();
    }
  }
  Sound.setCategory('Playback');

  audio = new Sound(
    url,
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      // console.log(
      //   'duration in seconds: ' +
      //     audio.getDuration() +
      //     'number of channels: ' +
      //     audio.getNumberOfChannels(),
      // );

      audio.play(success => {
        if (success) {
          console.log('successfully finished playing');
          audio.release();
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    },
  );
  audio.release();    
}


export { getRandomNumbersArray, playingAudio, pauseAudio }

