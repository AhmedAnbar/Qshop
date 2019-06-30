<template>
  <q-page padding>
    <hero />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  components: {
    'hero': require('../components/Hero').default
  }
}
</script>
