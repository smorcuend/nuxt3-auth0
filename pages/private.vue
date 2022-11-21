<template>
  <div class="grid">
    <div v-if="pending" class="col-12">
      Cargando datos...
    </div>
    <div v-else class="col-3" v-for="meme in memes">
      <Card>
        <template #title> {{ meme.name }}</template>
        <template #content>
          <Image :src="meme.url" :alt="meme.name" imageClass="box-image"></Image>
        </template>
      </Card>
    </div>

    <div v-if="error" class="col-12">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Meme } from '~/models/Meme'
const { data: memes, error, pending } = await useFetch<Meme[]>('/api/memes', {server: false})
</script>

<style>
.box-image {
  max-width: 100px;
}
</style>
