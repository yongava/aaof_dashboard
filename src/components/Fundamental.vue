<template>
    <div class="overview-wrapper">
       <div>
           <div class="grid-pattern">
               <LineChart :id="item.id" v-for="(item, i) in charts" v-show="item.show" :key="i"></LineChart>
           </div>
       </div>
    </div>
</template>

<script>
    import LineChart from "./LineChart";
    export default {
        name: "Commission",
        components: {LineChart},
        props: ['charts', 'sorted', 'filtered'],

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
