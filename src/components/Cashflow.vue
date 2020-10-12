<template>
    <div class="overview-wrapper">
        <div class="grid-pattern">
            <div>
                <LineChart></LineChart>
            </div>
            <div>
                <LineChart></LineChart>
            </div>
        </div>
    </div>
</template>

<script>
    import LineChart from "./LineChart";
    export default {
        name: "Cashflow",
        components: {LineChart},
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
