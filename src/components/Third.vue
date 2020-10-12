<template>
    <div class="overview-wrapper">
        <div class="magnify">
            <img :src="resize" @click="showModal">
        </div>
        <div class="grid-pattern">
            <div>
                <LineChart></LineChart>
            </div>
            <div>
                <LineChart></LineChart>
            </div>
            <div>
                <LineChart></LineChart>
            </div>
        </div>
        <modal name="magnify" height="auto" width="60%">
            <div class="modal-container">
                <Third></Third>
            </div>
        </modal>
    </div>
</template>

<script>
    import LineChart from "./LineChart";
    export default {
        name: "Third",
        components: {LineChart},
        data() {
            return {
                resize: require('@/assets/resize.svg')
            }
        },
        methods: {
            showModal() {
                this.$modal.show('magnify');
                location.hash = '/';
                if(location.hash) {
                    this.$modal.hide('magnify');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .overview-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .magnify {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 24px;
            img {
                cursor: pointer;
            }
        }
        .grid-pattern {
            background: #fff;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-row-gap: 24px;
            grid-column-gap: 24px;
            > div {
            }
        }
    }

    .modal-container {
        padding: 28px;
    }

</style>
