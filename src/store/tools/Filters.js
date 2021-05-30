import Vue from "vue";

// Here we can define filters. Instead doing the same things again and again in different pages,
// We can use filters. They can be called in any page you want. 
// you can create your own and use them. 
// For more information about filters: https://vuejs.org/v2/guide/filters.html

// converts given size in byte to MB or GB
// Usage: see inputDocuments.vue line 72
// Usage Example: {{ input.size | convertSize }}
Vue.filter("convertSize", (value) => {

    if (value > 100000000) {
        value /= 1073741824;
        value = value.toFixed(2);
        value += " GB";
    } else {
        value /= 1048576;
        value = value.toFixed(2);
        value += " MB";
    }
    return value;
});