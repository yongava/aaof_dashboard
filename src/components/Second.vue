<template>
    <div class="overview-wrapper">
        <div>
            <ul>
                <li>
                    <p>Test</p>
                    <p class="last">7.654.23</p>
                </li>
                <li>
                    <p>Test</p>
                    <p class="last">7.654.23</p>
                </li>
                <li>
                    <p>Test</p>
                    <p class="last">7.654.23</p>
                </li>
                <li>
                    <p>Test</p>
                    <p class="last">7.654.23</p>
                </li>
            </ul>
        </div>
        <div>
            <Chart></Chart>
        </div>
        <div>
            <Chart></Chart>
        </div>
    </div>
</template>

<script>
    import Chart from "./Chart";
    export default {
        name: "Assets",
        components: {Chart},
    }
</script>

<style scoped lang="scss">
    .overview-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding: 24px;
        > div {
            display: flex;
            flex: 1;
            margin-right: 24px;
            &:last-child {
                margin-right: 0;
            }
        }
        ul {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            width: 100%;
            border-bottom: none !important;
            li {
                display: flex;
                justify-content: space-between !important;
                align-items: center;
                height: 30px !important;
                max-height: 30px !important;
                p {
                    font-size: 17px;
                    &.last {
                        font-size: 19px;
                    }
                }
            }
        }
    }
</style>
