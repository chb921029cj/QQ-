<template>

   
    <scroll @scroll="scroll" :probeType="probeType" class="listview" :listen-scroll="listenScroll" :data="data" ref="listview">
        <ul>
            <li class="list-group" v-for="(group,index) in data" :key="index" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="(item,inde) in group.items" class="list-group-item" :key="inde">
                        <img class="avatar" v-lazy="item.avatar" alt="">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" >
            <ul>
                <li :class="{'current':currentIndex===index}" v-for="(item,index) in shortcutList" :data-index="index" :key="index" class="item">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
          <div class="fixed-title">{{fixedTitle}} </div>
        </div>
    </scroll>


</template>

<script>
import { getData } from "@/assets/js/dom";
import Scroll from "@/components/common/scroll/scroll";
export default {
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3; //监听滚动
    this.ANCHOR_HEIGHT =
      parseFloat(
        getComputedStyle(window.document.documentElement)["font-size"]
      ) * 0.7;
    this.title_height =
      parseFloat(
        getComputedStyle(window.document.documentElement)["font-size"]
      ) * 1.6;
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.ANCHOR_HEIGHT =
        parseFloat(
          getComputedStyle(window.document.documentElement)["font-size"]
        ) * 0.7;
      this.title_height =
        parseFloat(
          getComputedStyle(window.document.documentElement)["font-size"]
        ) * 1.6;
    });
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        console.log(group);
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1 //根据区块的上线跟我的滚动差
    };
  },

  methods: {
    selectItem(item) {
      console.log(item);
      this.$emit("select", item);
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, "index");
      let firstTouch = e.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.anchorIndex = anchorIndex;
      this._scrollTo(anchorIndex);
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = ((this.touch.y2 - this.touch.y1) / this.ANCHOR_HEIGHT) | 0;
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      this._scrollTo(anchorIndex);
    },
    scroll(pos) {
      this.scrollY = pos.y;
      // this.scrollY = pos.y - 20 * this.ANCHOR_HEIGHT;
    },
    _scrollTo(index) {
      console.log(index);
      if (!index && index !== 0) {
        return;
      }
      if (index < 0) {
        index = 0;
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2;
      }
      this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY) {
      const listHeight = this.listHeight;
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY; //从上区块的距离
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < this.title_height
          ? newVal - this.title_height
          : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3D(0,${fixedTop}px,0)`;
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 1.2rem;

    .list-group-title {
      height: 1.6rem;
      line-height: 1.6rem;
      padding-left: 0.8rem;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 1rem 0 0 1rem;

      .avatar {
        @include wh(2rem, 2rem);
        border-radius: 50%;
      }

      .name {
        margin-left: 2rem;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 10;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 0 0.1rem;
      line-height: 0.7rem;
      color: $color-text-l;
      font-size: 0.6rem;

      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 1.6rem;
      line-height: 1.6rem;
      padding-left: 0.8rem;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
