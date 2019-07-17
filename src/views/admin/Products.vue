<template>
  <q-page padding>
    <div class="row q-mt-sm">
      <div class="col-xs-12">
        <q-card class="my-card bg-grey-11" flat>
          <q-card-section>
            <div class="row items-center">
              <div class="col-xs-12 col-md-6 text-grey-9 q-pa-lg">
                <p class="text-h3">Products</p>
                <p
                  class="text-body1"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque velit veritatis delectus fuga facere corrupti ea nobis in, illum quae sit atque nihil eveniet eum ducimus porro similique maxime?</p>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-img src="https://placeimg.com/500/300/tech/grayscale" style="width: 100%"></q-img>
                <!-- <img src="../../assets/admin/products.svg" style="height: 500px; max-width: 400px"> -->
              </div>
            </div>
            <q-separator class="q-mt-lg q-mb-lg"/>
            <div class="row items-center">
              <div class="col-xs-12 text-grey-9 q-pl-lg">
                <div class="row">
                  <div class="text-h5">Product List</div>
                  <q-space />
                  <q-btn
                    @click="showProductDialog"
                    class="bg-primary text-white"
                    label="Add Product"
                  />
                </div>
                <q-separator class="q-mb-sm q-mt-sm" />
              </div>
              <div class="col-xs-12 text-grey-9 q-pl-lg q-pr-lg">
                <q-list v-if="products.length" bordered separator>
                  <q-item v-for="product in products" :key="product.id">
                      <img :src="showImage(product.images)" class="q-mr-md" width="80px" height="80px">
                    <q-item-section>
                      <q-item-label>{{ product.name }} - {{ product.price | currency('EGP ')}}</q-item-label>
                      <q-item-label caption v-html="product.description"></q-item-label>
                    </q-item-section>
                    <q-item-section top class="mobile-hide" side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                          @click="showEditProductDialog(product)"
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="edit"/>
                        <q-btn
                          @click="deleteProduct(product)"
                          class="gt-xs"
                          size="12px"
                          flat
                          dense
                          round
                          icon="delete"/>
                      </div>
                    </q-item-section>
                    <q-item-section top class="mobile-only" side>
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn size="12px" flat dense round icon="more_vert">
                          <q-menu transition-show="flip-right" transition-hide="flip-left">
                            <q-list style="min-width: 100px">
                              <q-item clickable>
                                <q-item-section @click="showEditProductDialog(product)">Edit</q-item-section>
                              </q-item>
                              <q-item clickable>
                                <q-item-section @click="deleteProduct(product)">Delete</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div v-else class="text-center">
                  <q-spinner-cube color="grey-9" size="3em"/>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>


    <!-- Start product dialog -->
    <q-dialog v-model="productDialog" persistent full-width>
      <q-card>
        <q-bar class="bg-primary text-white">
          <div>Add Product</div>
          <q-space/>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="row justify-between">
            <div class="col-xs-12 col-md-8 q-gutter-y-xs q-pa-xs">
              <q-input
                outlined
                v-model="product.name"
                label="Product Name"/>
              <q-editor 
                v-model="product.description"
                min-height="15rem" />
            </div>
            <div class="col-xs-12 col-md-4 q-gutter-y-xs q-pa-xs">
              <q-input
                outlined
                dense
                v-model="product.price"
                label="Product Price"
                type="number"/>
              <q-input
                outlined
                dense
                v-model="tag"
                @keyup.188="addTag"
                label="Product Tags"/>
              <div class="q-gutter-sm q-mt-xs q-mb-xs">
                <q-btn size="sm" color="primary" outline v-for="(tag, index) in product.tags" :key="index">
                  <span>{{tag}}</span>
                  <q-icon @click="removeTag(index)" name="fa fa-times" class="q-ml-sm" style="margin-right: -15px; font-size: 1rem;" />
                  
                </q-btn>
              </div>
              <input type="file" @change="uploadImage">
              <br>
              <q-linear-progress v-if="linear" dark query color="primary" class="q-mt-sm" />
              <div class="row">
                <div class="col-xs-3" v-for="(image, index) in product.images" :key="index">
                  <img :src="image" class="q-ma-xs" width="80px" height="80px" />
                  <span @click="deleteImage(image,index)" style="margin-right: -15px; margin-top: -100px; font-size: 1rem;">X</span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            v-if="dialog == 'edit'"
            label="Apply Changes"
            class="full-width bg-primary text-white"
            @click="updateProduct"/>
          <q-btn
            v-else
            label="Add New Product"
            class="full-width bg-primary text-white"
            @click="addProduct"/>
            <q-btn
            label="Cancel"
            class="full-width bg-red text-white q-mt-sm"
            v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- End product dialog -->
  </q-page>
</template>

<script>
import { fb, db } from '../../firebase'
export default {
  name: "AdminProducts",
  data() {
    return {
      product: {
        name: '',
        price: '',
        description: '',
        tags: [],
        images: []
      },
      tag: '',
      products: [],
      productDialog: false,
      dialog: '',
      linear: false,
      linearValue: 0
    };
  },
  firestore () {
    return {
      products: db.collection('products')
    }
  },
  methods: {
    addTag () {
      // console.log('tag')
      let str = this.tag.replace(/,\s*$/, "")
      if (this.product.tags.includes(str)) {
        this.tag = ''
        return
      }
      this.product.tags.push(str)
      this.tag = ''
    },
    removeTag (index) {
      this.product.tags.splice(index, 1)
    },
    clearProduct () {
      this.product.name = ''
      this.product.price = ''
      this.product.description = ''
      this.product.tags = []
      this.product.images = []
      this.linear = false
    },
    showProductDialog() {
      this.clearProduct()
      this.productDialog = true
    },
    addProduct () {
      this.$firestore.products.add(this.product)
      this.$q.notify({
        message: 'Added Successfuly',
        color: 'green',
        position: 'bottom-right',
        timeout: '1500'
      })
      this.productDialog = false
      this.clearProduct()
    },
    showEditProductDialog (product) {
      this.dialog = 'edit'
      this.product = product
      this.productDialog = true
    },
    updateProduct () {
      this.$firestore.products.doc(this.product.id).update(this.product)
      this.$q.notify({
        message: 'Updated Successfuly',
        color: 'green',
        position: 'bottom-right',
        timeout: '1500'
      })
      this.productDialog = false
      this.clearProduct()
    },
    deleteProduct (product) {
      // eslint-disable-next-line
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(product.id).delete()
          this.$q.notify({
            message: 'Deleted Successfuly',
            color: 'green',
            position: 'bottom-right',
            timeout: '1500'
          })
        }
      })
    },
    uploadImage (e) {
      this.linear = true
      let file = e.target.files[0]
      
      let storageRef = fb.storage().ref('products/' + file.name)
      let uploadTask = storageRef.put(file)
      
      uploadTask.on('state_changed', () => {
      }, (error) => {
        // eslint-disable-next-line
        console.log(error)
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.product.images.push(downloadURL)
          // console.log('File available at', downloadURL)
          this.linear = false
        })
      })

    },
    deleteImage (img, index) {
      let image = fb.storage().refFromURL(img)
      
      this.product.images.splice(index, 1)
      image.delete()
        .then(() => {
          this.$firestore.products.doc(this.product.id).update(this.product)
          this.$q.notify({
            message: 'Image Deleted',
            color: 'green',
            position: 'bottom-right',
            timeout: '1500'
          })
        }).catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    showImage(images) {
      return images[0]
    }
  },
  created() {
    
  }
};
</script>
