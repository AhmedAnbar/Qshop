<template>
  <q-page padding>
    <div class="row q-mt-sm">
      <div class="col-xs-12">
        <q-card class="my-card bg-grey-11" flat>
          <q-card-section>
            <div class="row items-center">
              <div class="col-xs-12 col-md-6 text-grey-9 q-pa-lg">
                <p class="text-h3">Products</p>
                <p class="text-body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque velit veritatis delectus fuga facere corrupti ea nobis in, illum quae sit atque nihil eveniet eum ducimus porro similique maxime?</p>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-img
                  src="https://placeimg.com/500/300/tech/grayscale"
                  style="width: 100%"
                >
                </q-img>
                <!-- <img src="../../assets/admin/products.svg" style="height: 500px; max-width: 400px"> -->
              </div>
            </div>
            <q-separator class="q-mt-lg q-mb-lg" />
            <form @submit.prevent="validateProduct">
            <div class="row items-center">
              <div class="col-xs-12 text-grey-9 q-pl-lg">
                <p class="text-h5">Add Product</p>
              </div>
              <div class="col-xs-12 col-md-6 text-grey-9 q-pa-lg">
                <q-input
                  v-model="product.name"
                  ref="name"
                  :rules="[val => !!val || 'Field is required']"
                  label="Product Name" />
              </div>
              <div class="col-xs-12 col-md-6 text-grey-9 q-pa-lg">
                <q-input
                  v-model="product.price"
                  type="number"
                  ref="price"
                  :rules="[val => !!val || 'Field is required']"
                  label="Product Price" />
              </div>
              <div class="col-xs-12 q-pr-lg text-right">
                <q-btn class="bg-primary text-white" type="submit" label="Add" />
                
              </div>
            </div>
            </form>
            <div class="row items-center">
              <div class="col-xs-12 text-grey-9 q-pl-lg">
                <p class="text-h5">Product List</p>
              </div>
              <div class="col-xs-12 text-grey-9 q-pl-lg q-pr-lg">
                <q-list v-if="products.length" bordered separator>
                  <q-item v-for="product in products" :key="product.name">
                    <q-item-section>
                      <q-item-label>{{ product.data().name }}</q-item-label>
                      <q-item-label caption>{{ product.data().price }}</q-item-label>
                    </q-item-section>
                    <q-item-section top class="mobile-hide" side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn class="gt-xs" size="12px" @click="showEditProductDialog(product)" flat dense round icon="edit" />
                        <q-btn class="gt-xs" size="12px" @click="deleteProduct(product.id)" flat dense round icon="delete" />
                      </div>
                    </q-item-section>
                    <q-item-section top class="mobile-only" side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn size="12px" flat dense round icon="more_vert">
                        <q-menu
                          transition-show="flip-right"
                          transition-hide="flip-left"
                        >
                          <q-list style="min-width: 100px">
                            <q-item clickable @click="showEditProductDialog(product)">
                              <q-item-section>Edit</q-item-section>
                            </q-item>
                            <q-item clickable @click="deleteProduct(product.id)">
                              <q-item-section>Delete</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </q-item-section>
                  </q-item>
                </q-list>
                <div v-else class="text-center">
                    <q-spinner-cube
                        color="grey-9"
                        size="3em"
                    />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="editProductDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Product</div>
        </q-card-section>
        <q-card-section>
          <q-input label="Product Name" v-model="product.name" autofocus @keyup.enter="updateProduct" />
          <q-input label="Product Price" v-model="product.price" autofocus @keyup.enter="updateProduct" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat @click="updateProduct" label="Edit" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { db } from '../../firebase'
export default {
  name: 'AdminProducts',
  data () {
    return {
      product: {
        name: null,
        price: null
      },
      activeItem: null,
      products: [],
      editProductDialog: false
    }
  },
  methods: {
    watcher () {
      db.collection('products').onSnapshot((querySnapshot) => {
        this.products = []
        querySnapshot.forEach((doc) => {
          this.products.push(doc)
        })
      })
    },
    validateProduct () {
      this.$refs.name.validate()
      this.$refs.price.validate()
      if (!this.$refs.name.hasError && !this.$refs.price.hasError) {
        this.addProduct()
      }
    },
    addProduct () {
      db.collection('products').add(this.product)
        .then(() => {
          this.$q.notify({
            message: 'Product added successfully',
            color: 'green',
            position: 'top'
          })
          this.clearForm()
          this.watcher()
        })
        .catch((error) => {
          this.$q.notify({
            message: error,
            color: 'red',
            position: 'top'
          })
        })
    },
    clearForm () {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    readData () {
      db.collection('products').get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              this.products.push(doc)
          })
      })
    },
    deleteProduct (id) {
      this.$q.dialog({
        title: 'Delete',
        message: 'Would you like to delete this product?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        db.collection("products").doc(id).delete()
        .then(() => {
          this.watcher()
          this.$q.notify({
            message: 'Product Deleted',
            color: 'green',
            position: 'bottom-right'
          })
        })
        .catch()
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    showEditProductDialog (product) {
      this.editProductDialog = true
      this.product = product.data()
      this.activeItem = product.id
    },
    updateProduct () {
      this.editProductDialog = false
      db.collection("products").doc(this.activeItem).update(this.product)
        .then(() => {
          this.watcher()
          this.$q.notify({
            message: 'Product Updated',
            color: 'green',
            position: 'bottom-right'
          })
        })
        .catch()
    }
  },
  created () {
    this.readData()
  }
}
</script>
