<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back" style="color:#fff">返回</i>
        </div>
        <h1 class="title ellipsis" v-html="title"></h1>
        <div  class="bg-image" :style="bgStyle" ref="bgImg">
          <div class="play-wrapper">
            <div class="play" v-show="songs.length>0" ref="playButton">
              <i class="icon-play"></i>
              <span class="text">随机播放全部</span>
            </div>
          </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer">

        </div>
        <scroll @scroll="scroll" :probe-type="protoType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
            <div class="song-list-wrapper" >
                <song-list @select="selectItem" :songs="songs"></song-list>
            </div>
        <div class="loading-container" v-show="!songs.length">
          <loading></loading>
        </div> 
        </scroll>
    </div>
</template>

<script>
import Scroll from "@/components/common/scroll/scroll";
import songList from "../song-list/song-list";
import { prefixStyle } from "@/assets/js/dom";
import { mapActions } from "vuex";
const RESERVED_HEIGHT = 40;
const transform = prefixStyle("transform");
const backdrop = prefixStyle("backdrop-filter");
import Loading from "@/components/common/loading/loading";
export default {
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      deault: []
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scrollY: 0
    };
  },
  mounted() {
    //得到 设置这个component 的高度 要 $el
    this.imageHeight = this.$refs.bgImg.clientHeight;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.$refs.bgImg.clientHeight}px`;
    console.log(111);
  },
  created() {
    this.protoType = 3;
    this.listenScroll = true;
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y;
    },
    back() {
      this.$router.back();
    },
    selectItem(item, index) {
      //点击列表触发的事件
      console.log(this.songs,index)
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    ...mapActions(["selectPlay"])
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
      const percent = Math.abs(newY / this.imageHeight);
      if (newY > 0) {
        scale = 1 + percent; //图片放大
        zIndex = 10;
      } else {
        blur = Math.min(20 * percent, 20);
      }
      //针对ios的高斯模糊
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      //针对安卓手机的模糊

      if (newY < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImg.style.paddingTop = 0;
        this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.playButton.style.display = "none";
      } else {
        this.$refs.bgImg.style.paddingTop = "70%";
        this.$refs.bgImg.style.height = 0;
        this.$refs.playButton.style.display = "";
      }
      this.$refs.bgImg.style.zIndex = zIndex;
      this.$refs.bgImg.style[transform] = `scale(${scale})`;
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  components: {
    Scroll,
    songList,
    Loading
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 1rem;
    z-index: 150;
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 140;
    @include wh(80%, 2rem);
    @include font($font-size-large, 2rem);
    text-align: center;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
    .play-wrapper {
      position: absolute;
      bottom: 2rem;
      z-index: 50;
      width: 100%;
    }
    .play {
      box-sizing: border-box;
      width: 6rem;
      padding: 0.5rem 0;
      margin: 0 auto;
      text-align: center;
      border: 1px solid $color-theme;
      color: $color-theme;
      border-radius: 4rem;
      font-size: 0;
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.2rem;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
        color: $color-theme;
      }
    }
  }
}
.list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: $color-background;
  .song-list-wrapper {
    padding: 1rem;
  }
}
.bg-layer {
  position: relative;
  height: 100%;
  background: $color-background;
}
</style>

