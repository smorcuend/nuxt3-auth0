<template>
  <div>
    <div class="grid" v-if="data">
      <div class="col-3">
        <Card v-for="meme in data.memes">
          <template #title> {{ meme.name }}</template>
          <template #content>
            <Image :src="meme.url" :alt="meme.name" imageClass="box-image"></Image>
          </template>
        </Card>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const { data, error } = await useFetch('/api/example', { server: false })
if (error) {
}
</script>

<style>
.box-image {
  max-width: 500px;
}
</style>
