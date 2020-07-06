<template>
  <div>
    <!-- Image and text -->
    <b-navbar toggleable="lg" variant="faded" type="light">
        <b-navbar-brand href="/">
        <img src="../assets/icon.png" class="d-inline-block align-top" alt="icon" style="max-height: 30px;">
        gonulluplatformu.org
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" right>Proje Bul</b-nav-item>
            <b-nav-item href="#" right>Gönüllüler</b-nav-item>
            <b-nav-item href="/login" right>Giriş Yap</b-nav-item>
            <b-nav-item href="/register" right>Kayıt Ol</b-nav-item>
            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
                <em>Hesap</em>
            </template>
            <b-dropdown-item href="#">Profil</b-dropdown-item>
            <b-dropdown-item href="#">Çıkış Yap</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#" right><b-button size="sm" variant="info" pill>Proje Başlat</b-button></b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #313131;
}
div {
    margin: 5px 10px;
}
</style>
