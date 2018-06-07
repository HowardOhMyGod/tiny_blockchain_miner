<template lang="pug">
.transfer_wraper
    .title Receiver Wallet Address :
    input(placeholder="Reciever Address", v-model="receiverAddr")
    .title Sending Amount :
    input(placeholder="Send Amount", v-model="sendAmount")
    .send_btn(@click="send") {{send_btn}}

</template>

<script>
export default {
    data () {
        return {
            receiverAddr: '',
            sendAmount: '',
            send_btn: "Transfer"
        }
    },
    methods: {
        send () {
            if (!this.receiverAddr || !this.sendAmount) {
                alert('Invalid Input!')
                return
            }

            this.send_btn = "Transfering..."

            setTimeout(() => this.$router.push({'path': '/wallet'}), 2000)

        }
    }
}
</script>

<style lang="sass" scoped>
@import "../sass/global.sass"

.transfer_wraper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .title
        text-align: center
        margin-top: 20px
    input
        +input
        margin-top: 20px
    .send_btn
        margin-top: 20px
        background-color: $blue
        padding: 8px 30px
        border-radius: 20px

</style>
