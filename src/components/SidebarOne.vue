<template>
    <div class="sidebar-wrapper">
        <ul>
            <li>
                <img src="../assets/whiteinfo.svg" alt="">
                <p>Test</p>
            </li>
            <li>
                <img src="../assets/whiteinfo.svg" alt="">
                <p>Test</p>
            </li>
            <li>
                <img src="../assets/whiteinfo.svg" alt="">
                <p>Test</p>
            </li>
            <li>
                <img src="../assets/whiteinfo.svg" alt="">
                <p>Test</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SidebarOne",
    }
</script>

<style scoped lang="scss">
    .sidebar-wrapper {
        position: absolute;
        top: 0;
        left: -38px;
        bottom: 0;
        width: 10px;
        z-index: 1;
        background: transparent linear-gradient(171deg, #833EBE 0%, #521D7C 100%) 0% 0% no-repeat;
        transition: 0.3s all ease;
        height: 100%;
        ul {
            padding:12px 0;
            display: none;
            li {
                min-height: fit-content;
                height: fit-content;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                img {
                    width: 30px;
                }
                p {
                    margin-top: 10px;
                    color: #fff;
                    font-size: 25px;
                }
            }
        }

        &:hover {
            width: 100px;
            ul {
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>
