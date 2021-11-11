<template>
    <!-- binding iframe -->
    <!-- To fit the popover, Width and height is changed to 100%
    It is fit to the modal now and better to manage-->
    <!-- <vue-resizable> -->
    <iframe
        src="https://chat-clrbackend.ddns.net"
        title="myframe"
        width="500rem"
        height="500rem"
    ></iframe>
    <!-- </vue-resizable> -->
</template>
<script>
import VueResizable from "vue-resizable";
export default {
    components: { VueResizable },
};
</script>

