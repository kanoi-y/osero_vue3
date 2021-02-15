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
    putPanel(i, j) {

      // この場所に駒があるかどうか
      const thisPanel = this.display[i][j];
      if (thisPanel === 1 || thisPanel === 2) {
        alert("ここにはおけないよ！");
        return;
      }

      let antiPanels = [];

      for (let h = -1; h < 2; h++) {
        for (let v = -1; v < 2; v++) {
          if (
            (0 !== this.display[i + h][j + v]) &
            (this.nowPlayer !== this.display[i + h][j + v])
          ) {
            antiPanels.push([h, v]);
          }
        }
      }
      console.log(antiPanels);

      // 周囲に相手の駒があるかどうか
      if (antiPanels.length === 0) {
        alert("ここにはおけないよ！");
        return;
      }

      const CheckStraight = (panel, h, v) => {
          
        if ( this.nowPlayer !== this.display[i + panel[0] + h][j + panel[1] + v]) {
          CheckStraight(panel, panel[0] + h, panel[1] + v);
        }

      }

      antiPanels.forEach(antiPanel => {
       
      });




    },
  },
  computed: {
    display() {
      if (this.putCount === 0) return this.fields;
    },
  },
};

Vue.createApp(App).mount("#app");
