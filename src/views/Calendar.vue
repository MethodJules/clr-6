<template>
    <div class="home">
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat>
                        <v-btn outlined
                               class="mr-4"
                               color="grey darken-2"
                               @click="setToday">
                            Today
                        </v-btn>
                        <v-btn fab
                               text
                               small
                               color="grey darken-2"
                               @click="prev">
                            <v-icon small>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-btn fab
                               text
                               small
                               color="grey darken-2"
                               @click="next">
                            <v-icon small>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>


                        <v-menu v-model="newMeeting"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-x>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn outlined
                                       color="grey darken-2"
                                       v-bind="attrs"
                                       v-on="on">
                                     New Meeting                               
                                </v-btn>
                            </template>
                            
                            <v-card color="grey lighten-4"
                                    min-width="350px"
                                    flat>
                                <v-toolbar :color="newMeetingValues.color"
                                           dark>
                                    <v-toolbar-title v-html="newMeetingValues.name"> </v-toolbar-title>

                                </v-toolbar>
                                <div class="d-block text-center">
                                    <h3>Name: </h3>
                                    <b-form-input v-model="newMeetingValues.name" placeholder="Name"></b-form-input>
                                </div>
                                <div class="d-block text-center">
                                    <h3>Farbe: </h3>
                                    <b-form-select v-model="newMeetingValues.color" :options="colors"></b-form-select>
                                </div>

                                <div class="d-block text-center">
                                    <h3>Timed: </h3>
                                    <b-form-group v-slot="{ ariaDescribedby }">
                                        <b-form-radio v-model="newMeetingValues.timed" :aria-describedby="ariaDescribedby"  value="true">Yes</b-form-radio>
                                        <b-form-radio v-model="newMeetingValues.timed" :aria-describedby="ariaDescribedby"  value="false">No</b-form-radio>
                                    </b-form-group>
                                </div>
                                <div v-if="newMeetingValues.timed === 'true'">
                                    <div class="d-block text-center">
                                        <h3>Startdatum: </h3>
                                        <Datetime type="datetime" v-model="newMeetingValues.startTime"></Datetime>
                                    </div>
                                    <div class="d-block text-center">
                                        <h3>Enddatum: </h3>
                                        <Datetime type="datetime" v-model="newMeetingValues.endTime"></Datetime>
                                    </div>
                                </div>

                                <div v-else>
                                    <div class="d-block text-center">
                                        <h3> Startdatum: </h3>
                                        <b-form-datepicker v-model="newMeetingValues.start" class="mb-2"></b-form-datepicker>
                                    </div>

                                    <div class="d-block text-center">
                                        <h3> Enddatum: </h3>
                                        <b-form-datepicker v-model="newMeetingValues.end" class="mb-2"></b-form-datepicker>
                                    </div>
                                </div>




                                <v-card-text>
                                    <span v-html="selectedEvent.details"></span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text
                                           color="secondary"
                                           @click="createNewMeeting(); newMeeting = false">
                                        OK
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-menu>

                        <v-menu bottom
                                right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn outlined
                                       color="grey darken-2"
                                       v-bind="attrs"
                                       v-on="on">
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right>
                                        mdi-menu-down
                                    </v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Day</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Week</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Month</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                    <v-calendar ref="calendar"
                                v-model="focus"
                                color="primary"
                                :events="events"
                                :event-color="getEventColor"
                                :type="type"
                                @click:event="showEvent"
                                @click:more="viewDay"
                                @click:date="viewDay"
                                @mousedown:event="startDrag"
                                @mousedown:time="startTime"
                                @mousemove:time="mouseMove"
                                @mouseup:time="endDrag"
                                @mouseleave.native="cancelDrag">

                        <template v-slot:event="{ event, timed, eventSummary }">
                            <div class="v-event-draggable"
                                 v-html="eventSummary()"></div>
                            <div v-if="timed"
                                 class="v-event-drag-bottom"
                                 @mousedown.stop="extendBottom(event)"></div>
                        </template>

                    </v-calendar>

                     <v-menu v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x>
                        <v-card color="grey lighten-4"
                                min-width="350px"
                                flat>
                            <v-toolbar :color="selectedEvent.color"
                                       dark>
                                <v-toolbar-title v-html="selectedEvent.name"> </v-toolbar-title>

                            </v-toolbar>
                            <div class="d-block text-center">
                                <h3>Name: </h3>
                                <b-form-input v-model="selectedEvent.name" placeholder="Name"></b-form-input>
                            </div>
                            <div class="d-block text-center">
                                <h3>Farbe: </h3>
                                <b-form-select v-model="selectedEvent.color" :options="colors"></b-form-select>
                            </div>

                            <div v-if="selectedEvent.timed">
                                <div class="d-block text-center">
                                    <h3>Startdatum: </h3>
                                    <Datetime type="datetime" v-model="selectedEvent.startTime"></Datetime>
                                </div>
                                <div class="d-block text-center">
                                    <h3>Enddatum: </h3>
                                    <Datetime type="datetime" v-model="selectedEvent.endTime"></Datetime>
                                </div>
                            </div>

                            <div v-else>
                                <div class="d-block text-center">
                                    <h3> Startdatum: </h3>
                                    <b-form-datepicker v-model="selectedEvent.start" class="mb-2"></b-form-datepicker>
                                </div>

                                <div class="d-block text-center">
                                    <h3> Enddatum: </h3>
                                    <b-form-datepicker v-model="selectedEvent.end" class="mb-2"></b-form-datepicker>
                                </div>
                            </div>


                            <v-card-text>
                                <span v-html="selectedEvent.details"></span>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text
                                       color="secondary"
                                       @click="editEvent(); selectedOpen = false">
                                    OK
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>



                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>
<script>
    import { Datetime } from 'vue-datetime';
  //  import 'vue-datetime/dist/vue-datetime.min.css'

    export default {
        components: {
            Datetime
        },
        data: () => ({

            colors: [
                { value: null, text: 'Please select an option' },
                { value: 'red', text: 'red' },
                { value: 'green', text: 'green' },
                { value: 'blue', text: 'blue' },
                { value: 'yellow', text: 'yellow' },
                { value: 'orange', text: 'orange' },
                { value: 'black', text: 'black' },
                { value: 'grey', text: 'grey' }
            ],

            datetime: '',
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            newMeeting: false,
            newMeetingValues: {
                name: '',
                start: null,
                end: null,
                startTime: null,
                endTime: null,
                color: 'black',
                timed: 'false'
            },
            events: [
                {
                    name: "Termin",
                    start: new Date('2021-01-20 09:00'),
                    end: new Date('2021-01-20 18:00'),
                    color: 'green',
                    timed: true
                },
                {
                    name: `Thomas Geburtstag`,
                    start: '2021-01-18',
                    color: 'red',
                    timed: false
                },
                {
                    name: 'Meeting',
                    start: new Date('2021-01-22 12:30'),
                    end: new Date('2021-01-22 15:30'),
                    color: 'blue',
                    timed: true
                },
                {
                    name: 'Messe',
                    start: '2021-01-20',
                    end: '2021-01-23',
                    color: 'blue', 
                    timed: false
                },
            ],
            dragEvent: null,
            dragStart: null,
            createEvent: null,
            createStart: null,
            extendOriginal: null,

        }),
        mounted() {
            this.$refs.calendar.checkChange()
        },
        methods: {
            createNewMeeting() {
                console.log(this.newMeetingValues);


                if (this.newMeetingValues.timed === 'false') {
                    this.createEvent = {
                        name: this.newMeetingValues.name,
                        color: this.newMeetingValues.color,
                        start: this.newMeetingValues.start,
                        end: this.newMeetingValues.end,
                        timed: false
                    }

                } else {
                    this.createEvent = {
                        name: this.newMeetingValues.name,
                        color: this.newMeetingValues.color,
                        start: new Date(this.newMeetingValues.startTime),
                        end: new Date(this.newMeetingValues.endTime),
                        timed: true
                    }

                }
                console.log(this.createEvent);
                this.events.push(this.createEvent);
                this.createEvent = null
            },

            editEvent() {
                if (this.selectedEvent.timed) {
                    console.log(this.selectedEvent);
                    var newStartDate = new Date(this.selectedEvent.startTime);
                    this.selectedEvent.start = newStartDate;
                    var newEndDate = new Date(this.selectedEvent.endTime);
                    this.selectedEvent.end = newEndDate;
                    console.log(this.selectedEvent);
                }
             
            },

            viewDay({ date }) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = ''
            },
            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            showEvent({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event

                    var newDate = new Date(event.start);

                    var year = newDate.getFullYear();
                    var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
                    var day = ("0" + newDate.getDate()).slice(-2);
                    var hours = ("0" + newDate.getHours()).slice(-2); 
                    var minutes = ("0" + newDate.getMinutes()).slice(-2); 

                    var startTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
                    console.log(startTime);

                    var newEndDate = new Date(event.end);

                    var yearEnd = newEndDate.getFullYear();
                    var monthEnd = ("0" + (newEndDate.getMonth() + 1)).slice(-2);
                    var dayEnd = ("0" + newEndDate.getDate()).slice(-2);
                    var hoursEnd = ("0" + newEndDate.getHours()).slice(-2); 
                    var minutesEnd = ("0" + newEndDate.getMinutes()).slice(-2); 

                    var endTime = yearEnd + '-' + monthEnd + '-' + dayEnd + 'T' + hoursEnd + ':' + minutesEnd;
                    console.log(endTime);

                    this.selectedEvent.startTime = startTime;
                    this.selectedEvent.endTime = endTime;


                    this.selectedElement = nativeEvent.target
                    setTimeout(() => {
                        this.selectedOpen = true
                    }, 10)
                }

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },

            startDrag({ event, timed }) {
                if (event && timed) {
                    this.dragEvent = event
                    this.dragTime = null
                    this.extendOriginal = null
                }
            },
            startTime(tms) {
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime === null) {
                    const start = this.dragEvent.start

                    this.dragTime = mouse - start
                } else {
                    this.createStart = this.roundTime(mouse)
                    this.createEvent = {
                        name: `Event #${this.events.length}`,
                        color: this.rndElement(this.colors).value ,
                        start: this.createStart,
                        end: this.createStart,
                        timed: true,
                    }

                    this.events.push(this.createEvent)
                }
            },
            extendBottom(event) {
                this.createEvent = event
                this.createStart = event.start
                this.extendOriginal = event.end
            },
            mouseMove(tms) {
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime !== null) {
                    const start = this.dragEvent.start
                    const end = this.dragEvent.end
                    const duration = end - start
                    const newStartTime = mouse - this.dragTime
                    const newStart = this.roundTime(newStartTime)
                    const newEnd = newStart + duration

                    this.dragEvent.start = newStart
                    this.dragEvent.end = newEnd
                } else if (this.createEvent && this.createStart !== null) {
                    const mouseRounded = this.roundTime(mouse, false)
                    const min = Math.min(mouseRounded, this.createStart)
                    const max = Math.max(mouseRounded, this.createStart)

                    this.createEvent.start = min
                    this.createEvent.end = max
                }
            },
            endDrag() {
                this.dragTime = null
                this.dragEvent = null
                this.createEvent = null
                this.createStart = null
                this.extendOriginal = null
            },
            cancelDrag() {
                if (this.createEvent) {
                    if (this.extendOriginal) {
                        this.createEvent.end = this.extendOriginal
                    } else {
                        const i = this.events.indexOf(this.createEvent)
                        if (i !== -1) {
                            this.events.splice(i, 1)
                        }
                    }
                }

                this.createEvent = null
                this.createStart = null
                this.dragTime = null
                this.dragEvent = null
            },
            roundTime(time, down = true) {
                const roundTo = 15 // minutes
                const roundDownTime = roundTo * 60 * 1000

                return down
                    ? time - time % roundDownTime
                    : time + (roundDownTime - (time % roundDownTime))
            },
            toTime(tms) {
                return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
            rndElement(arr) {
                return arr[this.rnd(0, arr.length - 1)]
            }

        },
    }
</script>

<style scoped lang="scss">
    .v-event-draggable {
        padding-left: 6px;
    }

    .v-event-timed {
        user-select: none;
        -webkit-user-select: none;
    }

    .v-event-drag-bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 4px;
        height: 4px;
        cursor: ns-resize;
        
     &::after {
        display: none;
        position: absolute;
        left: 50%;
        height: 4px;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        width: 16px;
        margin-left: -8px;
        opacity: 0.8;
        content: '';
    }

    &:hover::after {
        display: block;
    }
    }
    h3 {
        color: #c93e37;
    }

</style>