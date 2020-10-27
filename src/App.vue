<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="upper-row">
          <SidebarOne></SidebarOne>
        <div class="wrap">
            <LineChart></LineChart>
        </div>
        <div class="wrap">
            <ul>
                <li v-for="(item, index) in navigation" :key="index" @click="currentComponent = item.component" :class="[ currentComponent === item.component ? 'active' : '' ]">
                    <img :src="currentComponent === item.component ? item.imgw : item.img" alt="">{{ item.name }}
                </li>
            </ul>
            <div class="content">
                <Component :is="currentComponent"></Component>
            </div>
        </div>
      </div>
      <div class="content-wrapper">
          <SidebarOne></SidebarOne>
        <div>
            <div class="navigation-button">
                <ul class="bottom">
                    <li v-for="(item, index) in secondNav" :key="index" @click="currentComponentNav = item.component" :class="[ currentComponentNav === item.component ? 'active' : '' ]">
                        <img :src="item.img" alt="">{{ item.name }}
                    </li>
                </ul>
                <button @click="$modal.show('config'); configArr = []; sorted = false;" class="config">Config</button>
            </div>
            <div class="content">
                <Component :is="currentComponentNav" :charts="charts"></Component>
            </div>
            <modal name="config" height="65%">
                <h2 class="modal-h2">Select Charts</h2>
                <ul class="modal-ul">
                    <li v-for="item in charts" :id="item.id" :key="item.id">
                        <label for="item"></label>
                        <input type="checkbox" :name="item.id" v-model="item.show">
                        Chart with id: {{item.id}}
                    </li>
                </ul>
                <button @click="selectAll">Select all</button>
                <button @click="clearAll">Clear all</button>
            </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import First from "./components/First";
import Second from "./components/Second";
import Third from "./components/Third";
import Fundamental from "./components/Fundamental";
import Income from "./components/Income";
import Cashflow from "./components/Cashflow";

import LineChart from "./components/LineChart";
import SidebarOne from "./components/SidebarOne";
export default {
  name: 'App',
  components: {
      SidebarOne,
        LineChart,
        First,
        Second,
        Third,
        Fundamental,
        Income,
        Cashflow
  },
  data() {
    return {
        sorted: false,
        currentComponent: 'First',
        currentComponentNav: 'Fundamental',
        configArr: [],
        navigation: [
        {
          name: 'First',
          component: 'First',
            img: require('@/assets/info.svg'),
            imgw: require('@/assets/whitei.svg'),
            //img: '../assets/info.svg'
        },
        {
          name: 'Second',
          component: 'Second',
            img: require('@/assets/stat.svg'),
            imgw: require('@/assets/whiitestats.svg')

        },
        {
          name: 'Third',
          component: 'Third',
            img: require("@/assets/whiteanalytics.svg"),
            imgw: require("@/assets/whiteanalytics.svg")
        },
        ],
        secondNav: [
            {
                name: 'Fundamental',
                component: 'Fundamental',
                img: require('@/assets/whiteinfo.svg'),
                //img: '../assets/info.svg'
            },
            {
                name: 'Income Statement',
                component: 'Income',
                img: require('@/assets/whiteinfo.svg')

            },
            {
                name: 'Cashflow',
                component: 'Cashflow',
                img: require("@/assets/whiteinfo.svg")
            },
        ],
        charts: [
            {
                id: 1,
                show: true
            },
            {
                id: 2,
                show: true
            },
            {
                id: 3,
                show: true
            },
            {
                id: 4,
                show: true
            },
            {
                id: 5,
                show: true
            },
            {
                id: 6,
                show: true
            },
            {
                id: 7,
                show: true
            },
            {
                id: 8,
                show: true
            },
            {
                id: 9,
                show: true
            },

        ]
    }
  },
    methods: {
      setChartVisibility(flag) {
          this.charts.forEach((item) => {
              item.show = flag
          })
      },
      selectAll() {
          this.setChartVisibility(true)
      },
        clearAll() {
            this.setChartVisibility(false)
        }
    }
}
</script>

<style lang="scss">
@font-face {
font-family: "kit";
src: local("kit"),
url(./assets/fonts/kit35f.ttf) format("truetype");
}

@font-face {
font-family: "kitbold";
src: local("kit"),
url(./assets/fonts/kitbold.ttf) format("truetype");
}

body, html {
padding: 0;
margin: 0;
}
#app {
width: 100%;
height: fit-content;
margin: 0;
overflow: hidden;
font-family: "kit";
font-weight: bold;
background: #F1EFF8;
min-height: 100vh;
}
.main-wrapper {
padding: 28px;
padding-left: 38px;
height: fit-content;
.upper-row {
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;height: 400px;
position: relative;
.wrap {
display: flex;
box-shadow: 0px 3px 6px #00000029;
background: #fff;
width: 100%;
height: 100%;
min-height: 400px;
&:first-child {
margin-right: 14px;
}
&:last-child {
margin-left: 14px;
display: flex;
flex-direction: column;
ul {
display: flex;
width: 100%;
padding: 0;
margin: 0;
border-bottom: 1px solid #00000029;
li {
display: flex;
height: 56px;
flex: 1;
align-items: center;
justify-content: center;
font-size: 24px;
cursor: pointer;
img {
color: red;
margin-right: 12px;
}

&.active {
background: #521D7C !important;
color: #fff;
img {
color: #fff;
}
}
}
}
.content {
padding: 28px;
display: flex;
align-items: center;
}
}
}
}
.content-wrapper {
margin-top: 28px;
height: 100%;
background: #fff;
position: relative;
ul.bottom {
display: flex;
width: 100%;
padding: 0;
margin: 0;
border-bottom: 1px solid #00000029;
background: #8044B5;
max-width: 60%;
li {
display: flex;
height: 56px;
flex: 1;
align-items: center;
justify-content: center;
font-size: 24px;
cursor: pointer;
color: #fff;
img {
color: red;
margin-right: 12px;
}

&.active {
background: #521D7C !important;
color: #fff;
img {
color: #fff;
}
}
}
}

}
}

::-webkit-scrollbar {
display: none;
}
    .navigation-button {
        display: flex;
        justify-content: space-between;
    }

    .config {
        background: #8044B5;
        border-radius: 8px;
        width: fit-content;
        padding: 0 24px;
        color: #fff;
        display: flex;
        align-items: center;
        jusitfy-content: center;
        border: none;
        height: 40px;
        margin-top: 8px;
        margin-right: 8px;
    }

    .modal-ul {
        display: flex;
        padding: 0;
        flex-direction: column;
        list-style: none;
        li {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            font-size: 22px;
            padding: 10px 0;
            input {
                margin-right: 25px;
                height: 15px;
                width: 15px;
            }
        }
    }
    .modal-h2 {
        margin: 0;
        padding: 0;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #dcdcdc;
        font-size: 26px;
        font-family: 'kitbold';
    }
    .vm--modal {
        /*height: fit-content !important;*/
        padding: 32px;
        button {
            margin-right: 16px;
            height: 40px;
            border-radius: 8px;
            padding: 0 12px;
            font-size: 14px;
            background: #dcdcdc;
            border: none;
        }
    }
</style>
