<!-- Login -->
<template>
    <div class="login">
        <!-- Button to open Login-Form -->
        <div class="loginButton" v-if="!member.currentUser!= ''">
            <b-button type="button" variant="light" @click="openLoginForm"> Login </b-button>
        </div>

        <div class="logoutButton" v-else>
                <div class="username">
                    {{member.currentUser}}
                </div>              
                <b-button type="button" variant="light" @click="logout()"> Logout </b-button>
        </div>

        <b-modal id="loginForm" hide-footer>
            <!-- Login-Form-->
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
                <b-button class="closeButton" type="button" @click="closeForm"> Close  </b-button>
            </b-form>
        </b-modal>
    </div>

</template>

    <script>  
        import { mapState } from 'vuex'
        export default {
            data: function () {
                return {
                    form: {
                       name: '', 
                       password: '' 
                    },
                    isLoggedIn: false,
                }
            }, 
            /* Checks, if user is already logged in after refreshing page*/
            created() {              
                if (localStorage.getItem("userLoggedIn") != null) {
                    this.currentUser = localStorage.getItem("userLoggedIn");

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
                            // login, if username and passwaord are equal 
                            if (user.password == this.form.password) {
                                this.$store.dispatch('members/login', this.form.name)
                                localStorage.setItem("userLoggedIn", this.form.name);

                                this.$bvModal.hide('loginForm');

                            } else {
                                alert("Passwort ist falsch")
                            }
                        } else {
                            alert("username existiert nicht")
                        }


                    } else {
                        alert("Name und Password müssen eingegeben sein")
                    }

                }, 
                /* open Login-form */
                openLoginForm() {
                    this.$bvModal.show('loginForm');
                },
                /* close Login-form  */
                closeForm() {
                    this.$bvModal.hide('loginForm');
                },
                /* Logout user, remove User from localstorage */
                logout() {
                    this.$store.dispatch('members/logout')
                    localStorage.removeItem("userLoggedIn");
                    this.currentUser = ''
                }
            },
            // get Login-Data from store
            computed: {
                ...mapState({ member: state => state.members })
            },


        }
    </script>

<style>
    .loginButton {
        width: 5%;
        position: absolute;
        right: 3%;
        color: white;
    }
    .closeButton {
        margin-left: 2%;
        float: right;
    }
    .logoutButton {
        width: 20%;
        position: absolute;
        right: 10px;
        color: white;
        background-color: #362c2b;
    }

    .username {
       float:left;
       margin-right: 10%;
       margin-left: 10%;
       color: white;
       padding: 4%;
    }

</style>