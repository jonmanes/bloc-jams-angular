(function() {
    
/**
 * @function SongPlayer
 * @desc Plays and pauses the selected song based on current state
 * @param none
 */
     function SongPlayer(Fixtures) {
 /**
 * @desc place holder for the methods to control the song actions; pause, play, etc 
 * @type {Object}
 */
          var SongPlayer = {};        
         
 /**
 * @desc Store current Ablum information 
 * @type {Object}
 */
          var currentAlbum = Fixtures.getAlbum();
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
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
          };          
/**
 * @function getSongIndex
 * @desc gets the index of the currently selected song
 * @param {Object} song
 */
          var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);
          };
/**
 * @desc currently selected song
 * @type {Object}
 */
          SongPlayer.currentSong = null;
         
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
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                 
                setSong(song);

                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
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
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };
 /**
 * @function SongPlayer.previous
 * @desc gets the index of the song before the current song
 * @param {Object} 
 */        
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;
              
              if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };        
        
        return SongPlayer;
        
    }
    
    angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
})();