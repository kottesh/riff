import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
export default function PlayerN() {
  return (
    <div className='glass w-96 z-50 h-16 p-5 left-1/3 bottom-5 justify-left items-center rounded-full flex-row'>
      <AudioPlayer 
      autoPlay={false}
      src='https://firebasestorage.googleapis.com/v0/b/riff-storage.appspot.com/o/audio%2F1729455433387-Aasa%20Kooda%20(From%20%EF%BC%82Think%20Indie%EF%BC%82).m4a?alt=media&token=620e3f7f-17cf-41f6-a948-362137b34c3c'
      onPlay={e => console.log("onPlay")}
      onPause={e=> console.log("onPause")}
      controls
      />
    </div>
  )
}
