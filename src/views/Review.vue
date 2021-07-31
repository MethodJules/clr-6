
<template>
    <div class="home">
        <z-canvas :views="$options.components">
            <ReviewCircle> </ReviewCircle>
        </z-canvas>
    </div>
</template>

<script>
import ReviewCircle from "@/components/ReviewCircle";
// import Test from "@/components/test2";

export default {
    components: {
        ReviewCircle,
        // Test,
    },
    mounted() {
        this.$zircle.config({
            mode: "mixed",
            style: {
                theme: "white",
            },
        });

        this.$zircle.setView("ReviewCircle");
    },
};
</script>

<style>
.z-canvas {
    position: relative !important;
    overflow: visible;
}

.z-outer-circle {
    border-width: 3px;
}
</style>