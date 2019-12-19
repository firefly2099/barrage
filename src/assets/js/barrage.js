export default {
  data() {
    return {
      barrageId: 0,
      loop: true,
      stageWidth: 0,
      stageHeight: 0,
      stage: null,
      itemHeight: 0,
      itemRow: 0,
      speed: 3,
      maxCount: 50,
      barrageList: [],
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },

  methods: {
    random(max) {
      return Math.floor(Math.random() * max);
    },

    init() {
      this.stage = this.$refs.barrageStage;
      this.stageWidth = this.stage.clientWidth;
      this.stageHeight = this.stage.clientHeight - parseInt(window.getComputedStyle(this.stage, null).paddingTop) - parseInt(window.getComputedStyle(this.stage, null).paddingBottom);

      let ele = document.createElement("div");
      ele.classList.add("barrage-item");
      ele.style.opacity = "0";
      let msgEle = document.createElement("span");
      msgEle.classList.add("barrage-msg");
      msgEle.textContent = "弹幕弹幕";
      ele.appendChild(msgEle);
      this.stage.appendChild(ele);

      this.itemRow = Math.floor(this.stageHeight / (ele.offsetHeight * 1.1));
      this.itemHeight = Math.floor(this.stageHeight / this.itemRow);

      this.stage.removeChild(ele);

      for (let [index, text] of this.list.entries()) {
        setTimeout(() => {
          this.addToList(text, this.barrageId);
        }, index * 200 + Math.round(Math.random() * 20));
      }

      window.requestAnimationFrame(this.move);
    },

    addBarrage(e) {
      let val = e.target.previousElementSibling.value.trim();
      if (val) {
        this.addToList(val, this.barrageList.length);
        e.target.previousElementSibling.value = "";
      }
    },

    addToList(msg, index) {
      let y = this.getY();
      let x = this.barrageList.length === 0 ? this.stageWidth + 20 + this.random(50) : this.getX(y);

      this.barrageList.push({
        id: ++this.barrageId,
        w: 0,
        msg,
        x,
        y
      });

      if (typeof index !== "undefined") {
        setTimeout(() => {
          this.barrageList[index].w = this.stage.children[index].offsetWidth;
        }, 0);
      }
    },

    move() {
      this.detection();
      this.barrageList = this.barrageList.map(val => {
        val.x -= this.speed;
        return val;
      });

      if (this.loop) {
        window.requestAnimationFrame(this.move.bind(this));
      }
    },

    detection() {
      this.barrageList = this.barrageList.map((val, index) => {
        if (!val.w) {
          val.w = this.stage.children[index].offsetWidth;
        }
        if (val.x + val.w < -20) {
          val.y = this.getY();
          val.x = this.getX(val.y);
          // console.info("val.x", val.x);
        }
        return val;
      });

      let len = this.barrageList.length;
      if (len > this.maxCount) {
        let diff = len - this.maxCount;
        this.barrageList = this.barrageList.filter(val => {
          return !(diff-- > 0 && (val.x + val.w < -20 || val.x > this.stageWidth + 20))
        });
      }
    },

    getY() {
      return this.random(this.itemRow) * this.itemHeight;
    },

    getX(y) {
      let sameRowEle = this.barrageList.filter(ele => {
        return ele.y === y;
      });
      let maxX = sameRowEle.reduce((prev, cur) => {
        return cur.x + cur.w > prev ? cur.x + cur.w : prev;
      }, 0);
      return maxX > this.stageWidth ? maxX + 50 + this.random(50) : this.stageWidth + 20 + this.random(50);
    },

    play() {
      this.loop = true;
      window.requestAnimationFrame(this.move);
    },

    stop() {
      this.loop = false;
    }
  }
};
