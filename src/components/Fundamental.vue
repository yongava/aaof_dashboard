<template>
  <div class="overview-wrapper">
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
	// import BarChart from "./BarChart";
	import GroupBarChart from "./GroupBarChart";

	export default {
		name: "Commission",
    mounted() {
			if (this.symbol && this.symbol.trim() !== '' && this.submit_cnt !== 0) {
				this.loadChartData();
			}
		},
		components: {
			GroupBarChart,
			// BarChart,
			LineChart,
			TwoLineChart,
		},
		props: ['charts', 'sorted', 'filtered', 'symbol', 'submit_cnt'],
		data: () => ({
			contents: [
				{
					dates: [],
					closes: [],
				},
			]
		}),
		methods: {
			async loadChartData() {
				for (let i = 0; i < this.charts.length; i++) {
					const chart = this.charts[i];
					if (chart.show) {
						if (chart.single) { // if chart is single line
							try {
								const {data} = await this.axios.get(`https://mka-api.alpha.lab.ai/factsheet/AOT/${chart.feature}`);

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
										this.contents[i][`closes${item.Quarter}`].push(item[chart.feature]);
									});

									this.contents[i].dates = [...new Set(this.contents[i].dates)];
                }
							} catch (e) {
								console.log(e);
							}
						} else { // when several lines chart
							this.contents[i] = {
								dates: [],
								closes1: [],
								closes2: [],
							};

							try {
								for (let j = 0; j < chart.features.length; j++) {
									const {data} = await this.axios.get(`https://mka-api.alpha.lab.ai/factsheet/AOT/${chart.features[j]}`);
									data.sort(function (a, b) {
										return (new Date(a.FinanceDate) > new Date(b.FinanceDate)) ? 1 : -1;
									}) && data.map(item => {
										if (j === 0) {
											this.contents[i].dates.push(item.Fiscal + '-' + item.Quarter);
										}
										this.contents[i]['closes' + (j + 1)].push(item[chart.features[j]]);
									});
								}
							} catch (e) {
								console.log(e);
							}
						}
						// re-render chart
						chart.count++;
					}
				}
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
