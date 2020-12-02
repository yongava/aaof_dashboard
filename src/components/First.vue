<template>
    <div class="first-wrapper">
        <div class="upper">
            <div class="column">
                <h2>{{symbol_name}}</h2>
                <p>{{symbol_name}} Distibuton (Thailand) PCL</p>
                <h4>BKK: {{symbol_name}}</h4>
            </div>
            <div class="column right">
                <h2>{{latest && latest.close}}</h2>
                <div>
                    <span>{{diff > 0 ? '+' + diff : diff}}</span>
                    <span>{{((diff) / 2 * 100).toFixed(2)}}%</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h2>Electronic Technology</h2>
            <p>
                {{businessText}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Overview",
        props: ['symbol_name', 'submit_cnt', 'latest', 'previous'],
        data() {
            return {
                businessText: '',
            }
        },
        methods: {
            async loadBusinessData() {
                this.businessText = '';
                try {
                    const businessInfo = await this.axios.get(`https://mka-api.alpha.lab.ai/businessinfo/${this.symbol_name}`);
                    this.businessText = businessInfo.data && businessInfo.data[0] && businessInfo.data[0].BusinessTypeTH;
                } catch (e) {
                    console.log(e);
                }
            },
        },
        computed: {
            diff: function () {
                if (this.latest && this.previous) {
                    return this.latest.close - this.previous.close;
                } else {
                    return 0;
                }
            }
        },
        watch: {
            submit_cnt: function () {
                if (this.symbol_name && this.symbol_name.trim() !== '') {
                    this.loadBusinessData();
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .first-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .upper {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            h2 {
                font-family: "kitbold";
                font-size: 40px;
            }
            p {
                font-size: 20px;
                margin: 0;
            }
            h4 {
                font-size: 23px;
                color: #A0A0A0;
                margin: 0;
                margin-bottom: 12px;
            }
            .column {
                h2 {
                    margin: 0;
                }
            }
            .column.right {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                > div {
                    display: flex;
                    justify-content: space-between;
                    h2 {
                        margin-bottom: 24px !important;
                    }
                    span {
                        font-size: 23px;
                        color: #A0A0A0;
                        &:first-child {
                            margin-right: 12px;
                            padding-right: 12px;
                            border-right: 1px solid #ddd;
                        }
                    }
                }
            }
        }

        .bottom {
            h2 {
                color: #833EBE;
                font-size: 25px;
            }
            p {
                font-size: 19px;
            }
        }
    }
</style>
