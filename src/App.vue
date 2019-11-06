<template>
    <div id="app">
        <!--    <img src="./assets/logo.png">-->
        <!--    <div>-->
        <!--      <p>-->
        <!--        If Element is successfully added to this project, you'll see an-->
        <!--        <code v-text="'<el-button>'"></code>-->
        <!--        below-->
        <!--      </p>-->
        <!--      <el-button>el-button</el-button>-->
        <!--    </div>-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <router-view/>
        <audio id="audio" src="https://wxcdn.kdcer.com/al_syb/bbbrich/music.mp3" autoplay preload loop></audio>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    export default {
        name: 'app',
        // components: {
        //   HelloWorld
        // },
        created() {
            // this.axiosajax("", "config.json").then(res => {//获取配置文件信息
            //     console.log(res)
            // }), err => {
            //     console.log(err)
            // }
        }
    }
</script>

<style>
    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        overflow: hidden;
    }
</style>
