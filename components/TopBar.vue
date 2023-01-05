<template>
  <Menubar :model="items">
    <template #start>
      <img alt="logo" src="https://nuxt.com/assets/design-kit/logo/full-logo-green-dark.svg" height="40" class="mr-2">
      <span class="logo-title">+ Auth0</span>
    </template>
    <template #end>
      <div v-if="user" class="flex align-items-center">
        <p class="mr-2">Welcome, {{ user.nickname }} | <a href="/api/auth/logout">Logout</a></p>
        <Avatar :image="user.picture" shape="circle" />
      </div>
      <div v-else>
        <a href="/api/auth/login">
          <Button label="Login"></Button>
        </a>
      </div>
    </template>
  </Menubar>
</template>

<script setup>
const user = useUser()

const items = [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/'
  },
  {
    label: 'About',
    icon: 'pi pi-fw pi-file',
    to: '/about'
  },
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user',
    to: '/profile',
    visible: user.value != null
  }
]
</script>

<style scoped>
.logo-title {
  font-size: 2.3rem;
  font-weight: 600;
}
</style>
