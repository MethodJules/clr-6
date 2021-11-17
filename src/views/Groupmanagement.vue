<template>
    <div class="home">
        <br />

        <div>
            <b-card-group deck>
                <b-card
                    header-tag="header"
                    footer-tag="footer"
                    border-variant="primary"
                >
                    <template #header>
                        <h6 class="mb-0">
                            <b> {{ getCurrentProject.title }} </b>
                        </h6>
                    </template>
                    <b-card-text>
                        <div
                            v-for="mitglied in getGroupMembers"
                            :key="mitglied.userid"
                        >
                            <b-row>
                                <b-col>
                                    <p>Gruppenmitglied</p>
                                </b-col>
                                <b-col>
                                    <b-nav-item
                                        :to="{
                                            name: 'Profil',
                                            params: {
                                                user_internal_uid:
                                                    mitglied.internal_uid,
                                            },
                                        }"
                                    >
                                        <p class="mitglied">
                                            <b> {{ mitglied.username }} </b>
                                        </p>
                                    </b-nav-item>
                                </b-col>
                                <b-col>
                                    <b-button
                                        v-if="
                                            (getCurrentUserID !=
                                                mitglied.userid) &
                                            currentUserisAdmin
                                        "
                                        variant="link"
                                        @click="deleteMember(mitglied)"
                                    >
                                        <b-icon icon="x"></b-icon>
                                    </b-button>
                                    <b-button
                                        v-if="
                                            (getCurrentUserID !=
                                                mitglied.userid) &
                                            currentUserisAdmin
                                        "
                                        variant="link"
                                        @click="giveAdminRights(mitglied)"
                                        ><b-icon
                                            icon="person-check-fill"
                                        ></b-icon
                                    ></b-button>
                                    <br />
                                </b-col>
                            </b-row>
                        </div>

                        <div
                            v-for="admin in getGroupAdmins"
                            :key="admin.userid"
                        >
                            <b-row>
                                <b-col>
                                    <p>Gruppenadministrator</p>
                                </b-col>
                                <b-col>
                                    <b-nav-item
                                        :to="{
                                            name: 'Profil',
                                            params: {
                                                user_internal_uid:
                                                    admin.internal_uid,
                                            },
                                        }"
                                        ><p class="admin">
                                            <b>{{ admin.username }}</b>
                                        </p>
                                    </b-nav-item>
                                </b-col>
                                <b-col>
                                    <b-button
                                        variant="link"
                                        v-if="
                                            (getCurrentUserID != admin.userid) &
                                            currentUserisAdmin
                                        "
                                        @click="deleteAdmin(admin)"
                                    >
                                        <b-icon icon="x"></b-icon>
                                    </b-button>
                                    <br />
                                </b-col>
                            </b-row>
                        </div>
                        <br />

                        <b-row class="groupmanagement-buttons">
                            <b-button :to="{ name: 'NewMember' }" tag="div">
                                Neues Mitglied hinzufügen
                            </b-button>

                            <b-button @click="removeOwnAdminRights"
                                >Admin-Rechte entfernen
                            </b-button>
                            <b-button
                                @click="$bvModal.show('student-leave-group')"
                                >Gruppe verlassen
                            </b-button>
                        </b-row>

                        <b-modal
                            @ok="leaveGroup"
                            id="student-leave-group"
                            title="Bist du dir sicher?"
                            ><p>
                                Du kannst nicht mehr auf das Projekt zugreifen,
                                wenn du das Projekt verlässt!
                            </p>
                        </b-modal>
                    </b-card-text>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "Home",
    components: {},
    data() {
        return {};
    },
    methods: {
        /* checks if current user is in group admin array, because he needs the rights to remove another member.
        then sends dispatch to delete member*/
        deleteMember: function (mitglied) {
            if (this.currentUserisAdmin) {
                alert("Das Gruppenmitglied wurde gelöscht");
                this.$store.dispatch("project/deleteMembers", mitglied);
            } else {
                alert(
                    "Du musst Gruppenadministrator sein, um Gruppenmitglieder zu entfernen"
                );
            }
        },

        /* checks if current user is in group admin array, because he needs the rights to remove another member.
        then sends dispatch to delete admin*/
        deleteAdmin: function (mitglied) {
            if (this.currentUserisAdmin) {
                this.$store.dispatch("project/deleteAdmin", mitglied);
            } else {
                alert(
                    "Du musst Gruppenadministrator sein, um Gruppenmitglieder zu entfernen"
                );
            }
        },

        filter(memberId, memberList) {
            //filters the current user by id - is used in a function for leaving the group
            let filteredCollection = memberList.filter((item) => {
                console.log(item);
                if (item.userid == memberId) {
                    return true;
                }
                return false;
            });
            return filteredCollection[0];
        },

        /* checks first if current user is an group admin or group member with getGroup__.some. If a user in one of those arrays
        the filter function will filter out the correct member out of the array
        then the appropriate dispatch will be sent */
        leaveGroup() {
            //if(me=gruppenadministrator AND nicht selbst letzte admin)
            //this.$store.dispatch("members/deleteMembers", mitglied);
            //put logic in project.js?
            //TODO: either cant leave if last admin except no other member is in grp
            // or has to give up grp admin role first, but giving up grp admin rights should not be possible, if there is no other admin, but grp members are still there

            let member;

            if (
                this.getGroupMembers.some(
                    (member) => member.userid === this.getCurrentUserID
                )
            ) {
                member = this.filter(
                    this.getCurrentUserID,
                    this.getGroupMembers
                );
                this.$store
                    .dispatch("project/deleteMembers", member)
                    .then(() => {
                        this.$bvToast.toast(`Du hast die Gruppe verlassen`, {
                            title: "Du hast die Gruppe verlassen",
                            autoHideDelay: 4000,
                            variant: "warning",
                        });
                        //we call this method, to update the projects in state. otherwise the user will still see the project he left in his projectlist
                        this.$store.dispatch("project/loadProjectsFromBackend");
                    });

                this.$router.push("/");
            }

            if (this.currentUserisAdmin) {
                if (this.getGroupAdmins.length < 2) {
                    alert(
                        "Mache erst ein anderes Gruppenmitglied zu einem Gruppenadministrator, bevor du die Gruppe verlässt. Falls du die letzte Person in der Gruppe bist, entferne deine Gruppenadministrator-Rechte bevor du die Gruppe verlässt "
                    );
                } else {
                    member = this.filter(
                        this.getCurrentUserID,
                        this.getGroupAdmins
                    );
                    this.$store
                        .dispatch("project/deleteAdmin", member)
                        .then(() => {
                            this.$bvToast.toast(
                                `Du hast die Gruppe verlassen`,
                                {
                                    title: "Du hast die Gruppe verlassen",
                                    autoHideDelay: 4000,
                                    variant: "warning",
                                }
                            );
                            this.$store.dispatch(
                                "project/loadProjectsFromBackend"
                            );
                        });

                    this.$router.push("/");
                }
            }
        },

        giveAdminRights: function (new_admin) {
            let member = this.filter(
                this.getCurrentUserID,
                this.getGroupAdmins
            );
            if (this.currentUserisAdmin) {
                this.$store
                    .dispatch("project/addMember", {
                        mitglied: new_admin,
                        role: "field_gruppenadministrator",
                    })
                    .then(() => {
                        //then delete old group member
                        //sometimes the member is not deleted
                        //do a .then for the second dispatch?
                        this.$store.dispatch(
                            "project/deleteMembers",
                            new_admin
                        );
                    });
            } else {
                alert(
                    "Du musst Gruppenadministrator sein, um andere Gruppenmitglieder zu Gruppenadministratoren zu befördern"
                );
            }
        },

        removeOwnAdminRights: function () {
            //TODO: make only possible if there is at least one other admin
            //if letzter admin und noch ein grp mitglied außer system da , dann erst admin an anderen vergeben
            let member = this.filter(
                this.getCurrentUserID,
                this.getGroupAdmins
            );
            //evtl redundant?
            if (this.currentUserisAdmin) {
                //if user ist letzter admin and there are still groupmembers left, user has to promote someone first. otherwise the group has no admins left but there are still other group members left
                if (
                    this.getGroupMembers.length > 0 &&
                    this.getGroupAdmins.length < 2
                ) {
                    alert(
                        "Du musst erst ein anderes Gruppenmitglied zum Gruppenadministrator machen, um deine Administratorrechte aufzugeben"
                    );
                } else {
                    member = this.filter(
                        this.getCurrentUserID,
                        this.getGroupAdmins
                    );
                    //first delete user in groupadmin array
                    this.$store
                        .dispatch("project/deleteAdmin", member)
                        .then(() => {
                            this.$store.dispatch("project/addMember", {
                                mitglied: member,
                                role: "field_gruppenmitglieder",
                            });
                            //then delete old group member
                            alert("Du bist nun kein Gruppenadministrator mehr");
                        });
                    //then add in groupmember array
                }
            } else {
                alert(
                    "Du musst Gruppenadministrator sein, um deine Administratorrechte aufgeben zu können"
                );
            }
        },
    },
    computed: {
        ...mapState({
            members: (state) => state.members,
        }),
        ...mapGetters({
            getCurrentProject: "project/getCurrentProject",
            getGroupMembers: "project/getGroupMembers",
            getGroupAdmins: "project/getGroupAdmins",
            getProjectLecturers: "project/getProjectLecturers",
            getCurrentUserID: "profile/getCurrentUserID",
            getCurrentUserInternalUID: "drupal_api/getCurrentUserInternalUID",
        }),

        currentUserisAdmin() {
            return this.getGroupAdmins.some(
                (e) => e.userid === this.getCurrentUserID
            );
        },
    },
    async mounted() {
        this.$store.dispatch("user/loadStudentsFromBackend");
        this.$store.dispatch(
            "profile/loadUserFromBackend",
            this.getCurrentUserInternalUID
        );
        this.$store.dispatch(
            "project/loadCurrentProject",
            this.$route.params.project_id
        );
    },
};
</script>
<style scoped>
.nav-link {
    padding: 0;
}

.mitglied {
    color: black;
    text-align: justify;
    display: inline-block;
}
.admin {
    color: #c93e37;
    text-align: justify;
    display: inline-block;
}
.groupmanagement-buttons {
    display: flex;
    justify-content: center;
}
.groupmanagement-buttons * {
    margin-right: 1rem;
    margin-bottom: 1rem;
    max-width: 15rem;
}
h1 {
    text-align: right;
}
h5 {
    text-align: right;
    margin: 3px;
    margin-left: 10%;
    display: inline-block;
}
button {
    float: right;
}
</style>