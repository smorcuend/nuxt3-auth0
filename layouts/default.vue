<template>
  <div>
    <div class="grid">
      <div class="col-12">
        <Menubar :model="items">
          <template #start>
            <h3>Nuxt3-Auth0</h3>
          </template>
          <template #end>
            <div v-if="user" class="flex align-items-center">
              <p class="mr-2">
                Welcome, {{ user.nickname }} | <a href="/api/auth/logout">Logout</a>
              </p>
              <Avatar :image="user.picture" shape="circle" />
            </div>
            <div v-else>
              <a href="/api/auth/login">Login</a>
            </div>
          </template>
        </Menubar>
        <Panel :header="route.name?.toString()">
          <slot />
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useUser()
const route = useRoute()

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
