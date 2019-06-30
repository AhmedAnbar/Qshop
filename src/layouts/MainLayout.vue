<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Vue Shop
        </q-toolbar-title>
        <q-input dark dense standout v-model="search" input-class="text-left" class="q-ml-md mobile-hide">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <q-btn class="bg-indigo-3 q-ml-md" @click="loginDialog = true" label="Get Started"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="loginDialog">
      <q-card  style="width: 400px">
        <q-card-section >
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated swipeable>
            <q-tab-panel name="login">
                <div class="row q-gutter-sm text-center">
                  <div class="col-xs-12">
                    <p class="text-h5">Login To Your Account</p>
                  </div>
                  <div class="col-xs-12">
                    <q-input type="email" autofocus v-model="login.email" label="Enter email" />
                  </div>
                  <div class="col-xs-12">
                    <q-input type="password" v-model="login.password" @keyup.enter="loginUser" label="Password" />
                  </div>
                  <div class="col-xs-12">
                    <q-btn color="primary" label="login" @click="loginUser" class="q-mt-md" />
                  </div>
                </div>
            </q-tab-panel>

            <q-tab-panel name="register">
              <div class="row q-gutter-sm text-center">
                <div class="col-xs-12">
                  <p class="text-h5">Create New Account</p>
                </div>
                <div class="col-xs-12">
                  <q-input v-model="register.name" label="Your nice name" autofocus />
                </div>
                <div class="col-xs-12">
                  <q-input type="email" v-model="register.email" label="Enter email" />
                </div>
                <div class="col-xs-12">
                  <q-input type="password" v-model="register.password" label="Password" />
                </div>
                <div class="col-xs-12">
                  <q-btn color="primary" @click="registerUser" label="Register" class="q-mt-md"/>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { fb } from '../firebase'

export default {
  name: 'MainLayout',

  data () {
    return {
      register: {
        name: '',
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      },
      search: '',
      loginDialog: false,
      tab: 'login'
    }
  },
  methods: {
    registerUser () {
      fb.auth().createUserWithEmailAndPassword(this.register.email, this.register.password)
        .then(() => {
          this.$router.replace('admin')
          this.$q.notify({
            message: 'Register successful',
            color: 'green',
            position: 'top'
          })
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode == 'auth/weak-password') {
            this.$q.notify({
              message: 'The password is too weak.',
              color: 'red',
              position: 'top'
            })
          } else if(errorCode == 'auth/email-already-in-use') {
            this.$q.notify({
              message: 'Email alredy in use',
              color: 'red',
              position: 'top'
            })
          } else {
            alert(errorMessage)
          }
        })
    },
    loginUser () {
      fb.auth().signInWithEmailAndPassword(this.login.email, this.login.password)
        .then(() => {
          this.$router.replace('admin')
          this.$q.notify({
            message: 'Signin successful',
            color: 'green',
            position: 'top'
          })
        })
        .catch((error) => {
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            this.$q.notify({
              message: 'Wrong password.',
              color: 'red',
              position: 'top'
            })
          } else if (errorCode === 'auth/invalid-email') {
            this.$q.notify({
              message: 'Invalid email.',
              color: 'red',
              position: 'top'
            })
          } else if (errorCode === 'auth/user-disabled') {
            this.$q.notify({
              message: 'User is disabled.',
              color: 'red',
              position: 'top'
            })
          }else if (errorCode === 'auth/user-not-found') {
            this.$q.notify({
              message: 'User not found.',
              color: 'red',
              position: 'top'
            })
          } else {
            alert(errorMessage)
          }
        })
    }
  }
}
</script>
