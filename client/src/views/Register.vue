<template>
  <div id="app">
    <div class="container mx-auto">
      <h1 class="title">Kayıt Ol</h1>
      <div class="form-box">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email adresin"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Email adresini gir lütfen"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Adın Soyadın" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.fullname"
              required
              type="fullname"
              placeholder="Şifreni gir lütfen"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Okulunu Seç" label-for="input-2">
            <b-form-select 
            v-model="form.school" 
            :options="schools"
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-2" label="Şifren" label-for="input-2">
            <b-form-input
              id="input-3"
              v-model="form.password"
              required
              type="password"
              placeholder="Şifreni gir lütfen"
            ></b-form-input>
          </b-form-group>

          <b-button class="mr-3" type="submit" variant="outline-primary">Kayıt Ol</b-button>
          <b-button class="mr-3" type="reset" variant="outline-danger">Sil</b-button>
        </b-form>
        <!--<b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>-->
      </div>
      <p class="mt-2">Zaten bir hesabın var mı? <a href="/login">Giriş Yap</a></p>
      <div class="card mt-5">
        <div class="card-header">
          Özlü Söz
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        fullname: '',
        school: '',
      },
      schools: [
          { value: 'Robert Amerikan Lisesi', text: 'Robert Amerikan Lisesi' },
          { value: 'VKV Koç Özel Lisesi', text: 'VKV Koç Özel Lisesi' },
      ],
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.school = ''
      this.form.fullname = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'montserrat', sans-serif;
  margin: 0;
  padding: 0;
}
.title{
  margin: 25px;
}

.container {
  text-align: center;
  min-height: 100vh;
}

.form-box {
  padding: 25px;
}

</style>