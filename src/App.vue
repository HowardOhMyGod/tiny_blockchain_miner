<template lang="pug">
  #app
    .app_wraper
        .topbar Tiny Blockchain
        .main_wraper
            router-view
</template>

<script>
export default {
  name: 'app',
  sockets: {
      new_transaction: function(res) {
          if (res) {
              alert('New transaction generate! Hurry up miner!')
          }
      }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass">
@import "./sass/global.sass"

*
    // border: solid 1px black
    font-family: 'Exo 2'
    letter-spacing: 2px
body, html
    margin: 0px
    padding: 0px
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    background-color: $black
    color: white
.topbar
    text-align: center
    padding: 6px 15px
    font-size: 20px
    background-color: $dark_black
    letter-spacing: 2px
#app
    width: calc(100% - 20px)
    padding: 20px 10px
    max-width: 600px
    .app_wraper
        padding: 0px 0px 15px 0px
        box-shadow: $shadow
        border-radius: 10px

</style>
