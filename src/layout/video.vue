<template>
  <div class="body">
        <router-view :key="key" />
    </div>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.path;
    },
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
