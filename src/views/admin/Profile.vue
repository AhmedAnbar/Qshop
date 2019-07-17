<template>
  <q-page padding>
    <div class="row q-mt-sm">
      <div class="col-xs-12">
        <q-card class="my-card bg-grey-11" flat>
          <q-card-section>
            <div class="row items-center">
              <div class="col-xs-12 col-md-6 text-grey-9 q-pr-lg">
                <p class="text-h3">Profile</p>
                <p class="text-body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque velit veritatis delectus fuga facere corrupti ea nobis in, illum quae sit atque nihil eveniet eum ducimus porro similique maxime?</p>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-img
                  src="https://placeimg.com/500/300/people/grayscale"
                  style="width: 100%"
                >
                </q-img>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-xs-12">
        <q-card class="my-card" flat>
          <q-card-section>
            <q-tabs
              swipeable
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="profile" label="Profile" />
              <q-tab name="account" label="Account Setting" />
            </q-tabs>

            <q-separator />
            <q-tab-panels v-model="tab" animated swipeable>
            <q-tab-panel name="profile">
                <div class="row q-gutter-y-sm text-center">
                  <div class="col-xs-12 col-md-6">
                    <q-input autofocus v-model="profile.name" label="Full Name" class="q-pa-sm"/>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <q-input type="number" v-model="profile.phone" label="Phone" class="q-pa-sm"/>
                  </div>
                  <div class="col-xs-12">
                    <q-input v-model="profile.address" label="Address" class="q-pa-sm"/>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <q-input type="number" v-model="profile.postCode" label="Postcode" class="q-pa-sm"/>
                  </div>
                  <div class="col-xs-12 col-md-6 self-end">
                     <q-btn class="bg-primary text-white full-width" @click="updateProfile" label="Save Changes" />                    
                  </div>
                </div>
            </q-tab-panel>

            <q-tab-panel name="account">
              <div class="row q-gutter-y-sm text-center">
                <div class="col-xs-12 col-md-6">
                  <q-input autofocus v-model="account.displayName" label="User Name" class="q-pa-sm"/>
                </div>
                <div class="col-xs-12 col-md-6">
                  <q-input v-model="account.email" label="Email Address" type="email" class="q-pa-sm"/>
                </div>
                <div class="col-xs-12 col-md-6">
                  <q-input v-model="account.password" label="Password" type="password" class="q-pa-sm"/>
                </div>
                <div class="col-xs-12 col-md-6">
                  <q-input v-model="account.confirmPassword" label="Confirm Password" type="password" class="q-pa-sm"/>
                </div>
                <div class="col-xs-12 mobile-only">
                  <q-linear-progress v-if="linear" dark query color="primary" class="q-mt-sm" />
                  <img :src="account.photoURL" class="q-ma-xs" width="80px" height="80px" />
                </div>
                <div class="col-xs-12 col-md-6">
                  <q-input @change="uploadImage" type="file" class="q-pa-sm"/>
                </div>
                <div class="col-xs-12 col-md-6 desktop-only">
                  <q-linear-progress v-if="linear" dark query color="primary" class="q-mt-sm" />
                  <img :src="account.photoURL" class="q-ma-xs" width="80px" height="80px" />
                </div>
                <div class="col-xs-12 self-end">
                  <q-btn class="bg-primary text-white full-width" @click="updateAccount" label="Save Changes" />
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          </q-card-section>
        </q-card>        
      </div>
    </div>
  </q-page>
</template>

<script>
import { fb,db } from '../../firebase'
export default {
  name: 'AdminProfile',
  data () {
    return {
      tab: 'profile',
      profile: {
        name: '',
        phone: '',
        address: '',
        postCode: ''
      },
      account: {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        photoURL: ''
      },
      linear: false
    }
  },
  firestore () {
    const user = fb.auth().currentUser
    return {
      profile: db.collection('profiles').doc(user.uid)
    }
  },
  methods: {
    getAccount() {
      const user = fb.auth().currentUser
      if(user) {
        this.account.displayName = user.displayName
        this.account.email = user.email
        this.account.photoURL = user.photoURL
      }
      
    },
    updateProfile() {
      this.$firestore.profile.update(this.profile)
      this.$q.notify({
        message: 'Updated Successfuly',
        color: 'green',
        position: 'bottom-right',
        timeout: '1500'
      })
    },
    updateAccount() {
      let user = fb.auth().currentUser
      if(this.account.displayName == '' || this.account.email == '' || this.account.photoURL == '') {
        return false
      }
      if(this.account.displayName != user.displayName) {
        user.updateProfile({
          displayName: this.account.displayName
        }).then(() => {
          this.$q.notify({
            message: 'Name Updated',
            color: 'green',
            position: 'bottom-right',
            timeout: '1500'
          })
          this.$emit('updateUser')
        }).catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
      }
      
      if(this.account.email != user.email) {
        user.updateEmail(this.account.email)
          .then(() => {
            this.$q.notify({
              message: 'email Updated',
              color: 'green',
              position: 'bottom-right',
              timeout: '1500'
            })
          }).catch(error => {
            // eslint-disable-next-line
            console.log(error)
          })
      }

      if(this.account.password == this.account.confirmPassword && this.account.password != ''){
        user.updatePassword(this.account.password)
          .then(() => {
            this.$q.notify({
              message: 'Password Updated',
              color: 'green',
              position: 'bottom-right',
              timeout: '1500'
            })
            this.account.password = ''
            this.account.confirmPassword = ''
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error)
          })
      }
      
    },
    uploadImage (e) {
      this.linear = true
      let file = e.target.files[0]
      let random = Math.floor(Math.random() * (11111 - 99999 + 1) ) + 11111
      const user = fb.auth().currentUser
   
      let storageRef = fb.storage().ref('profiles/' + random + file.name)
      let uploadTask = storageRef.put(file)
      
      uploadTask.on('state_changed', () => {
      }, (error) => {
        // eslint-disable-next-line
        console.log(error)
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.account.photoURL = downloadURL
          // console.log('File available at', downloadURL)
          this.linear = false
          if(user.photoURL != downloadURL) {
            user.updateProfile({
              photoURL: downloadURL
            }).then(() => {
              this.$q.notify({
                message: 'Photo Updated',
                color: 'green',
                position: 'bottom-right',
                timeout: '1500'
              }) 
              this.$emit('updateUser')
            }).catch((error) => {
              // eslint-disable-next-line
              console.log(error)
            })
          }
        })
      })

    }
  },
  created() {
    this.getAccount()
  }
}
</script>
