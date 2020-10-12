
<script>

    import { Line } from '../plugins/BaseCharts'

    export default {
        extends: Line,
        mounted () {
            this.renderChart({
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    }
</script>

<style scoped lang="scss">
    canvas {
        height: 100% !important;
        width: 100% !important;
    }
    #doughnut-chart{
        height: 100% !important;
        width: 100% !important;
        margin: 24px;
    }
</style>
