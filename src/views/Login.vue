<template>
    <b-card class="m-2">
<b-tabs content-class="mt-3">
            <!-- Tab 1 -->
    <b-tab title="Login">
         <label for="zugangskennung">Zuganskennung...</label>
     <input v-model="zugangsKennung" id="zugangskennung" type ="text" placeholder="">
    <label for="password">Passwort</label>
    <input v-model="passwort" id="password" type ="text" placeholder="">

                        <b-button @click="login()">Login</b-button>
    </b-tab>


    <b-tab title="Registrierung">
        <h5>Registriere dich hier mit deinem Uni-Account</h5>
        <p>Falls du Hilfe benötigst, wende dich an...</p>
         <b-button @click="registrieren()">Registrieren</b-button>
        
    </b-tab>
</b-tabs>
    </b-card>

</template>
<script>
</script>

