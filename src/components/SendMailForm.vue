<template>

        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="emailTo"
                          label="To:"
                          label-for="emailTo">
                <b-form-input id="emailTo"
                              v-model="form.email"
                              type="email"
                              placeholder="Enter email"
                              required></b-form-input>
            </b-form-group>

            <b-form-group id="emailSubject"
                          label="Subject:"
                          label-for="subject">
                <b-form-input id="subject"
                              v-model="form.subject"
                              placeholder="Subject"
                              required></b-form-input>
            </b-form-group>

            <b-form-group id="emailText" label="Text:" label-for="emailText">
                <b-form-textarea id="emailText"
                                 v-model="form.text"
                                 required></b-form-textarea>
            </b-form-group>



            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>



</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '',
                    subject: '',
                    text: '',

                },
                show: true
            }
        },
        methods: {
            onSubmit() {
                alert("Email versenden");
                console.log(this.form);

            },
            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.subject = ''
                this.form.text = ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>