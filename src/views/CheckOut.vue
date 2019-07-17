<template>
  <q-page padding class="checkout">
    <div class="row">
      <div class="col">
        <q-card flat bordered>
          <q-card-section>
            <q-list class="text-left">
              <div class="row">
                  <div class="col-xs-12 col-md-9" >
                      <div class="row">
                        <div class="col-xs-12 col-md-6" v-for="product in this.$store.state.cart" :key="product.id">
                          <q-item clickable>
                            <q-img :src="product.image" spinner-color="white" style="height: 140px; max-width: 150px" />
                            <q-item-section>
                                <q-item-label>{{product.name}}</q-item-label>
                                <q-item-label>Price: {{product.price | currency('EGP ')}}</q-item-label>
                                <q-item-label caption>Quantity: {{product.quantity}}</q-item-label>
                            </q-item-section>
                            <q-item-section side> <q-btn flat icon="fa fa-trash" @click="$store.commit('removeItem', product)" /></q-item-section>
                          </q-item>
                        </div>
                      </div>
                  </div>
                <div class="col-xs-12 col-md-3 text-center self-start">
                  <p class="text-h4 text-primary">Total Price</p>
                  <p>{{ total | currency('EGP ') }}</p>
                </div>
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </div>  
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'check-out',
  data() {
    return {
      cart: null,
      total: ''
    }
  },
  created() {
    this.cart = this.$store.getters.cart
    this.total = this.$store.getters.total
    if(Object.keys(this.cart).length < 1) {
      this.$router.push('/')
    }
  }
}
</script>
