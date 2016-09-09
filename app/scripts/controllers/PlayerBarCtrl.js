 (function() {
     function PlayerBarCtrl(Fixtures, SongPlayer, SharedScope) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
         this.sharedScope = SharedScope;
         
     }
 
     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', 'SharedScope', PlayerBarCtrl]);
 })();