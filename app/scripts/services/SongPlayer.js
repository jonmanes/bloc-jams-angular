(function() {
    
/**
 * @function SongPlayer
 * @desc Plays and pauses the selected song based on current state
 * @param none
 */
     function SongPlayer($rootScope, Fixtures) {
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
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
          SongPlayer.currentTime = null;
         
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
 * @function stopSong
 * @desc stops the selected song
 * @param {Object} song
 */
          var stopSong = function() {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
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
              stopSong();
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
                 stopSong();
              } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
              }
          };    
 /**
 * @function SongPlayer.next
 * @desc gets the index of the song after the current song
 * @param {Object} 
 */        
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
              
              if (currentSongIndex >= currentAlbum.songs.length) {
                 stopSong();
              } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
              }
          }; 
         
          /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };
        
          SongPlayer.volume = 80;
          
          SongPlayer.changeVolume = function(volume){
              currentBuzzObject.setVolume(volume);
          };
         
        return SongPlayer;
        
    }
    
    
    angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();