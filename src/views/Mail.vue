<template>
    <div class="home">
        <v-btn class="addButton" @click="openWriteEmail"> Write Email </v-btn>

        <b-container fluid class="formatView">
            <!-- Filter Formular -->
            <b-row>
                <b-col lg="6" class="my-1">
                    <b-form-group label="Sort"
                                  label-for="sort-by-select"
                                  label-cols-sm="3"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="mb-0"
                                  v-slot="{ ariaDescribedby }">

                        <!-- Sortierung -->
                        <b-input-group size="sm">

                            <b-form-select id="sort-by-select"
                                           v-model="sortBy"
                                           :options="sortOptions"
                                           :aria-describedby="ariaDescribedby"
                                           class="w-75">
                                <template #first>
                                    <option value="">-- none --</option>
                                </template>
                            </b-form-select>

                            <b-form-select v-model="sortDesc"
                                           :disabled="!sortBy"
                                           :aria-describedby="ariaDescribedby"
                                           size="sm"
                                           class="w-25">
                                <option :value="false">Asc</option>
                                <option :value="true">Desc</option>
                            </b-form-select>
                        </b-input-group>
                    </b-form-group>
                </b-col>


                <b-col lg="6" class="my-1">
                    <!--  Filter nach Zeichen -->
                    <b-form-group label="Filter"
                                  label-for="filter-input"
                                  label-cols-sm="3"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="mb-0">
                        <b-input-group size="sm">
                            <b-form-input id="filter-input"
                                          v-model="filter"
                                          type="search"
                                          placeholder="Type to Search"></b-form-input>

                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                            <!--  ungelesene Nachrichten anzeigen -->
                            <b-form-checkbox id="checkbox-1"
                                             v-model="filter"
                                             name="checkbox-1"
                                             value="false"
                                             unchecked-value=""
                                             @change="changeFilter">
                                unread
                            </b-form-checkbox>

                        </b-input-group>

                    </b-form-group>
                </b-col>

                <b-col lg="6" class="my-1">

                    <!--  Filter Checkboxen -->
                    <b-form-group v-model="sortDirection"
                                  label="Filter On"
                                  label-cols-sm="3"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="mb-0"
                                  v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group v-model="filterOn"
                                               :aria-describedby="ariaDescribedby"
                                               class="mt-1">
                            <b-form-checkbox value="from">From</b-form-checkbox>
                            <b-form-checkbox value="subject">Subject</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                </b-col>

                <b-col sm="5" md="6" class="my-1">
                    <b-form-group label="Per page"
                                  label-for="per-page-select"
                                  label-cols-sm="6"
                                  label-cols-md="4"
                                  label-cols-lg="3"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="mb-0">
                        <b-form-select id="per-page-select"
                                       v-model="perPage"
                                       :options="pageOptions"
                                       size="sm"></b-form-select>

                    </b-form-group>

                </b-col>

                <b-col sm="7" md="6" class="my-1">
                    <!-- Anzahl elemente anzeigen-->
                    <b-pagination v-model="currentPage"
                                  :total-rows="totalRows"
                                  :per-page="perPage"
                                  align="fill"
                                  size="sm"
                                  class="my-0"></b-pagination>
                </b-col>
            </b-row>

            <!-- Haupttabelle -->
            <b-table :items="items"
                     :fields="fields"
                     :current-page="currentPage"
                     :per-page="perPage"
                     :filter="filter"
                     :filter-included-fields="filterOn"
                     :sort-by.sync="sortBy"
                     :sort-desc.sync="sortDesc"
                     :sort-direction="sortDirection"
                     stacked="md"
                     show-empty
                     small
                     @row-clicked="readMail"
                     @filtered="onFiltered">
                <template #cell(name)="row">
                    {{ row.value.first }} {{ row.value.last }}
                </template>

                <template #cell(actions)="row">
                    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                        Info modal
                    </b-button>
                    <b-button size="sm" @click="row.toggleDetails">
                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                    </b-button>
                </template>

                <template #row-details="row">
                    <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                        </ul>
                    </b-card>
                </template>
            </b-table>

            <!-- Modal for writing an email -->
            <b-modal id="writeEmail" hide-footer>
                <div class="d-block">

                    <SendMailForm> </SendMailForm>
                </div>
                <b-button class="mt-3" block @click="closeEmail()">close</b-button>
            </b-modal>

            <!-- Modal View Email -->
            <b-modal id="selectedMailModal" hide-footer>
                <div class="d-block">
                    <h1>{{selectedMail.subject}}</h1>
                    <h3> {{selectedMail.from}} </h3>
                    <br />
                    <br />
                    {{selectedMail.text}}

                </div>
                <b-button class="mt-3" block @click="close()">close</b-button>
            </b-modal>

            <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <pre>{{ infoModal.content }}</pre>
            </b-modal>
        </b-container>


    </div>



</template>

<script>
    import SendMailForm from '@/components/SendMailForm'
    export default {
        name: 'Home',

        data: () => ({

            // Emailarray
            emails: [
                { id: 0, from: "test@test.de", subject: 'Test', text: "Dies ist eine Nachricht" },
                { id: 1, from: "test2@test.de", subject: 'Test', text: "Dies ist eine Nachricht" },
                { id: 2, from: "test3@test.de", subject: 'Test', text: "Dies ist eine Nachricht" },
                { id: 3, from: "test5@test.de", subject: 'Test', text: "Dies ist eine Nachricht" }
            ],


            // Itemarray
            items: [
                { isRead: true, from: "test@test.de", subject: 'Test', text: "Dies ist eine Nachricht" },
                { isRead: true, from: "test2@test.de", subject: 'Test', text: "Dies ist eine Nachricht" },
                { isRead: false, from: "test3@test.de", subject: 'Test', text: "Dies ist eine Nachricht" },
                { isRead: false, from: "test5@test.de", subject: 'Test', text: "Dies ist eine Nachricht" }
            ],
            // Felder für die Tabelle
            fields: [
                { key: 'from', label: 'From', sortable: true, sortDirection: 'desc' },
                { key: 'subject', label: 'Subject', sortable: true},
                {
                    key: 'isRead',
                    label: 'Is Read',
                    formatter: (value) => {
                        return value ? 'true' : 'false'
                    },
                    sortable: true,
                    sortByFormatted: true,
                    filterByFormatted: true
                },
                { key: 'actions', label: 'Actions' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            selectedMail: {
                isRead: '',
                from: '',
                subject: '', 
                text: ''
            },
            title: '',
            content: '',
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            }


        }), 
        computed: {
            // Filteroption 
            sortOptions() {              
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return { text: f.label, value: f.key }
                    })
            }
        },
        mounted() {
            // Set the initial number of items
            this.totalRows = this.items.length
        },
        methods: {
            // Infomodal definieren (Action)
            info(item, index, button) {
                this.infoModal.title = `Row index: ${index}`
                this.infoModal.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            // Infomodal zurücksetzen
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
            //ausgewählte Mail anzeigen 
            readMail(record) {
                this.selectedMail = record;
                this.$bvModal.show('selectedMailModal');
            },
            // Filter aktivieren
            onFiltered(filteredItems) {

                // Wenn kein Filter gesetzt, setze alle Filter aktiv, damit in allen Kategorien gesucht wird
                if (this.filterOn.length === 0) {
                    this.filterOn.push("from", "subject")
                }
                // Anzahl Elemente ermitteln 
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            // Filter ändern
            changeFilter() {
                if (this.filter !== "false") {
                    this.filterOn.push("isRead");
                } else {
                    console.log("Test");
                    this.filterOn = []
                }

                
            },

            openWriteEmail() {
                this.$bvModal.show('writeEmail');
            },

            close() {
                this.$bvModal.hide('selectedMailModal');
            },

            closeEmail() {
                this.$bvModal.hide('writeEmail');
            }
        },
        components: {
            SendMailForm
        }
    }
</script>


<style scoped> 
    .home {
    }
    .hoverdItem:hover{
        background: lightgrey;
    }
    .formatView {
        height: 90%;
        overflow: scroll;
        width: 100%;
        padding: 10px;
    }

    .addButton {
        position: relative;
        background-color: #c93e37 !important;
        color: white;
        
    }

</style>