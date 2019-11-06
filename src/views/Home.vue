<template>
    <div class="home">
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div class="bj" v-show="openbj">
            <div v-show="loading" class="loading"></div>
            <div class="bj_top"></div>
            <div class="bj_bottom"></div>
            <div class="bj_button" @click="open"></div>
        </div>
        <div class="loadingbj" v-show="loading">
            <div class="loading"></div>
        </div>
        <div class="gamebj">
            <div class="move" id="move"
                 :style="'background: url('+ yybj +') no-repeat center;'"></div>
            <div :class="click?'clickok':'clickno'" @click="getnum(0)"></div>
            <div class="jinrong"></div>
            <div class="text">今日剩余:{{surplus}}次</div>
            <div class="mygift" @click="myPrize"></div>
            <div class="sharefriend" @click="openfriend_out"></div>
            <div class="gifs_one"></div>
            <div class="gifs_two"></div>
            <div class="gifs_three"></div>
            <div class="gifs_four"></div>
            <div class="gifs_five"></div>
            <div class="gifs_six"></div>
        </div>
        <div class="rule" @click="openrule"></div>
        <div id="Contrast"></div>
        <!--        提示前进步数-->
        <div class="Tips" v-show="Tips">
            <div class="Tips_dice"
                 :style="'background: url(https://wxcdn.kdcer.com/al_syb/bbbrich/num'+ num +'.gif) no-repeat center;'"></div>
            前进{{num}}步
        </div>
        <!--        活动规则弹窗-->
        <div class="ruleimg" v-show="ruleimg">
            <div class="ruleimg_img">
                <div class="ruleimg_wenben">
                    <div class="ruleimg_text" v-for="(item,index) in rule">{{item}}</div>
                </div>
                <div class="ruleimg_button" @click="closepop"></div>
            </div>
        </div>
        <!--        分享好友弹窗（有阴影）-->
        <div class="ruleimg" v-show="friend" @click="closepop">
            <div class="friend_img">
                <div class="jiantou"></div>
            </div>
        </div>
        <!--        次数不足弹窗-->
        <div class="ruleimg" v-show="nonum">
            <div class="nonum_img" v-show="!QRcode">
                <div v-show="goshare" class="nogoshare"></div>
                <div v-show="!goshare" class="goshare" @click="openfriend"></div>
                <div v-show="goguanzhu" class="nogoguanzhu"></div>
                <div v-show="!goguanzhu" class="goguanzhu" @click="openQRcode"></div>
                <div class="text">关注公众号仅可完成一次哦！</div>
                <div class="nonum_button" @click="closepoponly"></div>
            </div>
        </div>
        <!--        二维码弹窗-->
        <div class="ruleimgno2" v-show="QRcode">
            <div class="QRcode_bj">
                <div class="QRcode">
                    <img src="../assets/img/qrcore.png" alt="">
                </div>
                <div class="QRcode_guanzhu">长按识别关注公众号回复“我是大富翁”　即可获赠一次掷骰机会</div>
                <div class="nonum_button" @click="closepopqr"></div>
            </div>
        </div>
        <!--        分享好友弹窗（无阴影）-->
        <div class="ruleimg" v-show="friend_out" @click="closepop">
            <div class="friend_img">
                <div class="jiantou"></div>
            </div>
        </div>
        <!--        抵达logo处的弹窗-->
        <div :class="ruleimgno?'ruleimg':'ruleimgno'" v-show="No_prize_logo" @click="closepop">
            <div class="prize_img">
                <img :src="prizebj" alt="">
            </div>
        </div>
        <!--        抵达logo处的弹窗(特殊)-->
        <div :class="ruleimgno?'ruleimg':'ruleimgno'" v-show="No_prize_logo_ts" @click="closepop">
            <div class="prize_img_ts">
                <div class="text">
                    BE-KIND是全美潮人新宠，为善待自己、满足味蕾而生。美味轻卡元气满满，随食充能pick超模同款！小小的坚果棒在戛纳众星追捧，吸睛值Max，粒粒饱满的优质见过，浓郁的巧克力，新鲜的水果，每一根BE-KIND坚果棒，都是严选的美味。
                    高颜值透明时尚的小巧包装，可以握着吃不粘手的坚果棒解决生活中紧急时刻充电需求。BE-KIND缤善坚果棒拥有足够理由成为时尚健康生活方式的心仪之选， 满足你对零食的全部想象！
                </div>
                <div class="ts_button"></div>
            </div>
        </div>
        <!--        未中奖弹窗-->
        <div :class="ruleimgno?'ruleimg':'ruleimgno'" v-show="No_prize" @click="closepop">
            <div class="prize_img">
                <img :src="prizebjnogitfs" alt="">
            </div>
        </div>
        <!--        中奖弹窗-->
        <div class="ruleimg" v-show="prize">
            <div class="prizeyes_img">
                <div :class="card_name.length>13?'card_namelong':'card_name'">{{card_name}}</div>
                <div class="time">兑奖时间：{{card_time}}</div>
                <div class="address">兑奖地点：{{card_address}}</div>
                <div class="prize_button" @click="closepop"></div>
            </div>
        </div>
        <!--        我的奖品页-->
        <div class="myprize" v-show="myprize">
            <div class="no" v-show="nocard==0"></div>
            <div class="card" v-show="nocard==1" @click="openMyPrize">
                <div :class="card_name.length>13?'card_namelong':'card_name'">{{card_name}}</div>
                <div class="time">兑奖时间：{{card_time}}</div>
                <div class="address">兑奖地点：{{card_address}}</div>
            </div>
            <div class="lable" v-show="nocard==1">
                点击奖券即可进行核销
            </div>
            <div class="cardhx" v-show="nocard==2">
                <div :class="card_name.length>13?'card_namelong':'card_name'">{{card_name}}</div>
                <div class="time">兑奖时间：{{card_time}}</div>
                <div class="address">兑奖地点：{{card_address}}</div>
                <div class="hx"></div>
            </div>
            <div class="lable" v-show="nocard==2">
                点击奖券即可进行核销
            </div>
            <div class="back" @click="closepop"></div>
        </div>
        <!--        核销弹窗-->
        <div class="ruleimg" v-show="hxpop">
            <div class="close" @click="hxpop=false"></div>
            <div class="hx_img">
                <input v-model="code" type="number" pattern="[0-9]*" oninput="value=value.replace(/[^\d]/g,'')"
                       placeholder="输入核销码进行核销" v-on:blur="onInputBlur">
                <div class="text">请工作人员为您输入核销码进行核销</div>
                <div class="hx_button" @click="checkMyPrize"></div>
            </div>
        </div>
        <!--        核销失败-->
        <div class="ruleimg" v-show="hxpoplose">
            <div class="close" @click="hxpoplose=false"></div>
            <div class="hxlose_img">
                <div class="ex"></div>
                <div class="text">请输入正确的核销码</div>
                <div class="hxlose_button" @click="checkagain"></div>
            </div>
        </div>
        <!--        核销成功-->
        <div class="ruleimg" v-show="hxpopok">
            <div class="close" @click="hxpopok=false"></div>
            <div class="hxok_img">
                <div class="ex"></div>
                <div class="text">恭喜您成功核销奖品</div>
                <div class="hxok_button" @click="hxpopok=false"></div>
            </div>
        </div>
        <!--        抵达终点-->
        <div class="ruleimg" v-show="endpop">
            <div class="End_img">
                <div class="End_button" @click="getback"></div>
            </div>
        </div>
        <!--        <audio id="audio" loop preload autoplay src="https://wxcdn.kdcer.com/al_syb/bbbrich/music.mp3"></audio>-->

    </div>
</template>

<script>
    import "../assets/less/home.less"
    import $ from 'jquery'
    // eslint-disable-next-line no-unused-vars
    import axios from 'axios';
    import config from '../config.js';
    import common from '../common.js';
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        // components: {
        //   HelloWorld
        // }
        data() {
            return {
                uid: "",
                surplus: null,
                yybj: require('../assets/img/zhy.gif'),
                loading: true,
                openbj: true,
                click: true,
                moveW: null,//移动物体的宽
                moveH: null,//移动物体的高
                moveTop: null,//移动初始物体的Y
                moveLeft: null,//移动初始物体的X
                num: null,//筛子的点数
                direction_right: [13, 14, 15, 16, 24, 25, 26],//方向改为向右节点
                direction_down: [1, 6, 7, 8, 9, 10, 11, 12],//方向改为向下节点
                direction_left: [2, 3, 4, 5, 19, 20],//方向改为向左节点
                direction_up: [17, 18, 21, 22, 23],//方向改为向上节点
                directional: null,//0：向右，1：向下，2：向左，3：向上
                lattice_count: 26,//格子总数
                current: 1,//当前所在格子
                target: 1,//目标所在格子
                sum: null,//zonghe
                Tips: false,//提示前进步数
                ruleimg: false,//活动规则弹窗
                rule: [
                    "1、活动时间，2019年11月6日至11月10日；",
                    "2、每位玩家每天3次掷骰机会；",
                    "3、每天玩家在微信分享1次，额外获赠1次掷骰机会；",
                    "4、玩家关注第一八佰伴公众号，额外获赠1次掷骰机会；",
                    "5、活动期间，每位玩家限中奖1次；",
                    "6、中奖后，请获奖玩家在指定时间内（逾期作废），凭本人手机内的获奖信息，前往指定地点兑换奖品。"
                ],//活动规则
                friend: false,//提示分享好友
                friend_out: false,//提示分享好友
                nonum: false,//次数不足弹窗
                goshare: null,//是否分享过状态
                goguanzhu: null,//是否关注过状态
                QRcode: false,//关注二维码弹窗
                animeFlag: false,
                No_prize_logo: false,//未中奖弹窗
                No_prize_logo_ts: false,//未中奖弹窗(特殊)
                prizebj: "",
                prizebjnogitfs: "",//未中奖图片
                information: null,
                ruleimgno: false,//logo介绍弹窗是否可以关闭
                No_prize: false,//未中奖弹窗
                prize: false,//中奖弹窗
                myprize: false,//我的奖品页面
                nocard: 1,//是否有奖品
                card_name: "",//奖品名称
                card_time: "",//兑奖时间
                card_address: "",//兑奖地点
                hxpop: false,//核销弹窗
                code: "",//核销码
                hxpoplose: false,//核销失败
                hxpopok: false,//核销成功
                endpop: false,//到达终点
                tsnum: null,
            }
        },
        created() {
            this.uid = this.GetUrlParam("uid");
            // directional_node_right:[0],
            //     directional_node_left:[0],
            //     directional_node_down:[0],//方向改为向下节点
            this.init(this.uid)
        },
        mounted() {
            common.wxConfig(config.share, () => {
                axios.get(`https://c.kdcer.com/dfw/share?share=${this.uid}`)
                    .then(response => {
                        this.init2(this.uid);
                    })
            });
            this.moveW = document.getElementById("Contrast").offsetWidth;
            this.moveH = document.getElementById("Contrast").offsetHeight;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        methods: {
            onInputBlur() {
                window.scrollTo(0, 0);
            },
            getback() {
                window.location.href = "https://c.kdcer.com/dfw/index"
            },
            closepoponly() {
                this.nonum = false;
                this.click = true;
            },
            closepopqr() {
                this.QRcode = false;
            },
            closepop() {
                this.ruleimg = false;
                this.friend = false;
                this.friend_out = false;
                this.No_prize_logo = false;
                this.No_prize = false;
                this.prize = false;
                this.myprize = false;
                this.hxpop = false;
                this.No_prize_logo_ts = false;
                this.click = true;
            },
            checkagain() {
                this.hxpop = true;
                this.hxpoplose = false
            },
            async checkMyPrize() {
                // 这里用try catch包裹，请求失败的时候就执行catch里的
                try {
                    let params = {
                        uid: this.uid,
                        code: this.code
                    };
                    let res = await this.$api.matches.checkMyPrize(params);
                    if (res.retCode == 200) {
                        this.hxpop = false;
                        this.hxpopok = true;
                        this.nocard = 2;
                    } else {
                        this.hxpop = false;
                        this.hxpoplose = true;
                    }

                } catch (e) {
                    console.log('​catch -> e', e)
                }
            },
            openMyPrize() {
                this.hxpop = true
            },
            async myPrize() {
                // 这里用try catch包裹，请求失败的时候就执行catch里的
                try {
                    let params = {
                        uid: this.uid
                    };
                    let res = await this.$api.matches.apiprize(params);
                    this.myprize = true;
                    if (res.retBody.id != "") {
                        if (res.retBody.takeFlag == 1) {
                            this.nocard = 2;
                            this.card_name = res.retBody.name;
                            this.card_time = res.retBody.tickTime;
                            this.card_address = res.retBody.address;
                        } else {
                            this.nocard = 1;
                            this.card_name = res.retBody.name;
                            this.card_time = res.retBody.tickTime;
                            this.card_address = res.retBody.address;
                        }
                        console.log(res.retBody.name.length)
                    } else {
                        this.nocard = 0;
                    }

                } catch (e) {
                    console.log('​catch -> e', e)
                }
            },
            openQRcode() {
                // console.log(1)
                this.QRcode = true
            },
            openfriend() {
                this.friend_out = true;
            },
            openfriend_out() {
                this.friend_out = true;
            },
            openrule() {
                this.ruleimg = true;
            },
            open() {
                this.openbj = false;
                var audio = document.getElementById("audio");
                console.log(audio);
                audio && audio.play();
            },
            async getnum(type) {//筛子的点数
                this.ruleimgno = false;
                this.click = false;
                if (type == 0) {
                    if (this.surplus == 0) {
                        this.nonum = true
                    } else {
                        // this.num = Math.floor(Math.random() * 5);
                        // if (this.num === 0) {
                        //     this.num = 6
                        // }
                        try {
                            let params = {
                                uid: this.uid
                            };
                            let res = await this.$api.matches.game(params);
                            this.information = res.retBody;
                            this.num = res.retBody.theyCount;
                            this.surplus = this.information.gameTime;
                            this.animeFlag = true;
                            this.Tips = true;
                        } catch (e) {
                            console.log('​catch -> e', e)
                        }
                        setTimeout(() => {
                            this.Tips = false;
                            this.sum = this.sum + this.num;
                            console.log(this.num);
                            this.click = true;
                            this.target = this.current + this.num;
                            this.getmove();
                        }, 3000);
                    }

                } else {
                    this.animeFlag = false;
                    this.num = type - 1;
                    this.Tips = false;
                    this.sum = this.sum + this.num;
                    this.click = false;
                    this.target = this.current + this.num;
                    this.getmove();
                    // this.num = 1;
                }
            },
            getmove() {//让棋子移动相应数量的格子,并为其分配方向
                if (this.current === this.lattice_count) {
                    this.endpop = true
                } else {
                    if (this.direction_right.indexOf(this.current) > -1) {
                        this.directional = 0;
                        // console.log("右")
                    }
                    if (this.direction_down.indexOf(this.current) > -1) {
                        this.directional = 1;
                        // console.log("下")
                    }
                    if (this.direction_left.indexOf(this.current) > -1) {
                        this.directional = 2;
                        // console.log("左")
                    }
                    if (this.direction_up.indexOf(this.current) > -1) {
                        this.directional = 3;
                        // console.log("上")
                    }

                    if (this.current < this.target) {
                        switch (this.directional) {
                            case 0:
                                this.directional_node_right();
                                break;
                            case 1:
                                this.directional_node_down();
                                break;
                            case 2:
                                this.directional_node_left();
                                break;
                            case 3:
                                this.directional_node_up();
                                break;
                        }
                    } else {
                        setTimeout(() => {
                            this.click = true;
                            if (this.current == 21) {
                                if (this.tsnum == 21) {
                                    this.No_prize_logo_ts = false;
                                } else {
                                    this.No_prize_logo_ts = true;
                                    setTimeout(() => {
                                        this.ruleimgno = true
                                    }, 1500);
                                }
                            } else {
                                if (this.information != null) {
                                    switch (this.information.config.type) {
                                        case 1:
                                            if (this.information.isPrize === 1) {
                                                this.prize = true;
                                                this.card_name = this.information.config.name;
                                                this.card_time = this.information.config.tickTime;
                                                this.card_address = this.information.config.address;
                                            } else {
                                                this.click = false;
                                                this.No_prize = true;
                                                this.prizebjnogitfs = this.information.config.imgSrc;
                                                setTimeout(() => {
                                                    this.ruleimgno = true;
                                                    this.click = true;
                                                }, 1500);
                                            }
                                            break;
                                        case 2:
                                            this.click = false;
                                            this.No_prize_logo = true;
                                            this.prizebj = this.information.config.imgSrc;
                                            setTimeout(() => {
                                                this.ruleimgno = true;
                                                this.click = true;
                                            }, 1500);
                                            break;
                                    }
                                }
                            }
                        }, 300);


                    }
                    // console.log(this.current, this.target);
                }
            },
            directional_node_right() {//向右移动
                this.yybj = require('../assets/img/yy.gif');
                this.current++;
                if (this.animeFlag == true) {
                    setTimeout(() => {
                        document.getElementById("move").style.left = (document.getElementById("move").offsetLeft + this.moveW) + "px";
                        this.getmove()
                    }, 300);//方向改为向右节点
                } else {
                    document.getElementById("move").style.left = (document.getElementById("move").offsetLeft + this.moveW) + "px";
                    this.getmove()
                }

            },
            directional_node_down() {//向下移动
                this.yybj = require('../assets/img/zhy.gif');
                this.current++;
                if (this.animeFlag == true) {
                    setTimeout(() => {
                        document.getElementById("move").style.top = (document.getElementById("move").offsetTop + this.moveW) + "px";
                        this.getmove()
                    }, 300);//方向改为向右节点
                } else {
                    document.getElementById("move").style.top = (document.getElementById("move").offsetTop + this.moveW) + "px";
                    this.getmove()
                }
            },
            directional_node_left() {//向左移动
                this.yybj = require('../assets/img/zy.gif');
                this.current++;
                if (this.animeFlag == true) {
                    setTimeout(() => {
                        document.getElementById("move").style.left = (document.getElementById("move").offsetLeft - this.moveW) + "px";
                        this.getmove()
                    }, 300);//方向改为向右节点
                } else {
                    document.getElementById("move").style.left = (document.getElementById("move").offsetLeft - this.moveW) + "px";
                    this.getmove()
                }
            },
            directional_node_up() {//向上移动
                this.yybj = require('../assets/img/by.gif');
                this.current++;
                if (this.animeFlag == true) {
                    setTimeout(() => {
                        document.getElementById("move").style.top = (document.getElementById("move").offsetTop - this.moveW) + "px";
                        this.getmove()
                    }, 300);//方向改为向右节点
                } else {
                    document.getElementById("move").style.top = (document.getElementById("move").offsetTop - this.moveW) + "px";
                    this.getmove()
                }
            },
            async init(uid) {
                // 这里用try catch包裹，请求失败的时候就执行catch里的
                try {
                    let params = {
                        uid: uid
                    };
                    let res = await this.$api.matches.init(params);
                    this.surplus = res.retBody.gameTime;
                    // this.surplus = 0;
                    res.retBody.shareTime === 0 ? this.goshare = false : this.goshare = true;
                    res.retBody.gzTime === 0 ? this.goguanzhu = false : this.goguanzhu = true;
                    this.getnum(res.retBody.theyCount);
                    this.tsnum = res.retBody.theyCount;
                    // this.getnum(1);
                } catch (e) {
                    console.log('​catch -> e', e)
                }
            },
            async init2(uid) {
                // 这里用try catch包裹，请求失败的时候就执行catch里的
                try {
                    let params = {
                        uid: uid
                    };
                    let res = await this.$api.matches.init(params);
                    this.surplus = res.retBody.gameTime;
                    // this.getnum(1);
                } catch (e) {
                    console.log('​catch -> e', e)
                }
            },
            GetUrlParam(paraName) {//获取连接参数
                var url = document.location.toString();
                var arrObj = url.split("?");

                if (arrObj.length > 1) {
                    var arrPara = arrObj[1].split("&");
                    var arr;

                    for (var i = 0; i < arrPara.length; i++) {
                        arr = arrPara[i].split("=");

                        if (arr != null && arr[0] === paraName) {
                            return arr[1];
                        }
                    }
                    return "";
                } else {
                    return "";
                }
            },
        }
    }
</script>
