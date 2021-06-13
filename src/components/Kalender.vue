<template>
  <b-calendar
    block
    size="sm"
    id="ex-disabled-readonly"
    :disabled="disabled"
    :readonly="readonly"
    class="flex-grow-1"
  ></b-calendar>
</template>
<script>
export default{
    data() {
        return {
      disabled:"disabled",
      readonly:"readonly"
      }
},
}
</script>
