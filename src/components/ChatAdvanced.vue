<template>
    <!-- binding iframe -->
    <!-- To fit the popover, Width and height is changed to 100%
    It is fit to the modal now and better to manage-->
    <!-- <vue-resizable> -->
    <iframe
        src="https://chat-clrbackend.ddns.net"
        title="myframe"
        width="100%"
        height="100%"
    ></iframe>
    <!-- </vue-resizable> -->
</template>
<script>
import VueResizable from "vue-resizable";
export default {
    components: { VueResizable },
};
</script>

