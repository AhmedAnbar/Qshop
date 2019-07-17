<template>
    <div class="add-to-cart">
        <q-btn class="bg-primary text-white" label="Add To Cart" @click="showCart" />



        <q-dialog v-model="cart" persistent full-width>
            <q-card>
                <q-bar>
                <div>My Cart</div>

                <q-space />

                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip>Close</q-tooltip>
                </q-btn>
                </q-bar>

                <q-card-section>
                    <q-list class="text-left">
                        <div class="row">
                            <div class="col-xs-12 col-md-6" v-for="product in this.$store.state.cart" :key="product.id">
                                <q-item clickable>
                                    <q-img :src="product.image" class="q-mr-sm" spinner-color="white" style="height: 140px; max-width: 150px" />
                                    <q-item-section>
                                        <q-item-label>{{product.name}}</q-item-label>
                                        <q-item-label>Price: {{product.price | currency('EGP ')}}</q-item-label>
                                        <q-item-label caption>Quantity: {{product.quantity}}</q-item-label>
                                    </q-item-section>
                                    <q-item-section side> <q-btn flat icon="fa fa-trash" @click="$store.commit('removeItem', product)" /></q-item-section>
                                </q-item>
                            </div>
                            <div class="col-xs-12 q-gutter-sm">
                                <q-separator class="q-mb-sm" />
                                <q-btn class="bg-green text-black" @click="checkout" label="Chekout" />
                                <q-btn class="bg-primary text-white" @click="hideCart" label="Continu Shoping" />
                            </div>
                        </div>
                    </q-list>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<style>
</style>

<script>
export default {
  name: 'add-to-cart',
  data() {
      return {
          product: {
            name: this.name,
            id: this.pId,
            price: this.price,
            quantity: this.quantity,
            image: this.image 
          },
          cart: false,
      }
  },
  props: {
      name: String,
      price: String,
      pId: String,
      image: String,
      quantity: Number
  },
  methods: {
      
      showCart() {
          this.$store.commit('addToCart', this.product)
          this.cart = true
      },
      hideCart() {
          this.cart = false
      },
      checkout() {
          this.cart = false
          this.$router.push('/checkout')
      }
  }
}
</script>
<style lang="scss" scoped>

</style>
