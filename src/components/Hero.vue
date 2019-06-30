<template>
    <q-card class="bg-grey-11 q-mb-md" flat>
        <q-card-section>
        <div class="row items-center">
            <div class="col-xs-12 col-md-6">
            <div class="q-ma-lg">
                <p class="text-h3 text-grey-9">Vue Shop</p>
                <p class="text-body1 text-grey-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat distinctio maiores est quisquam vero totam quae optio quis, dignissimos facere voluptatem esse eligendi voluptatibus quia debitis nihil quibusdam nisi rem.</p>
            </div>
            <div class="q-ma-lg">
                <q-btn color="primary" text-color="white" label="Explore" />
                <q-btn class="q-ml-lg" color="white" text-color="primary" outline label="Products" />
            </div>
            </div>
            <div class="col-xs-12 col-md-6">
            <img class="lg-img" src="../assets/undraw_deliveries_131a.svg" style="height: 500px; max-width: 400px" />
            </div>
        </div>
        </q-card-section>
    </q-card>
</template>

<style>
</style>

<script>
export default {
  name: 'Hero'
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1023px) {
    .lg-img {
      display: none;
    }
}
</style>
