import {
  playMode
} from '@/assets/js/config'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sqeuenceList: [],
  mode: playMode.sqeuence,
  currentIndex: -1
}

export default state;
