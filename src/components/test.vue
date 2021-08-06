<template>
    <z-view label="Home status" style="background-color: black">
        <div slot="extension">
            <z-spot
                :angle="-45"
                size="m"
                :distance="120"
                label="Events"
                to-view="logs"
            >
                14
            </z-spot>
        </div>
    </z-view>
</template>