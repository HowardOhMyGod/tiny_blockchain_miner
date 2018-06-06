<template lang="pug">
.verify_page
    .load
        .ball1
            .ball
        .ball2
            .ball
        .ball3
            .ball
    .title Verifing...
</template>

<script>
export default {
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
    height: 120px
.title
    text-align: center
    font-size: 20px
    margin-top: 55px
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
