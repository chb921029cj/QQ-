<template>
    <div class="player" v-show="playList.length>0">
        <div class="normal-player" v-show="fullScreen">
            <div class="background">
              <img width="100%" height="100%"   alt="" :src="currentSong.image">
            </div>
            <div class="top">
              <div class="back">
                <i class="icon-back"></i>
              </div>
            <h1 class="title" v-html="currentSong.name"></h1>
            <h2 class="subtitle" v-html="currentSong.singer"></h2>              
            </div>

        </div>
        <div class="mini-player" v-show="!fullScreen">
            <div class="icon">
               <img width="40px" height="40px" :src="currentSong.image" alt="">
            </div>
            <div class="text">
              <h2 class="name" v-html="currentSong.name"></h2>
              <p class="desc" v-html="currentSong.singer"></p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["fullScreen", "playList", "currentSong"])
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    color: #fff;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 1rem;
      .back {
        position: absolute;
        top: 0;
        left: 0.3rem;
        z-index: 50px;
        .icon-back:before {
          content: "\e911";
        }

        .icon-back {
          display: block;
          padding: 0.4rem;
          @include sc($font-size-large, $color-text);
          transform: rotate(-90deg);
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        @include font($font-size-large, 2rem);
        color: $color-text;
        text-align: center;
      }
      .subtitle {
        @include font($font-size-medium, 1rem);
        text-align: center;
        color: $color-text;
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    @include wh(100%, 3rem);
    background: $color-highlight-background;
    .icon {
      flex: 0 0 2rem;
      width: 2rem;
      padding: 0 0.5rem 0 1rem;
      .img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: cplumn;
      justify-content: center;
      flex: 1;
      line-height: 1rem;
      overflow: hidden;
      .name {
        margin-bottom: 0.1rem;
        @include sc($font-size-medium, $color-text);
      }
      .desc {
        @include sc($font-size-small, $color-text);
      }
    }
  }
}
</style>
