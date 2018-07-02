<template>
    <div class="recommend">
      <scroll ref="scroll" class="recommend-content" :data="discList"> 
        <div>
          <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
              <slider>
                  <div v-for="item in recommends" :key = "item.uid">
                      <a :href="item.linkUrl">
                          <img  class="needsclick" :src="item.picUrl" @load="loadImage">
                      </a>
                  </div>
              </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="(item,index) in discList" :key="index" class="item">
                <div class="icon">
                  <img class="img" v-lazy="item.img" alt="">
                </div>
                <div class="text">
                    <h2 class="name" v-html="item.name"> </h2>
                    <p class="desc " v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>        
      </scroll>
    </div>
</template>

<script>
import Scroll from "@/components/common/scroll/scroll";
import { getRecommend } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import Slider from "@/components/common/slider/slider";
import Loading from "@/components/common/loading/loading";
export default {
  data() {
    return {
      recommends: [],
      loop: true,
      discist: [
        {
          img: require("../../../assets/image/img.jpg"),
          name: "1鹅鹅鹅",
          dissname:
            "鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "2曲项向天歌",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "3白毛浮绿水",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "4红掌拨清波",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "5春种一粒粟",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "6秋收万颗子",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "7四海无闲田",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "8农夫犹饿死",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "9锄禾日当午",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        },
        {
          img: require("../../../assets/image/img.jpg"),
          name: "10汗滴禾下土",
          dissname: "鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。"
        }
      ],
      discList: []
    };
  },
  created() {
    this._getRecommend();
  },
  mounted() {
    setTimeout(() => {
      this.discList = this.discist;
    }, 2000);
  },
  methods: {
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20);
      }
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.recommend {
  position: fixed;
  width: 100%;
  top: 4.2rem;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 2.2rem;
        @include font($font-size-medium, 2.2rem);
        text-align: center;
        color: $color-theme;
      }

      .item {
        @include fj();
        box-sizing: border-box;
        align-items: center;
        padding: 0 0.5rem 0.5rem 0.5rem;
        height: 4rem;

        .icon {
          flex: 0 0 3rem;
          width: 2rem;
          padding-right: 0.3rem;
          .img {
            display: inline-block;
            @include wh(100%, 100%);
          }
        }

        .text {
          height: 4rem;
          // display: flex;
          align-self: flex-start;
          // flex-direction: column;
          // justify-content: center;
          flex: 1;
          line-height: 1rem;
          overflow: hidden;
          font-size: 0.4rem;
          .name {
            color: $color-text;
            text-align: center;
          }

          .desc {
            @include wh(100%, 1.6rem);
            @include font($font-size-small-s, 0.8rem);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
