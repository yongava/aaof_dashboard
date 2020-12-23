<template>
    <div class="first-wrapper">
        <div class="upper">
            <div class="column">
                <h2>{{ticker}}</h2>
                <p>{{name}}</p>
                <h4>BKK: <a style="text-decoration: none" target="_blank" :href="webUrl">{{webUrl}}</a></h4>
            </div>
            <div class="column right">
                <h2>{{close}}</h2>
                <div>
                    <span>{{change >= 0 ? '+' + change : change}}</span>
                    <span>{{pct_change}}%</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h2>{{gGroup}}</h2>
            <p>
                {{businessText}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Overview",
        props: ['symbol_name', 'submit_cnt'],
        data() {
            return {
                apiUrl: 'https://notredame.alpha.lab.ai/api/profile',
                businessText: '',
                close: '',
                change: '',
                pct_change: '',
                authorizationToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4OTM0NTYwMDAsInVzZXJuYW1lIjoieW9ydCJ9.GGYlZFvQfYJTT3VU6owQXImwD3tsO9HICMG83sgSPYU",
                ticker: '',
                webUrl: '',
                name: '',
                gGroup: '',
            }
        },
        methods: {
            async loadBusinessData() {
                this.businessText = '';
                try {
                    const additionalData = await this.axios.get(`${this.apiUrl}?symbol=${this.symbol_name}.bk&exchange=bk`, {
                        headers: {Authorization: this.authorizationToken}});
                        if (additionalData && additionalData.data && additionalData.data.data) {
                            this.ticker = additionalData.data.data['ticker'] || '';
                            this.webUrl = additionalData.data.data['weburl'] || '';
                            this.name = additionalData.data.data['name'] || '';
                            this.gGroup = additionalData.data.data['ggroup'] || '';
                        }

                    const businessInfo = await this.axios.get(`https://mka-api.alpha.lab.ai/businessinfo/${this.symbol_name}`);
                    this.businessText = businessInfo.data && businessInfo.data[0] && businessInfo.data[0].BusinessTypeTH;

                    const pricesChange = await this.axios.get(`https://mka-api.alpha.lab.ai/prices/pct_change/${this.symbol_name}`);
                    if (pricesChange && pricesChange.data) {
                        this.close = pricesChange.data.close;
                        this.pct_change = pricesChange.data.pct_change;
                        this.change = pricesChange.data.change;
                    }
                } catch (e) {
                    console.log(e);
                }
            },
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
