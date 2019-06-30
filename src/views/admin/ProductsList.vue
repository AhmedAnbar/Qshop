<template>
  <div>
      <q-list v-if="products.length" bordered separator>
      <q-item clickable v-ripple v-for="product in products" :key="product.name">
        <q-item-section>
          <q-item-label>{{ product.name }}</q-item-label>
          <q-item-label caption>{{ product.price }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else class="text-center">
        <q-spinner-cube
            color="grey-9"
            size="6em"
        />
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
export default {
  name: 'AdminOrdersList',
  data () {
      return {
          products: []
      }
  },
  props: {
      chield: {type: Boolean}
  },
  methods: {
      readData () {
        db.collection('products').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                this.products.push(doc.data())
            })
        })
      }
  },
  created () {
        this.readData()
        if (this.chield) {
            this.readData()
        }
  }
}
</script>
