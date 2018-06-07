<template lang="pug">
.login
    .title {{title}} :
    input(:placeholder="placeholder", v-model="value")
    .login_btn(@click="btn_action") {{btn_name}}
</template>

<script>
export default {
    data(){
        return {
            title: "",
            btn_name: "",
            placeholder: "",
            value: ""
        }
    },
    methods: {
        btn_action(){
            if(this.$route.path === '/login'){
                sessionStorage.walletAddr = this.value
            }

            this.$router.push('mine')
        }
    },
    mounted(){
        if(this.$route.path === '/login') {
            this.title = "Enter Your Wallet Address"
            this.btn_name = "Login"
            this.placeholder = "Wallet Address"
        } else if (this.$route.path === '/register'){
            this.title = "Enter Your Personal ID"
            this.btn_name = "Register"
            this.placeholder = "Personal ID"
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../sass/global.sass"
.login
    display: flex
    flex-direction: column
    align-items: center
    padding: 20px 10px
    .login_btn
        background-color: $blue
        padding: 10px 15px
        text-align: center
        margin-top: 20px
        border-radius: 10px

    .title
        margin-bottom: 20px
    input
        +input
</style>
