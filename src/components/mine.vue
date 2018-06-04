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
                    .amout {{hashes}}
            .down
                .start Start

</template>

<script>
export default {
    sockets: {
        connect: function(){
            this.connect = "Connect!"
        },
        server_res: function(res){
            this.res = res
        }

    },
    data() {
        return {
            connect: '',
            res: '',
            hasLogin: false,
            walletAddr: "",
            hashes: 0
        }
    },
    methods: {
        clickBtn: function(){
            this.$socket.emit('message', "Hello Server!")
        }
    },
    mounted(){
        if(sessionStorage.walletAddr){
            this.hasLogin = true
            this.walletAddr = sessionStorage.walletAddr

            //呼叫 /client_mine取得proof及previous hash
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
            .amout
                background-color: rgba($gray, 0.4)
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
</style>
