var Sounds = new (function() {
  this.muted = false;

  this.audioFormat = '.mp3';
  var audio = new Audio();
  if (audio.canPlayType('audio/ogg')) {
    this.audioFormat = '.ogg';
  }

  var sounds = {
    // key: 'sounds/file_name'
    ghost: 'sounds/Ghost',
    key: 'sounds/key',
    pick_up: 'sounds/pick up',
    unlock: 'sounds/unlock',
    falling: 'sounds/falling',
    ending: 'music/badending_musicv1',
    tile_moved: 'sounds/tile moved',
    puzzle_solved: 'music/SolvePuzzleMusicv1'
  };

  this.initialize = function(callback) {
    var numToLoad = Object.keys(sounds).length;
    for (var key in sounds) {
      if (sounds.hasOwnProperty(key)) {
        this[key] = new Sound(sounds[key] + this.audioFormat, doneLoading);
      }
    }

    function doneLoading(event) {
      if (event) {
        // Remove event-listener so it only fires once!
        event.target.removeEventListener(event.type, arguments.callee);
      }

      numToLoad--;
      if (numToLoad == 0 && callback) {
        callback();
      }
    }
  };

  this.play = function(sound) {
    if (this[sound]) {
      this[sound].play();
    }
  };

  var Sound = function(_file, callback) {
    var timeOut = 8;
    var lastPlay = 0;
    var numSounds = 5;
    var index = 0;
    var file = new Audio(_file);
    file.addEventListener('canplaythrough', callback);
    file.load();
    var queue = [file];

    for (var i = 1; i < numSounds; i++) {
      queue[i] = queue[0].cloneNode(false);
    }

    this.play = function() {
      if (Sounds.muted) {
        return;
      }
      if (Date.now() - lastPlay > timeOut) {
        lastPlay = Date.now();
        queue[index].currentTime = 0;
        queue[index].play();
        var s = queue[index];

        index++;
        if (index >= numSounds) {
          index = 0;
        }

        return s;
      }
    };
  };
})();
