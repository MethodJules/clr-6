<template></template>

<script>
import emailjs from "emailjs-com";

export default {
  methods: {
    sendEmail() {
      console.log(this.$refs.form);

      var templateParams = {
        name: "James",
        email: "Check this out!",
        message: "rdhfh",
      };

      emailjs
        .send(
          "service_1h8ohmh",
          "template_8ala1li",
          templateParams,
          "user_sECTHBIy6LTneEfcljkg9"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    },
  },
};
</script>
