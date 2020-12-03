<script>

	import {Bar} from '../plugins/BaseCharts'

	export default {
		extends: Bar,
		props: ['id', 'dates', 'closes1', 'closes2', 'closes3', 'closes4'],
		mounted() {
			this.renderChart({
				labels: this.dates,
				datasets: [
					{
						label: 'Q1',
						fill: true,
						backgroundColor: '#7e60e3',
						data: this.closes1,
					},
					{
						label: 'Q2',
						fill: true,
						backgroundColor: '#833ebe',
						data: this.closes2,
					},
					{
						label: 'Q3',
						fill: true,
						backgroundColor: '#7072a8',
						data: this.closes3,
					},
					{
						label: 'Q4',
						fill: true,
						backgroundColor: '#e079f8',
						data: this.closes4,
					},
				]
			}, {
				responsive: true,
				maintainAspectRatio: false,
				legend: {position: 'bottom'},
				title: {text: this.id, position: 'top', display: true, fontSize: 16}
			})
		}
	}
</script>

<style scoped lang="scss">
  canvas {
    width: 100% !important;
    max-height: 400px;
  }

  #doughnut-chart {
    height: 100% !important;
    width: 100% !important;
    margin: 24px;
  }
</style>
