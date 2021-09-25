<template>
  <div>
    <vue-aliplayer-v2 ref="VueAliplayerV2" :options="options" />
  </div>
</template>

<script>
import VueAliplayerV2 from "vue-aliplayer-v2";

import vod from "@/api/vod";

export default {
  layout: "video",
  data() {
    return {
      options: {
        encryptType: 1,
        vid: '',
        playauth: '',
        height: '800px'
      },
    };
  },
  components: {
    VueAliplayerV2,
  },
  mounted() {
    this.getPlayAuth();
  },
  methods: {
    // 获取视频凭证
    getPlayAuth() {
      vod.getPlayAuth(this.$route.params.id).then((result) => {
        this.$refs.VueAliplayerV2.options.vid = this.$route.params.id;
        this.$refs.VueAliplayerV2.options.playauth = result.data;
      });
    },
  },
};
</script>

