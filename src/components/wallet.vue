<template lang="pug">
.wallet_wraper
    .wallet_info
        .addr
            h4 Wallet Address
            p howardisgood
        .money
            h4 Current Saving
            p 5
    .transactions
        .title Transactions
        .transaction(v-for="i in 5")
            .amount 15
            .s_r
                .sender From: weghfoiweghow
                .receiver To: gwrghowig
    a.transfer Transfer
    a.home(href="/mine") Home
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>

@import "../sass/global.sass"
*
    // border: solid 1px white
    text-align: center
    margin: 0px

.wallet_wraper
    padding: 10px 10px

.transactions
    margin-top: 20px
    .title
        background-color: $dark_black
        box-shadow: $shadow
        border-radius: 20px
        padding: 5px 0px
    .transaction
        *
            text-align: left
            // border: solid 1px white
        display: flex
        margin-top: 10px
        box-shadow: $shadow
        padding: 5px 10px
        background-color: $gray
        border-radius: 10px
        .amount
            font-size: 26px
            color: $orange
            display: flex
            align-items: center
            justify-content: center
            flex: 30px
            width: 80px
        .s_r
            flex: 11
            *
                font-size: 14px
                color: rgba(white, 0.9)
.wallet_info
    .addr, .money
        border-radius: 20px
        box-shadow: $shadow
        margin-top: 20px
    .money
        margin-top: 20px
    h4
        background-color: $dark_black
        padding: 5px 0px
        border-radius: 20px 20px 0px 0px
    p
        padding: 20px 10px
        background-color: $gray
        border-radius: 0px 0px 20px 20px
        color: $orange
    .addr
        p
            color: $orange
    .money
        p
            font-size: 50px
            padding: 5px 10px
.home, .transfer
    border: solid white 1px
    width: calc(100% - 20px)
    display: inline-block
    padding: 5px 10px
    border-radius: 20px
    margin-top: 20px
    text-decoration: none
    color: white
.transfer
    background-color: $blue
    border: none
    box-shadow: $shadow

</style>
