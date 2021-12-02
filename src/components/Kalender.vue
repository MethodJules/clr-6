<template>
    <div id="kalender" class="w-100 mt-2">
        <div class="giveAppointment w-100">
            <div class="card-body text-center p-0 w-100">
                <vc-calendar :attributes="attributes" is-expanded />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {},

    computed: {
        ...mapGetters({
            attributes: "todo/getAttributesForVcCalendar",
        }),
    },
};
</script>
