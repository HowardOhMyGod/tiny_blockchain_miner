<template lang="pug">
    .mine
        .title Mining Online
        .miner_wrap
            .top.hasLogin(v-if="hasLogin") {{walletAddr}}
            .top(v-if="!hasLogin")
                a#login(href="login") LOGIN
                span OR
                a#create(href="register") CREATE WALLET
            .body
                .hash_total
                    .title Mining Hashes
                    .amount {{hashes}}
                .hash_total.time
                    .title Time
                    .amount {{mineSeconds}}/s
                transition(name="find")
                    .hash_total.hash(v-if="findHash && findObj")
                        .title Mined Hash
                        .amount {{findObj.minedHash}}
            .down
                #start_btn.start(@click="mine", :class="{stop: isMine}") {{start_btn}}

</template>

<script>
import * as crypto from "crypto"
import mineWorker from '../workers/mine.worker.js'
import {client_mine} from '../request.js'

let timeCount;
let miner;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function start(vue){
    let thisVue = vue

    timeCount = setInterval(() => thisVue.mineSeconds++, 1000)

    thisVue.pressStop = false
    thisVue.isMine = true
    thisVue.start_btn = "Stop"
}

function stop(vue) {
    let thisVue = vue

    miner.terminate()
    clearInterval(timeCount)

    thisVue.pressStop = true
    thisVue.start_btn = "Start"
    thisVue.isMine = false
}

export default {
    sockets: {
        connect: function(){
            console.log('Connect Server!')
        },
        lose_mine: function(res){
            if (res.lose) {
                stop(this)
                this.hashes = 0
                this.mineSeconds = 0
                alert("You're too slow!")
            }
        }

    },
    data() {
        return {
            connect: '',
            res: '',
            hasLogin: false,
            walletAddr: "",
            hashes: 0,
            last_hash: 'fifwjiofheiwofn',
            last_proof: 100,
            proof: 0,
            start_btn: "Start",
            isMine: false,
            pressStop: false,
            findHash: false,
            mineSeconds: 0,
            findObj: null
        }
    },
    methods: {
        clickBtn: function(){
            this.$socket.emit('message', "Hello Server!")
        },
        mine: function(){
            let vue = this

            // if not login
            if(!sessionStorage.walletAddr) {
                alert('Please Login First!')
                return
            }

            // start minding
            if (!this.isMine) {
                start(this)
                console.log('start: ', this.hashes)
                // create miner thread to mine, send last_block info
                miner = new mineWorker()
                miner.postMessage({
                    last_hash: this.last_hash,
                    last_proof: this.last_proof,
                    proof: this.hashes
                })

                // listen for miner message
                miner.onmessage = (evt) => {
                    // console.log(evt.data)
                    if (!evt.data.minedHash) {
                        vue.hashes = evt.data.computedHashs
                    } else {
                        vue.findObj = evt.data

                        // finded mined hash
                        stop(this)
                        this.findHash = true

                        // send to verify
                        this.start_btn = "Preparing to verify..."
                        setTimeout(() => this.$router.push({
                            'path': '/verify',
                            'query': {
                                hash: this.findObj.minedHash,
                                miner: this.walletAddr,
                                proof: this.findObj.proof
                            }
                        }), 2000)

                    }
                }
            // press stop mining
            } else {
                stop(this)
            }

        }
    },
    mounted(){
        // check if use login
        if(sessionStorage.walletAddr){
            this.hasLogin = true
            this.walletAddr = sessionStorage.walletAddr

            //呼叫 /client_mine取得proof及previous hash
            client_mine()
                .then((data) => {
                    this.last_hash = data.last_hash
                    this.last_proof = data.last_proof
                    console.log('client_mine: true')
                })
                .catch((e) => alert("Can't get last block hash and proof: ", e))
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../sass/global.sass"

.mine
    padding: 10px 0px
.title
    text-align: center
    padding: 5px 10px
    margin-top: 10px
    font-size: 20px
.top.hasLogin
    color: $blue
.miner_wrap
    margin-top: 10px
    box-shadow: $shadow
    .down
        .start.stop
            background-color: $orange
            font-weight: 800
        .start
            text-align: center
            padding: 6px 5px
            margin-top: 10px
            border-radius: 10px
            background-color: $blue
            letter-spacing: 3px
            font-size: 18px
            cursor: pointer
    .body, .down
        padding: 0px 20px
        margin-top: 30px
    .body
        .hash_total.time, .hash_total.hash
            margin-top: 20px
        .hash_total.hash
            .title
                background-color: $black
                color: $orange
            .amount
                color: $orange
                word-wrap: break-word
                text-align: left
        .hash_total
            text-align: center
            margin-top: 10px
            border-radius: 15px
            background-color: rgba($dark_black, 0.2)
            box-shadow: $shadow
            .title
                margin-top: 0px
                font-size: 16px
                background-color: $dark_black
                letter-spacing: 2px
                border-radius: 15px 15px 0px 0px
            .amount
                background-color: $gray
                padding: 15px 10px
                border-radius: 0px 0px 15px 15px
    .top
        display: flex
        justify-content: center
        background-color: $dark_black
        padding: 10px 0px
        #login, #create
            color: $blue
            cursor: pointer
        *
            margin-right: 7px

.find-enter-active, .find-leave-active
    transition: 0.6s
    transform: scale(1)

.find-enter, .find-leave-to
    transform: scale(1.2)
    background-color: red
</style>
