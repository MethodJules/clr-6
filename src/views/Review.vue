
<template>
    <div class="home">
        <z-canvas :views="$options.components">
            <ReviewCircle> </ReviewCircle>
        </z-canvas>
    </div>
</template>

<script>
import ReviewCircle from "@/components/ReviewCircle";

export default {
    components: {
        ReviewCircle,
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
    height: 100%;
}

.z-outer-circle {
    border-width: 3px;
}
</style>