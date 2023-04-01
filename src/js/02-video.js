'use strict';
import { saveData, loadData } from './storage.js';
import Player from '@video/player';
const throttle = require('lodash.throttle');
const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const iframeEl = document.querySelector('#video-player');
const player = new Player(iframeEl);
player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(time) {
  saveData(LOCALSTORAGE_KEY, time.seconds);
}

player.setCurrentTime(loadData(LOCALSTORAGE_KEY) || 0);