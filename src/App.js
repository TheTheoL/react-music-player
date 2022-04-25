import React, { useState } from 'react';
// import styles
import './styles/app.scss';
//Importing components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';

//import Util
import data from './util';

function App() {
  //State
  const [songs, setSong] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">

      <Song currentSong={currentSong} />
      <Player
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}

      />
      <Library songs={songs} />
    </div>
  );
}

export default App;
