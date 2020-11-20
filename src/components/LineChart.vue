
<script>

    import { Line } from '../plugins/BaseCharts'

    export default {
        extends: Line,
        props: ['id', 'dates', 'closes'],
        mounted () {
            this.renderChart({
                labels: this.dates, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: this.id,
                        backgroundColor: '#f87979',
                        data: this.closes, //[40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    }
</script>

<style scoped lang="scss">
    canvas {
        width: 100% !important;
        max-height: 400px;
    }
    #doughnut-chart{
        height: 100% !important;
        width: 100% !important;
        margin: 24px;
    }
</style>
