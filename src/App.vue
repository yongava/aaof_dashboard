<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="row symbol-div">
        <input
          type="input"
          class="symbol-input"
          :name="symbol_name"
          v-model="symbol_name"
          v-on:keyup.enter="onEnter"
        />
        <button @click="get_data_graph" class="submit">submit</button>
      </div>
      <div class="upper-row">
        <!--<SidebarOne></SidebarOne>-->
        <div class="wrap">
          <!--<apexchart :key="chartComponentKey" width="100%" height="400px" type="candlestick" :options="options" :series="series"></apexchart>-->
          <LineChart
            id="Price"
            :key="chartComponentKey"
            :dates="lineChart_dates"
            :closes="lineChart_closes"
            :rotation="0"
          ></LineChart>
        </div>
        <div class="wrap">
          <ul>
            <li
              v-for="(item, index) in navigation"
              :key="index"
              @click="currentComponent = item.component"
              :class="[currentComponent === item.component ? 'active' : '']"
            >
              <img
                :src="
                  currentComponent === item.component ? item.imgw : item.img
                "
                alt=""
              />{{ item.name }}
            </li>
          </ul>
          <div class="content">
            <Component
              :is="currentComponent"
              :submit_cnt="submit_cnt"
              :symbol_name="symbol_name"
            ></Component>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <!--<SidebarOne></SidebarOne>-->
        <div>
          <div class="navigation-button">
            <ul class="bottom">
              <li
                v-for="(item, index) in secondNav"
                :key="index"
                @click="currentComponentNav = item.component"
                :class="[
                  currentComponentNav === item.component ? 'active' : '',
                ]"
              >
                <img :src="item.img" alt=""/>{{ item.name }}
              </li>
            </ul>
            <button
              @click="
                $modal.show('config');
                configArr = [];
                sorted = false;
              "
              class="config"
            >
              Config
            </button>
          </div>
          <div class="content">
            <Component
              :is="currentComponentNav"
              :charts="charts[currentComponentNav]"
              :submit_cnt="submit_cnt"
              :symbol="symbol_name"
            ></Component>
          </div>
          <modal name="config" height="65%">
            <h2 class="modal-h2">Select Charts</h2>
            <ul class="modal-ul">
              <li v-for="item in charts[currentComponentNav]" :id="item.id" :key="item.id">
                <label></label>
                <input type="checkbox" :name="item.id" v-model="item.show"/>
                Chart with id: {{ item.feature }}
              </li>
            </ul>
            <button @click="selectAll">Select all</button>
            <button @click="clearAll">Clear all</button>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import First from "./components/First";
	import Second from "./components/Second";
	import Third from "./components/Third";
	import Fundamental from "./components/Fundamental";
	import Balance from "./components/Balance";
	import Income from "./components/Income";
	import Cashflow from "./components/Cashflow";

	import LineChart from "./components/LineChart";
	import SidebarOne from "./components/SidebarOne";

	export default {
		name: "App",
		components: {
			SidebarOne,
			LineChart,
			First,
			Second,
			Third,
			Fundamental,
      Balance,
			Income,
			Cashflow,
		},
		mounted() {
			this.getData('AOT');
		},
		data() {
			return {
				latest: null,
				previous: null,
				options: {
					candlestick: {
						colors: {
							upward: '#3C90EB',
							downward: '#DF7D46'
						}
					},
					chart: {
						toolbar: {
							show: false,
						},
						zoom: {
							enabled: false,
						}
					},
				},
				series: [{
					data: []
				}],
				sorted: false,
				currentComponent: "First",
				currentComponentNav: "Fundamental",
				configArr: [],
				navigation: [
					{
						name: "Information",
						component: "First",
						img: require("@/assets/info.svg"),
						imgw: require("@/assets/whitei.svg"),
						//img: '../assets/info.svg'
					},
					/*{
						name: "Second",
						component: "Second",
						img: require("@/assets/stat.svg"),
						imgw: require("@/assets/whiitestats.svg"),
					},
					{
						name: "Third",
						component: "Third",
						img: require("@/assets/whiteanalytics.svg"),
						imgw: require("@/assets/whiteanalytics.svg"),
					},*/
				],
				secondNav: [
					{
						name: "Fundamental",
						component: "Fundamental",
						img: require("@/assets/whiteinfo.svg"),
						//img: '../assets/info.svg'
					},
					{
						name: "Balance",
						component: "Balance",
						img: require("@/assets/whiteinfo.svg"),
						//img: '../assets/info.svg'
					},
					{
						name: "Income Statement",
						component: "Income",
						img: require("@/assets/whiteinfo.svg"),
					},
					{
						name: "Cashflow",
						component: "Cashflow",
						img: require("@/assets/whiteinfo.svg"),
					},
				],
				charts: {
					Fundamental: [
						{
							id: 1,
							show: true,
							feature: 'Eps',
							single: true, // when chart is single line
							count: 0, // to render separate,
							style: 'bar',
						},
						{
							id: 2,
							show: true,
							feature: 'Roa',
							single: true,
							count: 0,
							style: 'bar'
						},
						{
							id: 3,
							show: true,
							feature: 'Roe',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 4,
							show: true,
							feature: 'NetProfitMargin',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 5,
							show: true,
							feature: 'PE',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 6,
							show: true,
							feature: 'BVPS',
							single: true,
							count: 0,
							style: 'line',
						},
						{
							id: 7,
							show: true,
							feature: 'PBV',
							single: true,
							count: 0,
							style: 'line',
						},
						{
							id: 8,
							show: true,
							feature: 'Yield',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 9,
							show: true,
							feature: 'De',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 10,
							show: true,
							feature: 'DPS',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 11,
							show: true,
							feature: 'AvgCollectionPeriod',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 12,
							show: true,
							feature: 'AvgInventoriesPeriod',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 13,
							show: true,
							feature: 'AvgPaymentPeriod',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 14,
							show: true,
							feature: 'GrossPFMargin',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 15,
							show: true,
							feature: 'EBITMargin',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 16,
							show: true,
							feature: 'SGAGrossPF',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 17,
							show: true,
							feature: 'DAGrossPF',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 18,
							show: true,
							feature: 'InterestRevenue',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 19,
							show: true,
							feature: 'CurrentRatio',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 20,
							show: true,
							feature: 'CapexNetProfit',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 21,
							show: true,
							feature: 'EVPerEBITDA',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 22,
							show: true,
							feature: 'ListShare',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 23,
							show: true,
							feature: 'OCFCapex',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 24,
							show: true,
							feature: 'MarketCapPerOCF',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 25,
							show: true,
							feature: 'RevenueGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 26,
							show: true,
							feature: 'COGSGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 27,
							show: true,
							feature: 'GrossPFGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 28,
							show: true,
							feature: 'SGAGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 29,
							show: true,
							feature: 'OperatingPFGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 30,
							show: true,
							feature: 'EBITGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 31,
							show: true,
							feature: 'DAGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 32,
							show: true,
							feature: 'EBITDAGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 33,
							show: true,
							feature: 'InterestGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 34,
							show: true,
							feature: 'TaxGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 35,
							show: true,
							feature: 'NetProfitGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 36,
							show: true,
							feature: 'EpsGrowth',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 37,
							show: true,
							feature: 'CashCycle',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 38,
							show: true,
							feature: 'PayOutRatio',
							single: true,
							count: 0,
							style: 'bar',
						},
						/*{
							id: 10,
							show: true,
							feature: 'Roa-Roe',
							features: [
								'Roa',
								'Roe'
							],
							single: false,
							count: 0,
							style: 'line',
						}*/
					],
          Balance: [
						{
							id: 1,
							show: true,
							feature: 'Assets',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 2,
							show: true,
							feature: 'Liabilities',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 3,
							show: true,
							feature: 'Equity',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 4,
							show: true,
							feature: 'MarketCap',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 5,
							show: true,
							feature: 'CurrentLiabilities',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 6,
							show: true,
							feature: 'CurrentAsset',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 7,
							show: true,
							feature: 'CurrentLiabilities',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 8,
							show: true,
							feature: 'Cash',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 9,
							show: true,
							feature: 'Inventories',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 10,
							show: true,
							feature: 'AccountsPayable',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 11,
							show: true,
							feature: 'NonCurrentLiabilities',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 12,
							show: true,
							feature: 'TotalEquities',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 13,
							show: true,
							feature: 'AuthorizedCapital',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 14,
							show: true,
							feature: 'RetainedEarning',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 15,
							show: true,
							feature: 'PPE',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 16,
							show: true,
							feature: 'EV',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 17,
							show: true,
							feature: 'SGA',
							single: true,
							count: 0,
							style: 'bar',
						}
          ],
          Income: [
						{
							id: 1,
							show: true,
							feature: 'Revenue',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 2,
							show: true,
							feature: 'NetProfit',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 3,
							show: true,
							feature: 'ShortTermInvestment',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 4,
							show: true,
							feature: 'Expense',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 5,
							show: true,
							feature: 'SG',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 6,
							show: true,
							feature: 'Capex',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 7,
							show: true,
							feature: 'GrossPF',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 8,
							show: true,
							feature: 'EBIT',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 9,
							show: true,
							feature: 'COGS',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 10,
							show: true,
							feature: 'OtherIncome',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 11,
							show: true,
							feature: 'EBITDA',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 12,
							show: true,
							feature: 'EBT',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 13,
							show: true,
							feature: 'InterestCoverage',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 14,
							show: true,
							feature: 'RevenuesFromSale',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 15,
							show: true,
							feature: 'Sale',
							single: true,
							count: 0,
							style: 'bar',
						}
          ],
          Cashflow: [
						{
							id: 1,
							show: true,
							feature: 'Operating',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 2,
							show: true,
							feature: 'Financing',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 3,
							show: true,
							feature: 'Investing',
							single: true,
							count: 0,
							style: 'bar',
						},
						{
							id: 4,
							show: true,
							feature: 'NetCashFlow',
							single: true,
							count: 0,
							style: 'bar',
						}
          ]
				},
				symbol_name: 'AOT',
				lineChart_dates: [],
				lineChart_closes: [],
				chartComponentKey: 0,
				submit_cnt: 0,
			};
		},
		methods: {
			setChartVisibility(flag) {
				this.charts[this.currentComponentNav].forEach((item) => {
					item.show = flag;
				});
			},
			selectAll() {
				this.setChartVisibility(true);
			},
			clearAll() {
				this.setChartVisibility(false);
			},
			async getData(symbol_name) {
				this.submit_cnt++;

				const {data} = await this.axios.get(`https://alpha.southeastasia.cloudapp.azure.com/prices/${symbol_name}`);

				//Plot Line chart x=date, y=close

				this.lineChart_dates = []
				this.lineChart_closes = []
				this.series[0].data = [];
				let index;
				let t = data.data.length / 50;
				let step = ~~t;
				for (index = 0; index < data.data.length; index += step) {//

					const el = data.data[index];
					this.lineChart_dates.push(el.date);
					this.lineChart_closes.push(el.close);

					this.series[0].data.push({
						x: el.date,
						y: [
							el.open,
							el.high,
							el.low,
							el.close,
						]
					});

				}
				if (Math.abs(t - step) > 0.0001) {

					this.lineChart_dates.push(data.data[data.data.length - 1].date);
					this.lineChart_closes.push(data.data[data.data.length - 1].close);

					this.series[0].data.push({
						x: data.data[data.data.length - 1].date,
						y: [
							data.data[data.data.length - 1].open,
							data.data[data.data.length - 1].high,
							data.data[data.data.length - 1].low,
							data.data[data.data.length - 1].close,
						]
					});
				}
				this.chartComponentKey++;
			},
			get_data_graph() {
				this.getData(this.symbol_name);
			},
			onEnter: function () {
				this.getData(this.symbol_name);
			}
		},
	};
</script>

<style lang="scss">
  @font-face {
    font-family: "kit";
    src: local("kit"), url(./assets/fonts/kit35f.ttf) format("truetype");
  }

  @font-face {
    font-family: "kitbold";
    src: local("kit"), url(./assets/fonts/kitbold.ttf) format("truetype");
  }

  body,
  html {
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100%;
    height: fit-content;
    margin: 0;
    overflow-x: scroll !important;
    font-family: "kit";
    font-weight: bold;
    background: #f1eff8;
    min-height: 100vh;
  }

  .main-wrapper {
    min-width: 1500px;
    padding: 28px;
    padding-left: 38px;
    height: fit-content;

    .upper-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 400px;
      position: relative;

      .wrap {
        /*display: flex;*/
        box-shadow: 0px 3px 6px #00000029;
        background: #fff;
        width: 100%;
        height: 100%;
        min-height: 400px;

        &:first-child {
          margin-right: 14px;
        }

        &:last-child {
          margin-left: 14px;
          display: flex;
          flex-direction: column;

          ul {
            display: flex;
            width: 100%;
            padding: 0;
            margin: 0;
            border-bottom: 1px solid #00000029;

            li {
              display: flex;
              height: 56px;
              flex: 1;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              cursor: pointer;

              img {
                color: red;
                margin-right: 12px;
              }

              &.active {
                background: #521d7c !important;
                color: #fff;

                img {
                  color: #fff;
                }
              }
            }
          }

          .content {
            padding: 28px;
            display: flex;
            align-items: center;
          }
        }
      }
    }

    .content-wrapper {
      margin-top: 28px;
      height: 100%;
      background: #fff;
      position: relative;

      ul.bottom {
        display: flex;
        width: 100%;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #00000029;
        background: #8044b5;
        max-width: 60%;

        li {
          display: flex;
          height: 56px;
          flex: 1;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          color: #fff;

          img {
            color: red;
            margin-right: 12px;
          }

          &.active {
            background: #521d7c !important;
            color: #fff;

            img {
              color: #fff;
            }
          }
        }
      }
    }
  }

  ::-webkit-scrollbar {
    /*display: none;*/
  }

  .navigation-button {
    display: flex;
    justify-content: space-between;
  }

  .config {
    background: #8044b5;
    border-radius: 8px;
    width: fit-content;
    padding: 0 24px;
    color: #fff;
    display: flex;
    align-items: center;
    jusitfy-content: center;
    border: none;
    height: 40px;
    margin-top: 8px;
    margin-right: 8px;
  }

  .modal-ul {
    display: flex;
    padding: 0;
    flex-direction: column;
    list-style: none;
    height: 530px;
    overflow: scroll;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      font-size: 22px;
      padding: 10px 0;

      input {
        margin-right: 25px;
        height: 15px;
        width: 15px;
      }
    }
  }

  .modal-h2 {
    margin: 0;
    padding: 0;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #dcdcdc;
    font-size: 26px;
    font-family: "kitbold";
  }

  .vm--modal {
    /*height: fit-content !important;*/
    padding: 32px;

    button {
      margin-right: 16px;
      height: 40px;
      border-radius: 8px;
      padding: 0 12px;
      font-size: 14px;
      background: #dcdcdc;
      border: none;
    }
  }

  .symbol-div {
    margin-bottom: 10px;
    display: flex;
  }

  .symbol-input {
    font-size: 20px;
  }

  .submit {
    background: #8044b5;
    border-radius: 8px;
    width: fit-content;
    padding: 0 12px;
    color: #fff;
    align-items: center;
    jusitfy-content: center;
    border: none;
    height: 40px;
    margin-left: 5px;
  }
</style>
