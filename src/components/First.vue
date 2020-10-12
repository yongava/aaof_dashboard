<template>
    <div class="first-wrapper">
        <div class="upper">
            <div class="column">
                <h2>SIS</h2>
                <p>SiS Distibuton (Thailand) PCL</p>
                <h4>BKK: SIS</h4>
            </div>
            <div class="column right">
                <h2>10.80</h2>
                <div>
                    <span>+12.34</span>
                    <span>68.75%</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h2>Electronic Technology</h2>
            <p>
                ขายส่งคอมพิวเตอร์ ซอฟท์แวร์ อุปกรณ์ต่อพ่วง สมาร์ทโฟน และอุปกรณ์สำนักงานอัตโนมัติต่างๆในประเทศไทยโดย เป็นตัวแทนจำหน่ายให้กับผู้ผลิตชั้นนำระดับโลก เช่น Acer, Brother, Dell, Hewlett Packard Enterprise, HP Inc., Lenovo, Samsung, Vmware, Wiko เป็นต้น
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Overview",
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
