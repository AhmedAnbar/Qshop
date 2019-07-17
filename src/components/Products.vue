<template>
    <q-card class="bg-grey-11 q-mb-md" flat>
        <q-card-section>
            <div class="row items-center">
                <div class="col-xs-12 col-md-3 q-pa-sm" v-for="product in products" :key="product.id">
                    <q-card class="my-card q-pt-sm text-center">
                        <div class="q-pa-md">
                            <carousel :perPage='1' paginationActiveColor='#3F51B5' paginationColor="#C5CAE9">
                                <slide v-for="(img,index) in product.images" :key="index">
                                    <q-img :src="img" spinner-color="white" style="height: 140px; max-width: 150px" />
                                </slide>
                            </carousel>
                        </div>                        
                        <q-card-section>
                            {{ product.name }}<br>
                            {{ product.price | currency('EGP ') }}
                        </q-card-section>
                        <q-card-actions align="center">
                             <add-to-cart
                                :name="product.name"
                                :price="product.price"
                                :p-id="product.id"
                                :quantity=1
                                :image="showImage(product.images)" />                          
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<style>
</style>

<script>
import { db } from '../firebase'
import { Carousel, Slide } from 'vue-carousel'


export default {
  name: 'Products',
  firestore () {
    return {
      products: db.collection('products')
    }
  },
  data() {
      return {
          
      }
  },
  methods: {
    showImage(images) {
        return images[0]
    }
  },
  components: {
    Carousel,
    Slide,
    'add-to-cart': require('./AddToCart').default
  }
}
</script>
<style lang="scss" scoped>


</style>
