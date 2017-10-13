<template>
  <div>
    <group title="UI延时" style="margin-top:20px;">
      <cell title="vux样式" value="查看" link="https://vux.li/demos/v2/#/">
      </cell>
      <input type="file" accept="image/*">拍照
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
<style>
  input[type='file'] {
    margin-left: 10px;
  }
</style>
