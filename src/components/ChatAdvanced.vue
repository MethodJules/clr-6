<template>
<!-- binding iframe --> 
<iframe height="500" width="470"
src="http://localhost:3000/channel/general/?layout=embedded"
title="myframe"
></iframe>

</template>
<script>


export default ({
    methods:{
        postMessage(){
            

<div onClick={() => {
document.getElementsByTagName("myframe")[0].contentWindow.postMessage(
 { externalCommand: "go", path: "/channel/uwFh6FHugnPifnG7R" },
 "http://localhost:3000"
 );}}> Raum2 </div>


        }
    }
})
</script>

