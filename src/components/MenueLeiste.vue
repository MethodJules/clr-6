<template>
  <b-navbar toggleable="lg" variant="secondary" type="dark" class="py-4" sticky>
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">CLR Tool</b-navbar-brand>
    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="start" to="/">Startseite</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/project">Projektbeschreibung</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/forum">Projektforum</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/group">Gruppenmanagement</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/settings">Einstellungen</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/projectlist">Projektliste</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item to="/documentation">Dokumentation</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  font-size: 1.2em;
}
.navbar-dark .navbar-nav .nav-link:active {
  color: white !important;
}

.navbar-dark .navbar-brand {
  font-size: 1.6em !important;
}
</style>





