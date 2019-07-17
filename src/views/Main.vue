<template>
  <q-page padding>
    <hero />
    <products />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  components: {
    'hero': require('../components/Hero').default,
    'products': require('../components/Products').default
  },
  created() {
    
  }
}
</script>
