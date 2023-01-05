<template>
  <div class="flex justify-content-center">
    <div class="col-12">
      <TopBar />
      <Panel :header="route.name?.toString()" class="mt-4">
        <slot />
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
