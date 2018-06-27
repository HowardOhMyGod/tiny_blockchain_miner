<template lang="pug">
.transfer_wraper
    .title Receiver Wallet Address :
    input(placeholder="Reciever PID", v-model="receiverPid")
    .title Sending Amount :
    input(placeholder="Send Amount", v-model.number="amount")
    .send_btn(@click="transfer") {{send_btn}}

</template>

<script>
import {transfer} from '../request'
export default {
    data () {
        return {
            receiverPid: '',
            amount: '',
            send_btn: "Transfer"
        }
    },
    methods: {
        transfer () {
            if (!this.receiverPid || !this.amount || this.amount <= 0) {
                alert('Invalid Input!')
                return
            }

            this.send_btn = "Transfering..."
            transfer(sessionStorage.walletAddr, this.amount, this.receiverPid)
                .then((data) => {
                    if (data.error) {
                        alert(data.errMsg)
                    } else {
                        alert('Tranfer Success!')
                    }

                    this.$router.push({'path': '/wallet'})
                })
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
