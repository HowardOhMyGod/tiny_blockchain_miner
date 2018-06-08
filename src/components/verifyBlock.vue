<template lang="pug">
.verify_page
    .load(v-if="verify_result == null")
        .ball1
            .ball
        .ball2
            .ball
        .ball3
            .ball
    .award(v-if="verify_result")
        .amount
            h4 {{award}}
            span coins
        .msg Receive !
    .title {{verify_title}}
    .options(v-if="verify_result")
        a.wallet(href="/wallet") Wallet
        a.home(href="/mine") Home


</template>

<script>
import {block_verify} from '../request'

export default {
    data () {
        return {
            verify_result: null,
            award: 0
        }
    },
    computed: {
        verify_title () {
            if (this.verify_result === null) {
                return "Verifing..."
            }
            if (this.verify_result.verify) {
                this.award = this.verify_result.award
                return "Verify Successfully !"
            } else if (!this.verify_result.verify) {
                return "Invalid Hash !"
            }
        }
    },
    mounted() {
        setTimeout(() => {
            block_verify(this)
                .then((data) => this.verify_result = data)
                .catch((e) => alert('Request block_verify failed: ', e))
        }, 3000)
    }
}
</script>

<style lang="sass" scoped>

@import "../sass/global.sass"

@mixin size($w, $h:$w)
    width: $w
    height: $h

@keyframes ball
    0%
        transform: translateY(10px)
    50%
        transform: translateY(-10px)
        +size(15px)
        border-radius: 50%
    100%
        transform: translateY(10px)
*
    // border: solid white 1px
.verify_page
    padding: 30px 20px
.title
    text-align: center
    font-size: 20px
    margin-top: 30px
.options
    display: flex
    flex-direction: column
    align-items: center
    a
        color: white
        text-decoration: none
    *
        width: 80%
        text-align: center
        padding: 5px 5px
        margin-top: 20px
        border: solid white 1px
        border-radius: 20px
.award
    margin-top: 10px
    padding: 20px 10px
    border-radius: 15px
    box-shadow: $shadow
    *
        text-align: center
    .msg
        margin-top: 20px
        font-size: 20px
    .amount
        h4, span
            display: inline-block
            margin: 0px
        h4
            font-size: 60px
            font-weight: 700
            margin-right: 5px
            color: $orange
.load
    display: flex
    justify-content: center
    height: 30px
    margin-top: 20px
    .ball
        +size(10px)
        animation: ball 1.5s infinite
        animation-direction: alternate
        background-color: white
        margin-right: 15px
        background-color: $blue

@for $i from 1 through 3
    .ball#{$i}
        .ball
            animation-delay: -#{$i*0.2}s

</style>
