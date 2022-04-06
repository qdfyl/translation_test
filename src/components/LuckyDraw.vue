<template>
  <div class="warp">
    <div class="popup_window" v-if="selectiveGame != 0">
      <div class="popup_header">
        <div class="title_info">
          <div class="game_name" v-if="selectiveGame == 1">猜图片</div>
          <div class="game_name" v-if="selectiveGame == 2">猜歌名</div>
          <div class="game_name" v-if="selectiveGame == 3">知识问答</div>
          <div class="question_number">
            <span class="mark">{{ answerData.hasAnswerDataNum }}</span
            >/{{ answerData.sumAnswerData }}题
          </div>
          <div class="time_remaining">
            <img src="@/assets/default_icon_time@2x.png" alt="" />
            {{ answerData.residueTime }}s
          </div>
          <div class="Answer_correctly_number">
            答对<span class="mark">{{ answerData.answerCorrectlyNumber }}</span
            >人
          </div>
        </div>
        <div class="pack_up" @click="packUpHandle">
          <div class="pack_up_pic">
            <img src="@/assets/default_icon_zoom@2x.png" alt="" />
          </div>

          收起
        </div>
      </div>
      <div class="popup_main">
        <div class="target_pic" v-if="selectiveGame == 1"></div>
        <div class="target_song_topic" v-if="selectiveGame == 2">
          <div class="target_song_name"></div>
          <div class="prompt">请猜出这首歌的名字</div>
        </div>
        <div class="target_title" v-if="selectiveGame == 3">
          头像凤凰头,脚像钓鱼钩,远地七八 尺,泥里伸出头？
        </div>
        <div class="options">
          <ul>
            <li
              :class="
                item.answer && correctAnswer == index
                  ? 'select_correct'
                  : errorAnswer == index
                  ? 'select_error'
                  : ''
              "
              @click="optionsHandle(item, index)"
              v-for="(item, index) in answerData.options"
              :key="index"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectiveGame: {
      type: Number,
    },
  },
  watch: {
    selectiveGame(newData, oldData) {
      if (newData == 0) {
        if (oldData != this.lastSelectResult) {
          this.selectResult = -1;
          this.correctAnswer = -1;
          this.errorAnswer = -1;
        }
      } else if (newData != this.lastSelectResult) {
        this.selectResult = -1;
        this.correctAnswer = -1;
        this.errorAnswer = -1;
      }
    },
  },
  data() {
    return {
      selectResult: -1,
      correctAnswer: -1,
      errorAnswer: -1,
      lastSelectResult: -1,
      answerData: {
        hasAnswerDataNum: 3,
        sumAnswerData: 5,
        residueTime: 60,
        answerCorrectlyNumber: 2,
        targetPic: '',
        options: [
          {
            value: '迈克尔杰克逊',
            answer: true,
          },
          {
            value: '周杰伦',
            answer: false,
          },
          {
            value: '吴亦凡',
            answer: false,
          },
          {
            value: '肖战',
            answer: false,
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    optionsHandle(item, index) {
      if (this.selectResult >= 0 || this.errorAnswer >= 0) {
        return;
      }
      if (item.answer) {
        this.selectResult = index;
        this.correctAnswer = index;
      } else {
        this.errorAnswer = index;
        this.answerData.options.map((item, index2) => {
          if (item.answer) {
            this.correctAnswer = index2;
          }
        });
      }
    },
    packUpHandle() {
      this.lastSelectResult = this.selectiveGame;
      this.$emit('packUpHandle', 0);
    },
  },
};
</script>

<style lang="less" scoped>
.warp {
  .popup_window {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 370px;
    margin-top: -185px;
    margin-left: -150px;
    background: #dbf0ff;
    border-radius: 13px;
    overflow: hidden;
    .popup_header {
      display: flex;
      .title_info {
        flex: 1;
        height: 32px;
        line-height: 32px;
        background-image: linear-gradient(0deg, #d93259 0%, #f18b94 100%);
        border-radius: 15px 0px 13px 0px;
        font-family: PingFang SC;
        font-size: 12px;
        color: #ffffff;
        div {
          float: left;
        }
        .game_name {
          height: 32px;
          min-width: 68px;
          margin-left: 12px;
          font-size: 14px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          font-style: italic;
          color: #ffffff;
        }
        .question_number {
          margin-left: 15px;
        }
        .time_remaining {
          margin-left: 20px;
          color: #ffe1b2;
          img {
            width: 10px;
            height: 10px;
          }
        }
        .Answer_correctly_number {
          margin-left: 20px;
          .mark {
            margin: 0 3px;
          }
        }
      }
      .pack_up {
        width: 40px;
        text-align: center;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #9d9d9d;
        cursor: pointer;
        .pack_up_pic {
          img {
            margin-top: 5px;
            width: 21px;
            height: 19px;
          }
        }
      }
      .mark {
        color: #ffe1b2;
      }
    }
    .popup_main {
      .target_pic {
        margin: 10px auto;
        width: 165px;
        height: 95px;
        background-color: rgb(212, 194, 255);
        border-radius: 10px;
      }
      .target_song_topic {
        margin: 28px 0 27px;
        .target_song_name {
          width: 220px;
          height: 35px;
          margin: 0 auto;
          background: #dd4062;
          opacity: 0.3;
          border-radius: 10px;
        }
        .prompt {
          margin-top: 12px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #9d9d9d;
        }
      }
      .target_title {
        width: 217px;
        min-height: 40px;
        margin: 21px auto 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 700;
        color: #111111;
        line-height: 40px;
      }
      .options {
        ul {
          padding: 0;
          li {
            width: 225px;
            height: 37px;
            margin: 0 auto 14px;
            background-color: #f5f6f8;
            border-radius: 18px;
            list-style: none;
            line-height: 37px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            font-weight: 400;
            color: #111111;
            cursor: pointer;
          }
          .select_correct {
            color: #ffffff;
            background-color: #2cdc9b;
          }
          .select_error {
            position: relative;
            color: #ffffff;
            background-color: #ff6864;
            &::before {
              position: absolute;
              top: 0;
              left: 0;
              content: '';
              width: 25px;
              height: 25px;
              transform: translate(9px, 4px);
              background-color: rgb(255, 175, 244);
              border-radius: 50%;
              border: 2px solid #fff;
            }
          }
        }
      }
    }
  }
}
</style>