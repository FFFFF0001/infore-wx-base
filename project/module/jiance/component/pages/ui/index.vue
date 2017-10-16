<template>
  <div>
    <group title="盈峰微信移动框架" style="margin-top:20px;">
      <cell title="Demo" value="演示" link="/demo">
      </cell>
    </group>
  </div>
</template>

<script>
  import Group from 'vux/src/components/group/index.vue'
  import Cell from 'vux/src/components/cell/index.vue'

  export default {
    components: {
      Group,
      Cell
    },
    mounted () {
      console.log(this.router)
    }
  }
</script>
