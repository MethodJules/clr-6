<template>
    <!-- binding iframe -->
    <!-- To fit the popover, Width and height is changed to 100% 
    It is fit to the modal now and better to manage-->
    <div>
        <iframe
            src="http://localhost:3000/channel/general/?layout=embedded"
            title="myframe"
            width="100%"
            height="100%"
        ></iframe>
    </div>
</template>
<script>
export default {
    methods: {
        postMessage() {
            <div
                onClick={() => {
                    document
                        .getElementsByTagName("myframe")[0]
                        .contentWindow.postMessage(
                            {
                                externalCommand: "go",
                                path: "/channel/uwFh6FHugnPifnG7R",
                            },
                            "http://localhost:3000"
                        );
                }}
            >
                {" "}
                Raum2{" "}
            </div>;
        },
    },
};
</script>

