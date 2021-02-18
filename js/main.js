const App = {
  data() {
    return {
      putCount: 0,
      nowPlayer: 2,
      fields: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      antiPanels: [],
      myPanels: [],
    };
  },
  methods: {
    panelClass(cell) {
      if (cell === 1) {
        return "white-panel";
      }
      if (cell === 2) {
        return "black-panel";
      }
      return "";
    },
    // 直線状に自分の駒があるかどうか
    checkStright(panel, h, v, i, j) {
      if (this.nowPlayer === this.display[i + panel[0] + h][j + panel[1] + v]) {
        return [i + panel[0] + h, j + panel[1] + v];
      }

      if (0 === this.display[i + panel[0] + h][j + panel[1] + v]) {
        return;
      }

      if (undefined === this.display[i + panel[0] + h][j + panel[1] + v]) {
        return;
      }
      this.checkStright(panel, panel[0] + h, panel[1] + v, i, j);
    },
    //  周りの相手の駒を確認する
    checkAroundAnti(i, j) {
      this.antiPanels = [];

      for (let h = -1; h < 2; h++) {
        for (let v = -1; v < 2; v++) {
          if (0 <= i + h && 0 <= j + v && i + h <= 7 && j + v <= 7) {
            if (
              (0 !== this.display[i + h][j + v]) &
              (this.nowPlayer !== this.display[i + h][j + v])
            ) {
              this.antiPanels.push([h, v]);
            }
          }
        }
      }
    },
    putPanel(i, j) {
      // この場所に駒があるかどうか
      const thisPanel = this.display[i][j];
      if (thisPanel === 1 || thisPanel === 2) {
        alert("ここにはおけないよ！");
        return;
      }

      // 周りに相手の駒があるかどうか
      this.checkAroundAnti(i, j);

      if (this.antiPanels.length === 0) {
        alert("ここにはおけないよ！");
        return;
      }

      // 周りに駒があった場合、その直線上に味方の駒があるかどうか？
      this.myPanels = [];
      this.antiPanels.forEach((antiPanel) => {
        if (
          this.checkStright(antiPanel, antiPanel[0], antiPanel[1], i, j) !==
          undefined
        ) {
          this.myPanels.push(
            this.checkStright(antiPanel, antiPanel[0], antiPanel[1], i, j)
          );
        }
      });

      console.log(this.myPanels);
      if (this.myPanels.length === 0) {
        alert("ここにはおけないよ！");
        return;
      }

      this.display[i][j] = this.nowPlayer;

      this.myPanels.forEach((myPanel) => {
        if (Math.abs(myPanel[0] - i) === 0) {
          const panelDif = Math.abs(myPanel[1] - j);
          for (let h = 1; h < panelDif; h++) {
            this.display[i][
              j + h * (panelDif / (myPanel[1] - j))
            ] = this.nowPlayer;
          }
        }

        if (Math.abs(myPanel[1] - j) === 0) {
          const panelDif = Math.abs(myPanel[0] - i);
          for (let h = 1; h < panelDif; h++) {
            this.display[i + h * (panelDif / (myPanel[0] - i))][
              j
            ] = this.nowPlayer;
          }
        }

        if (Math.abs(myPanel[0] - i) !== 0 && Math.abs(myPanel[1] - j) !== 0) {
          const panelDif = Math.abs(myPanel[0] - i);
          for (let h = 1; h < panelDif; h++) {
            this.display[i + h * (panelDif / (myPanel[0] - i))][
              j + h * (panelDif / (myPanel[0] - i))
            ] = this.nowPlayer;
          }
        }
      });
    },
  },
  computed: {
    display() {
      return this.fields;
    },
  },
};

Vue.createApp(App).mount("#app");
