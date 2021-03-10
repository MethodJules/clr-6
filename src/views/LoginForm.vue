<!-- Login-Form-->
<template>
    <div class="home">
        <b-form @submit.prevent="login">
            <b-form-group id="formGroupName" label="Username">
                <b-form-input id="name"
                              v-model="form.name"
                              type="text"
                              placeholder="Enter Name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="formGroupPassword" label="Password">
                <b-form-input id="password"
                              v-model="form.password"
                              type="password"
                              placeholder="Enter Password">
                </b-form-input>
            </b-form-group>

            <b-button type="submit"> Login  </b-button>
        </b-form>
    </div>


</template>

<script>
    export default {
        data: function () {
            return {
                form: {
                    name: '',
                    password: ''
                }
            }
        }, 
        methods: {
            /*
             * Login
             * check if username exists and password is correct 
            */
            login() {
                if (this.form.name != "" && this.form.password != "") {
                    // get user from store
                    var user = this.$store.getters['members/getMemberbyUsername'](this.form.name);
                    // check if user exist 
                    if (user != undefined) {
                        // login, if username and password are equal, set store variables to login user 
                        if (user.password == this.form.password) {
                            localStorage.setItem("userLoggedIn", this.form.name);
                            this.$store.dispatch('members/login', this.form.name);
                            this.currentUser = localStorage.getItem("userLoggedIn");
                            this.$router.push('/')

                        } else {
                            alert("Passwort ist falsch")
                        }
                    } else {
                        alert("username existiert nicht")
                    }


                } else {
                    alert(unescape("Name und Password m%FCssen eingegeben sein"));
                }

            }, 

        }

    }


</script>