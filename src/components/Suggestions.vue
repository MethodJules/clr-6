<template>
    <!-- Suggestionsearch-->
    <div class="suggestionSearch">
        <!-- Input-Element-->
        <b-form-input v-bind="$attrs" v-model="searchString"
                      @input="changeInput"
                      @keydown.down="onArrowDown"
                      @keydown.up="onArrowUp"
                      @keydown.enter="onEnter"
                      placeholder ="Suche"
                      autocomplete="off" />

        <!-- List of suggestions, depence on input-Term -->
        <ul v-show="isOpen" class="suggestions">
            <li v-for="(suggestion, index) in suggestions"
                v-bind:key="index"
                class="suggestElement"
                :class="{'is-active': index === arrowCounter}"
                @click="navigate(suggestion)">
                {{ suggestion}}
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
      name: 'Home',
        props: {
            // List of possible suggestions, set in parent-Component 
            items: {
                type: Array,
                required: false,
                default: () => [],
            },
        },

        // Activate clickevent for component, to activate or deactivate suggestion list 
        mounted() {
            document.addEventListener('click', this.handleClickOutside)
        },
        // destroy clickevent for component, to activate or deactivate suggestion list 
        destroyed() {
            document.removeEventListener('click', this.handleClickOutside)
        },

        data() {
            return {
                // helper, to get current position of chosen suggestion (just for mouse-navigation)
                arrowCounter: -1,
                // boolean, to activate or deactivate suggestions
                isOpen: false,
                // list of possible suggestions
                suggestions: [],
                // current search string 
                searchString: '',

            }

        },
        methods: {
            // filter suggestions, each time, search Term is changed 
            changeInput() {
                this.isOpen = true;
                this.filterSuggestions();
            },

            // filter suggestions by current searchstring 
            filterSuggestions() {
                this.suggestions = this.items.filter(item => item.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1);
                if (this.suggestions.length <= 0 || this.searchString.length <= 0) {
                    this.isOpen = false;
                }
            },

            // navigate to selected suggest TODO: change route to desired page 
            navigate(value) {
                this.isOpen = false;
                console.log(value);
                this.$router.push('/calendar')
            },

            // navigate suggestions with keyboard, on Arrow Down go one element down, if it isn't the last one 
            onArrowDown() {

                if (this.arrowCounter < this.suggestions.length) {
                    this.arrowCounter = this.arrowCounter + 1;
                }
            },

            // navigate suggestions with keyboard, on Arrow Up go one element up
            onArrowUp() {
                if (this.arrowCounter > 0) {
                    this.arrowCounter = this.arrowCounter - 1;
                }
            },
            // navigate suggestions with keyboard, on Enter navigate to desired page TODO: change route to desired page
            onEnter() {
                this.isOpen = false;
                console.log(this.suggestions[this.arrowCounter]);
                this.$router.push('/calendar')
            },

            // if clicked outside component, close suggestionlist 
            handleClickOutside(evt) {
                if (!this.$el.contains(evt.target)) {
                    this.isOpen = false;
                    this.arrowCounter = -1;
                } 
            }
        }
    }
</script>

<style>
    .suggestions {
        left: 0;
        right: 0;
        top: 100%;
        top: calc(100% + 5px);
        border-radius: 3px;
        border: 1px solid #aaa;
        background-color: #fff;
        opacity: 1;
        z-index: 1000;
        margin: 0;
        padding-left: 0 !important;
        position: relative;
    }

    .suggestElement {
        cursor: pointer;
        user-select: none;
        padding: 5px 10px;
    }

    .suggestElement:hover,
    .suggestElement.is-active {
        background-color: #2874D5;
        color: #fff !important;
    }
</style>