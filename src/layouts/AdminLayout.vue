<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class="menu"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Vue Shop Admin
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs swipeable>
        <q-route-tab
        v-for="nav in navs"
          :key="nav.label"
          :icon="nav.icon"
          :to="nav.to"
          exact
          :label="nav.label"
        />
        <q-tab name="logout" @click="signOut" icon="power_settings_new" label="Logout" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :breakpoint="767"
      :width="250"
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img :src="image">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-center">{{ name }}</q-item-section>
          
        </q-item>
        <q-separator />
        <q-item-label header>Navigation</q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          clickable
          :to="nav.to"
          exact>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Singout -->
        <q-item clickable @click="signOut">
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign Out</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view v-on:updateUser="getUser"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { fb } from '../firebase'

export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: 'Overview',
          to: '/admin',
          icon: 'dashboard'
        },
        {
          label: 'Products',
          to: '/admin/products',
          icon: 'list'
        },
        {
          label: 'Orders',
          to: '/admin/orders',
          icon: 'shopping_cart'
        },
        {
          label: 'Profile',
          to: '/admin/profile',
          icon: 'fa fa-user'
        }
      ],
      name: '',
      email: '',
      image: ''
    }
  },
  methods: {
    signOut() {
      fb.auth().signOut()
      this.$router.replace('/')
      this.$q.notify({
        message: 'Singout successful',
        color: 'orange',
        position: 'top'
      })
    },
    getUser() {
      let user = fb.auth().currentUser

      if (user) {
          this.name = user.displayName
          this.image = user.photoURL
          this.email = user.email
      }
    }
  },
  created() {
    this.getUser()
    this.$on('updateUser', () => {this.getUser()})
  }
}
</script>
<style lang="scss">
@media screen and (min-width: 768px) {
    .q-footer {
      display: none;
    }
}
@media screen and (max-width: 767px) {
    .menu {
      display: none;
    }
}
</style>