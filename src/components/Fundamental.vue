<template>
  <div class="overview-wrapper">
    <loader
      v-if="isLoading"
    />
    <div>
      <div class="grid-pattern">
        <div
          class="chart-wrapper"
          v-for="(item, i) in charts"
          :key="i + '-fundamental-wrapper-' + item.count"
          v-show="item.show"
        >
          <LineChart
            :id="item.feature"
            v-show="item.show && item.single && item.style === 'line'"
            :key="i + '-fundamental-line-' + item.count"
            :dates='contents[i] && contents[i].dates'
            :closes="contents[i] && contents[i].closes"
          ></LineChart>

          <GroupBarChart
            :id="item.feature"
            v-show="item.show && item.single && item.style === 'bar'"
            :key="i + '-fundamental-bar-' + item.count"
            :dates='contents[i] && contents[i].dates'
            :closes1="contents[i] && contents[i].closes1"
            :closes2="contents[i] && contents[i].closes2"
            :closes3="contents[i] && contents[i].closes3"
            :closes4="contents[i] && contents[i].closes4"
          ></GroupBarChart>

          <TwoLineChart
            id1="Roa"
            v-show="item.show && !item.single"
            id2="Roe"
            :key="'roa-' + item.count"
            :dates='contents[i] && contents[i].dates'
            :closes1="contents[i] && contents[i].closes1"
            :closes2="contents[i] && contents[i].closes2"
          >
          </TwoLineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from "./LineChart";
  import TwoLineChart from "./TwoLineChart";
  import GroupBarChart from "./GroupBarChart";
  import Loader from "./Loader";

  export default {
    name: "Commission",
    mounted() {
      if (this.symbol && this.symbol.trim() !== '' && this.submit_cnt !== 0) {
        this.loadChartData();
      }
    },
    components: {
      GroupBarChart,
      LineChart,
      TwoLineChart,
      Loader,
    },
    props: ['charts', 'sorted', 'filtered', 'symbol', 'submit_cnt'],
    data: () => ({
      contents: [
        {
          dates: [],
          closes: [],
        },
      ],
      isLoading: false,
    }),
    methods: {
      async loadChartData() {
        this.isLoading = true;

        let apiResponseCnt = 0, apiCallCnt = 0;
        this.charts && this.charts.map((chart, i) => {
          this.contents[i] = null;
          if (chart.show) {
            if (chart.single) { // if chart is single line
              apiCallCnt++;
              this.axios.get(`https://mka-api.alpha.lab.ai/factsheet/${this.symbol}/${chart.feature}`)
                .then(response => {
                    const data = response.data;

                    if (chart.style === 'line') {
                      this.contents[i] = {
                        dates: [],
                        closes: []
                      };

                      data.sort(function (a, b) {
                        return (new Date(a.FinanceDate) > new Date(b.FinanceDate)) ? 1 : -1;
                      }) && data.map(item => {
                        this.contents[i].dates.push(item.Fiscal + '-' + item.Quarter);
                        this.contents[i].closes.push(item[chart.feature]);
                      });
                    } else if (chart.style === 'bar') {
                      this.contents[i] = {
                        dates: [],
                        closes1: [],
                        closes2: [],
                        closes3: [],
                        closes4: [],
                      };

                      data.sort(function (a, b) {
                        return (new Date(a.FinanceDate) > new Date(b.FinanceDate)) ? 1 : -1;
                      }) && data.map(item => {
                        this.contents[i].dates.push(item.Fiscal);
                        this.contents[i].dates = [...new Set(this.contents[i].dates)];

                        // if previous year's quarter data doesn't exist
                        if (this.contents[i][`closes${item.Quarter}`].length < (this.contents[i].dates.length - 1)) {
                          //
                          while (this.contents[i][`closes${item.Quarter}`].length < (this.contents[i].dates.length - 1)) {
                            this.contents[i][`closes${item.Quarter}`].push(0);
                          }
                        }
                        this.contents[i][`closes${item.Quarter}`].push(item[chart.feature]);
                      });
                    }
                  }
                ).catch(error => {
                console.log(error);
              }).finally(() => {
                apiResponseCnt++;
              });
            } else { // when several lines chart
              this.contents[i] = {
                dates: [],
                closes1: [],
                closes2: [],
              };

              for (let j = 0; j < chart.features.length; j++) {
                apiCallCnt++;
                this.axios.get(`https://mka-api.alpha.lab.ai/factsheet/${this.symbol}/${chart.features[j]}`)
                  .then(response => {
                    const data = response.data;
                    data.sort(function (a, b) {
                      return (new Date(a.FinanceDate) > new Date(b.FinanceDate)) ? 1 : -1;
                    }) && data.map(item => {
                      if (j === 0) {
                        this.contents[i].dates.push(item.Fiscal + '-' + item.Quarter);
                      }
                      this.contents[i]['closes' + (j + 1)].push(item[chart.features[j]]);
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  })
                  .finally(() => {
                    apiResponseCnt++;
                  });
              }
            }
          }
        });

        const interval = setInterval(() => {
          if (apiCallCnt === apiResponseCnt) {
            // re-render chart
            this.charts && this.charts.map(entity => entity.count++);
            // hide loading
            this.isLoading = false;
            clearInterval(interval);
          }
        })
      },
    },
    watch: {
      submit_cnt: function () {
        if (this.symbol && this.symbol.trim() !== '') {
          this.loadChartData();
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .overview-wrapper {
    width: 100%;
    height: 100%;

    .grid-pattern {
      background: #fff;
      padding: 24px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-row-gap: 24px;
      grid-column-gap: 24px;

      > div {
        border: 1px solid rgba(131, 62, 190, 0.36);
        padding: 24px;
      }
    }
  }
</style>
