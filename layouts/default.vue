<template>
  <div>
    <div v-if="user">
      <span
        >Welcome, <a href="/api/auth/me">{{ user.nickname }}</a> |
        <a href="/api/auth/logout">Logout</a></span
      >
      <img
        class="rounded-full"
        :src="user.picture"
        height="64"
        width="64"
        alt="avatar"
      />
    </div>
    <div v-else>
      <a href="/api/auth/login">Login</a>
    </div>
    <NuxtLink to="/">Home</NuxtLink>
    <br />
    <NuxtLink to="/about">About</NuxtLink>
    <br />
    {{ user }}
    <slot></slot>
  </div>
</template>

<script setup>
const user = useState("user");
// console.log("layout", user.value);
</script>
