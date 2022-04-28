import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../util';

//import the icons, then pass them down as a PROP.

export default function Player({ currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setSongs }) {

    //useEffect
    useEffect(() => {
        //Add active state
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
    }, [currentSong]);
    //event handlers

    //this is for the play/pause buttons. 'if' isPlaying, then the song plays, otherwise if it isn't, pause. '!isPlaying" sets the oposit value: false to true, true to false.
    const playSongHandler = (e) => {
        e.preventDefault();
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };


    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying, audioRef);
    };




    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type="range">
                </input>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-back')}
                    className='skip-back'
                    size="2x"
                    icon={faAngleLeft} />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size="2x"
                    icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')}
                    className='skip-forward'
                    size="2x"
                    icon={faAngleRight} />
            </div>

        </div>
    )
}