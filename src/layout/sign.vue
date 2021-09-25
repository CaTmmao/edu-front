<template>
  <div class="sign" id="header">
    <h1 id="logo">
      <router-link to="/" title="在线教育">
        <img src="@/assets/img/logo.png" width="100%" alt="在线教育" />
      </router-link>
    </h1>
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

