<template>
  <section class="page in" :class="{ out: hide }">
    <div class="barrage-bg shadow" ref="barrageBg"></div>
    <div class="content" :style="contentStyle">
      <div class="live">
        <i></i><span>live</span>
      </div>
      <div class="barrage-box">
        <div class="barrage-stage" ref="barrageStage">
          <template v-for="(item, index) of barrageList">
            <div class="barrage-item" :key="index" :style="`transform: translate3d(${item.x}px, ${item.y}px, 0)`">
              <span class="barrage-msg">{{ item.msg }}</span>
            </div>
          </template>
        </div>
        <div class="barrage-cover-1"></div>
        <div class="barrage-cover-2"></div>
      </div>
      <div class="input-box">
        <input type="text" class="input-control" placeholder="在弹幕中许下你的新年愿望，并抽取新年好礼~" @blur="retractKeyboard">
        <v-touch tag="button" class="barrage-add" @tap="addBarrage">
          <img src="../assets/img/btn-wish.png" alt="" width="100%">
        </v-touch>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import barrage from "../assets/js/barrage";

export default {
  name: "Barrage",

  mixins: [ barrage ],

  data() {
    return {
      hide: false,
      list: ["我竟然超过了全国86%的人，我可真牛逼", "希望招商信诺能安排一个防秃险，我觉得我很需要了", "有没有过劳肥险？我觉得我可以安排一个", "希望新的一年，可以赚更多更多的钱", "万事胜意，岁岁欢愉即可", "我可能就是传说中的投保达人吧？", "新的一年赚更多的钱，买最贵的险。没毛病", "贪心的我想许一个愿望，这个愿望就是我可以许再许三个吗？", "666，这个年度关键词可以说是总结的很到位了", "热闹凑一波，哈哈哈，希望明年头发少掉一点"]
    };
  },

  computed: {
    ...mapState(["contentWidth", "insurancePolicyStatus", "total"]),

    contentStyle() {
      return { width: this.contentWidth };
    }
  },

  methods: {
    /**
     * 键盘退出
     */
    retractKeyboard() {
      setTimeout(() => {
        document.activeElement.scrollIntoView(true);
      }, 150);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common";

.page {
  @include full;

  .barrage-bg {
    @include full;
    background: url("../assets/img/barrage-bg.jpg") center;
    @include bgCover;
  }

  .barrage-box {
    @include pa;
    width: 100%;
    top: px2rem(180px);
    height: px2rem(430px);

    .barrage-cover-1,
    .barrage-cover-2 {
      width: px2rem(122px);
      height: 100%;
      @include pa;
      top: 0;
      background: linear-gradient(to right, #f9f3d2, #f9f3d2 10%, rgba(255, 255, 170, 0.1));
    }
    .barrage-cover-1 {
      left: px2rem(-10px);
    }
    .barrage-cover-2 {
      right: px2rem(-10px);
      transform: rotate(180deg);
    }
  }

  .input-box {
    @include pa;
    width: 100%;
    display: flex;
    justify-content: center;
    left: 0;
    bottom: px2rem(50px);
    margin-bottom: px2rem(-15px);

    .input-control {
      width: px2rem(696px);
      box-sizing: border-box;
      height: px2rem(65px);
      padding: 0 px2rem(50px) 0 px2rem(15px);
      border-radius: px2rem(10px);
      box-shadow: px2rem(10px) px2rem(10px) px2rem(16px) px2rem(3px) rgba(207, 202, 171, 0.73);
      margin-right: px2rem(24px);
      color: #a4917a;
      font-size: px2rem(30px);
      background: url("../assets/img/icon-2.png") #fff right center no-repeat;
      background-size: px2rem(51px) px2rem(40px);
    }

    .barrage-add {
      width: px2rem(392px);
      &:active {
        transform: scale(0.97);
      }
    }
  }

  &.in {
    .barrage-bg,
    .logo-wrap {
      animation: fall-in-1 0.5s ease backwards;
    }

    .questionnaire-succ-title {
      animation: fall-in-1 0.6s cubic-bezier(0.3, 0.9, 0.7, 1) 0.5s backwards;
    }

    .questionnaire-btn {
      animation: fall-in-2 0.6s cubic-bezier(0.3, 0.9, 0.7, 1) 1.1s backwards;
    }
  }

  &.out {
    animation: fall-out-1 0.25s ease forwards;
  }
}

::-webkit-input-placeholder {
  opacity: 0.5;
}
input:focus::-webkit-input-placeholder {
  opacity: 0.2;
}
</style>
<style lang="scss">
@import "../assets/css/common";

.barrage-stage {
  width: 100%;
  height: 100%;
  padding: 5px 0 5px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  @include pa;
  will-change: auto;
  /*background-color: rgba(204, 204, 204, 0.5);*/

  .barrage-item {
    padding: 5px 10px;
    box-shadow: px2rem(10px) px2rem(10px) px2rem(16px) px2rem(3px) rgba(207, 202, 171, 0.73);
    color: #ff8c47 !important;
    font-size: px2rem(30px);
    @include pa;
    border-radius: 50px;
    display: flex;

    &:nth-of-type(even) {
      background-color: #fdfaeb !important;
    }

    &:nth-of-type(odd) {
      background-color: #fbf6db !important;
    }

    .barrage-msg {
      line-height: 1.6;
      white-space: nowrap;
    }
  }
}
</style>
