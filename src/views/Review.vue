<!-- Review circle -->
<template>
    <div class="scroller">
        <!-- Create canvas area, open ReviewCircle-Component-->
        <z-canvas :views="$options.components">

            <ReviewCircle> </ReviewCircle>

        </z-canvas>

    </div>
</template>

<script>
    import ReviewCircle from '@/components/ReviewCircle'

    export default {
        components: {
            ReviewCircle
        },
        // define circle theme
        mounted() {
            this.$zircle.config({
                mode: 'mixed',
                style: {
                    theme: 'white'
                }
            })

            this.$zircle.setView('ReviewCircle')
        }

    }
</script>

<style>
    .z-canvas{
        position: relative !important;
        overflow: visible;
        background-color: unset !important;

    }

    .z-outer-circle {
        border-width: 3px;
    }



</style>