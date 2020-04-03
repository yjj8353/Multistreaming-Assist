// 부트스트랩4
window.$ = window.jquery = require('jquery');
window.popper            = require('popper.js');
                           require('bootstrap');

// 일렉트론 관련
const {ipcRenderer, Menu, MenuItem} = require('electron');
const {Titlebar, Color}              = require('custom-electron-titlebar');

// 시스템 관련
const {execFile, execFileSync} = require('child_process');
const fs                       = require('fs');

// 사용자 모듈
const {checkKey, checkTwitchKeyPattern, checkYoutubeKeyPattern} = require('./js/check-key.js');
const {findFirstSlash, findLastSlash}                           = require('./js/find-slash.js');
const {makeNginxConfigFile}                                     = require('./js/make-nginx-conf.js');
const {on, off}                                                 = require('./js/nginx-switch.js');
                                                                  require('./js/titlebar-settings.js')