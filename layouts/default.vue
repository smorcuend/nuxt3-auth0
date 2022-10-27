<template>
  <div>
    <div class="grid">
      <div class="col-12">
        <Menubar :model="items" >
          <template #start>
            <img
              alt="logo"
              src="https://www.primefaces.org/primevue/img/logo.d32bce0e.svg"
              height="40"
              class="mr-2"
            />
          </template>
          <template #end>
            <div v-if="user">
              <span class="m-2">
                Welcome, <a href="/api/auth/me">{{ user.nickname }}</a> |
                <a href="/api/auth/logout">Logout</a>
              </span>
              <Avatar :image="user.picture" shape="circle" />
            </div>
            <div v-else>
              <a href="/api/auth/login">Login</a>
            </div>
          </template>
        </Menubar>
        <Panel :header="route.name.toString()">
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
    to: '/',
  },
  {
    label: 'About',
    icon: 'pi pi-fw pi-file',
    to: '/about',
  },
  {
    label: 'Profile',
    icon: 'pi pi-fw pi-user',
    to: '/profile',
    visible: user.value != null
  },
]
</script>
