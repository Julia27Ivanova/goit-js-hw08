import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_TIME = 'videoplayer-current-time';

setCurrentPlaybackTime();
player.on('timeupdate', throttle(setTimeToLocal, 1000));

function setTimeToLocal(e) {
  const time = e.seconds;
  localStorage.setItem(KEY_TIME, JSON.stringify(time));
}
function getTimeFromLocal() {
  return JSON.parse(localStorage.getItem(KEY_TIME));
}
function setCurrentPlaybackTime() {
  player
    .setCurrentTime(getTimeFromLocal())
    .then(function (seconds) {
      const min = Math.round(seconds / 60);
      console.log(`Start watching from ${min} minutes`);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          alert(
            'The time was less than 0 or greater than the video’s duration??!'
          );
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
