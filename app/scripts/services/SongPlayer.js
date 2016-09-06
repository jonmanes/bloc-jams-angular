(function() {
    
/**
 * @function SongPlayer
 * @desc Plays and pauses the selected song based on current state
 * @param none
 */
     function SongPlayer() {
 /**
 * @desc place holder for the methods to control the song actions; pause, play, etc 
 * @type {Object}
 */
          var SongPlayer = {};
 /**
 * @desc currently selected song
 * @type {Object}
 */
          var currentSong = null;
         
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null; 
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         
          var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
          };          
          
 /**
 * @function playSong
 * @desc Plays the selected song
 * @param {Object} song
 */
     
          var playSong = function(song) {
              currentBuzzObject.play();
              song.playing = true;
          };
         
 /**
 * @function SongPlayer.play
 * @desc Handles the logic for determining if the song is set, if not it sets and plays the song, if so it checkif song is paused and if so it plays the song. assumes if the song is set and not paused that it is playing.
 * @param {Object} song
 */
     
          SongPlayer.play = function(song) {
              
            if (currentSong !== song) {
                 
                setSong(song);

                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                    
                }
            } 
          };
/**
 * @function SongPlayer.pause
 * @desc pauses the selected song
 * @param {Object} song
 */
          SongPlayer.pause = function(song) {
              currentBuzzObject.pause();
              song.playing = false;
          };
        
        return SongPlayer;
        
    }
    
    angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
})();