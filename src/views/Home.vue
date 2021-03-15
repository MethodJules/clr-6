<template>
    <div>
      <z-canvas :views="$options.components">

            <ReviewCircle> </ReviewCircle>

        </z-canvas>
    </div>
</template>

<script>
import ReviewCircle from '@/components/ReviewCircle.vue'
export default {
  name: 'Home',
  components: {
    ReviewCircle
  },
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
