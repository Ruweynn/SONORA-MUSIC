(function () {
  // Live local time/date widget for the hero card.
  var cdDays = document.getElementById('cd-days');
  var cdHours = document.getElementById('cd-hours');
  var cdMins = document.getElementById('cd-mins');
  var cdSecs = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

    var now = new Date();
    var date = now.getDate();
    var monthIndex = now.getMonth();
    var year = now.getFullYear();
    var hours = now.getHours();
    var mins = now.getMinutes();
    var secs = now.getSeconds();
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var period = hours >= 12 ? 'PM' : 'AM';
    var displayHours = hours % 12 || 12;

    cdDays.textContent = pad(date);
    cdHours.textContent = String(displayHours).padStart(2, '0');
    cdMins.textContent = pad(mins);
    cdSecs.textContent = pad(secs);

    var label = document.querySelector('.hero-util-sub');
    if (label) {
      label.textContent = dayNames[now.getDay()] + ', ' + monthNames[monthIndex] + ' ' + date + ' · ' + displayHours + ':' + pad(mins) + ' ' + period;
    }
  }
  tick();
  setInterval(tick, 1000);

  // Actual MP3-powered mini-player so the homepage audio is real, not generated.
  var toggle = document.getElementById('player-toggle');
  var wave = document.getElementById('player-wave');
  var prevButton = document.querySelector('.player-controls button[aria-label="Previous"]');
  var nextButton = document.querySelector('.player-controls button[aria-label="Next"]');

  var tracks = [
    '/uploads/music/track-1.mp3',
    '/uploads/music/track-2.mp3',
    '/uploads/music/track-3.mp3'
  ];

  var currentTrackIndex = 0;
  var audio = new Audio(tracks[currentTrackIndex]);
  audio.loop = false;
  audio.preload = 'auto';

  function updateToggleState(isPlaying) {
    if (!toggle || !wave) return;
    wave.classList.toggle('playing', isPlaying);
    toggle.textContent = isPlaying ? '⏸' : '▶';
    toggle.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  }

  function playTrack() {
    audio.play().then(function () {
      updateToggleState(true);
    }).catch(function () {
      updateToggleState(false);
    });
  }

  function setTrack(index, autoplay) {
    currentTrackIndex = (index + tracks.length) % tracks.length;
    audio.src = tracks[currentTrackIndex];
    audio.load();

    if (autoplay) {
      playTrack();
    } else {
      updateToggleState(false);
    }
  }

  if (toggle && wave) {
    toggle.addEventListener('click', function () {
      if (audio.paused) {
        playTrack();
      } else {
        audio.pause();
        updateToggleState(false);
      }
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      setTrack(currentTrackIndex - 1, !audio.paused);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      setTrack(currentTrackIndex + 1, !audio.paused);
    });
  }

  audio.addEventListener('play', function () {
    updateToggleState(true);
  });

  audio.addEventListener('pause', function () {
    if (!audio.ended) {
      updateToggleState(false);
    }
  });

  audio.addEventListener('ended', function () {
    setTrack(currentTrackIndex + 1, true);
  });
})();
