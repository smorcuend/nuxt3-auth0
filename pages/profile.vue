<template>
  <Card>
    <template #title> Profile </template>
    <template #content>
      {{ user }}
    </template>
  </Card>
</template>

<script lang="ts" setup>
  const user = useUser();
</script>
