<!--  Component for the calendar -->
<template>
    <div class="home">
        <v-row class="fill-height">
            <v-col>
                <!-- Toolbar-->
                <v-sheet height="64">
                    <v-toolbar flat>
                        <!-- Button to get back to today in Calendar -->
                        <v-btn outlined
                               class="mr-4"
                               color="grey darken-2"
                               @click="setToday">
                            Today
                        </v-btn>

                        <!-- Button to navigate backwards between Month, Week, Day -->
                        <v-btn fab
                               text
                               small
                               color="grey darken-2"
                               @click="prev">
                            <v-icon small>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>

                        <!-- Button to navigate forward between Month, Week, Day -->
                        <v-btn fab
                               text
                               small
                               color="grey darken-2"
                               @click="next">
                            <v-icon small>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>

                        <!-- Show month in Toolbar -->
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>

                        <!-- space between next element -->
                        <v-spacer></v-spacer>


                        <!-- create New Meeting-Menu -->
                        <v-menu v-model="newMeeting"
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-x>
                            <!-- Template to create new Meeting-Menu, Button to open v-card -->
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn outlined
                                       color="grey darken-2"
                                       v-bind="attrs"
                                       v-on="on">
                                    New Meeting
                                </v-btn>
                            </template>

                            <!-- Menu / Card to create a new meeting -->
                            <v-card color="grey lighten-4"
                                    min-width="350px"
                                    flat>
                                <!-- Toolbar, colors by Color of chosen color, shows name of the Event -->
                                <v-toolbar :color="newMeetingValues.color"
                                           dark>
                                    <v-toolbar-title v-html="newMeetingValues.name"> </v-toolbar-title>

                                </v-toolbar>

                                <!-- Content of the Card -->
                                <div id="content">
                                    <!-- Name -->
                                    <div class="d-block text-center">
                                        <h3>Name: </h3>
                                        <b-form-input v-model="newMeetingValues.name" placeholder="Name"></b-form-input>
                                    </div>

                                    <!-- Color -->
                                    <div class="d-block text-center">
                                        <h3>Farbe: </h3>
                                        <b-form-select v-model="newMeetingValues.color" :options="colors"></b-form-select>
                                    </div>

                                    <!-- Radio-button to chose, if event is timed or not (event with time or whole day(s)) -->
                                    <div class="d-block text-center">
                                        <h3>Timed: </h3>
                                        <b-form-group v-slot="{ ariaDescribedby }">
                                            <b-form-radio v-model="newMeetingValues.timed" :aria-describedby="ariaDescribedby" value="true">Yes</b-form-radio>
                                            <b-form-radio v-model="newMeetingValues.timed" :aria-describedby="ariaDescribedby" value="false">No</b-form-radio>
                                        </b-form-group>
                                    </div>

                                    <!-- Timed-Event, set start and end time, with hours  -->
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

                                    <!-- Not Timed-Event, set start and end day  -->
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

                                </div>

                                <!-- Button to create new event -->
                                <v-card-actions>
                                    <v-btn text
                                           color="secondary"
                                           @click="createNewMeeting(); newMeeting = false">
                                        OK
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                        </v-menu>

                        <!-- Menu to switch between different calendar-views (Day, Week, Month) -->
                        <v-menu bottom
                                right>
                            <!-- Template to create Switch-View-Menu, Button to open list -->
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

                            <!-- Pick list to change view -->
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

                <!-- Calendar-View -->
                <v-sheet height="600">
                    <!-- Create Calendar-Element, with different Events
                        v-model -> currently chosen Day
                        events -> List of registered events
                        event-color -> Colors events by selected color
                        type -> Kind of View (Month, Week, Day)
                        
                        @click:event -> action, if click on an event 
                        @click:more -> action, if click on show more events
                        @click:date -> action, if click on show a day
                        @mousedown: event -> if mousedown on event, move the event
                        @mousedown: time -> if mousedown on time in a day 
                        @mousemove: time -> if mousemove on time in a day               -> Create New Event inside calendar
                        @mouseup: time -> if mouseup on tine in a day 


                    -->
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
                                @mouseleave.native="cancelDrag"
                                >

                    <!-- Template to extend Event, change time inside Calendar -->
                        <template v-slot:event="{ event, timed, eventSummary }">
                            <div class="v-event-draggable"
                                 v-html="eventSummary()"></div>
                            <div v-if="timed"
                                 class="v-event-drag-bottom"
                                 @mousedown.stop="extendBottom(event)"></div>
                        </template>
                    </v-calendar>

                    <!-- Menu to edit Event, if click on it -->
                    <v-menu v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x>
                        <!-- show selected Event -->
                        <v-card color="grey lighten-4"
                                min-width="350px"
                                flat>
                             <!-- Toolbar, colors by Color of chosen color, shows name of the Event -->
                            <v-toolbar :color="selectedEvent.color"
                                       dark>
                                <v-toolbar-title v-html="selectedEvent.name"> </v-toolbar-title>
                            </v-toolbar>

                            <!--  Content of the card -->
                            <div id="content"> 
                                <!-- name-->
                                <div class="d-block text-center">
                                    <h3>Name: </h3>
                                    <b-form-input v-model="selectedEvent.name" placeholder="Name"></b-form-input>
                                </div>
                                <!-- color -->
                                <div class="d-block text-center">
                                    <h3>Farbe: </h3>
                                    <b-form-select v-model="selectedEvent.color" :options="colors"></b-form-select>
                                </div>

                                <!-- if timed event, change start and endtime with hours -->
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
                                <!-- if not timed event, change start and endtime -->
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
                            </div>
                            <!-- Button to change event -->
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

    export default {
        components: {
            Datetime
        },
        data: () => ({

            // List of colors for selecting Event-Color
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

            // focused Day
            focus: '',
            // choosen Typ of View
            type: 'month',
            // Different Typs of views
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
            },
            // current selected Event, for editing Event
            selectedEvent: {},

            // current selected Element, for editing Event
            selectedElement: null,

            //// to determine whether the edit Menu should be open or closed
            selectedOpen: false,

            //  to determine whether the new meeting Menu should be open or closed
            newMeeting: false,
            // Values for the new meeting, preselect attributes
            newMeetingValues: {
                name: '',
                start: null,
                end: null,
                startTime: null,
                endTime: null,
                color: 'black',
                timed: 'false'
            },
            // List of events inside calendar 
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

            // variables to create and edit event
            dragEvent: null,
            createEvent: null,
            createStart: null,
            extendOriginal: null,

        }),

        mounted() {
            // check for change in start and end dates
            this.$refs.calendar.checkChange()
        },
        methods: {
            /* 
             * Create a new Meeting    
             * Check, if timed meeting or not and set values 
             */
            createNewMeeting() {
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
                this.events.push(this.createEvent);
                this.createEvent = null
            },

            // Edit an event, change Start and Endtime 
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

            // change view to Date-view
            viewDay({ date }) {
                this.focus = date
                this.type = 'day'
            },
            // get the Color of the event
            getEventColor(event) {
                return event.color
            },
            // change Focus to today
            setToday() {
                this.focus = ''
            },
            // switch view to previous day, week, month
            prev() {
                this.$refs.calendar.prev()
            },
            // switch view to next day, week, month
            next() {
                this.$refs.calendar.next()
            },

            /*
             * show current selected Event 
             * Change dateformat to show it correctly to the calendar
             * open or close Event-Dialog
             */
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

            // start Dragging of an event, set dragable Event, prepare dragging 
            startDrag({ event, timed }) {
                if (event && timed) {
                    this.dragEvent = event
                    this.dragTime = null
                    this.extendOriginal = null
                }
            },

            /* 
             * set Starttime of an selected Event
             * Create new Event, set startTime 
             */
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

            // Extend an Event, change start and end time (longer or shorter)
            extendBottom(event) {
                this.createEvent = event
                this.createStart = event.start
                this.extendOriginal = event.end
            },

            /* 
             * If selected Event -> move this event
             * Is not selected Event -> change length of the new created event (start and endtime) 
             */
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
            // stop dragging, set values back to null, to stop dragging 
            endDrag() {
                this.dragTime = null
                this.dragEvent = null
                this.createEvent = null
                this.createStart = null
                this.extendOriginal = null
            },

            // cancel Drag if leaving Calendarelement
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
            // round time to 15 Minutes inside calendar view
            roundTime(time, down = true) {
                const roundTo = 15 // minutes
                const roundDownTime = roundTo * 60 * 1000

                return down
                    ? time - time % roundDownTime
                    : time + (roundDownTime - (time % roundDownTime))
            },

            //change variable to Datelement  
            toTime(tms) {
                return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
            },

            // get random Color for next Event, if create a new one inside the calendar
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