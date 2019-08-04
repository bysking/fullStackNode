<template>
    <div>
      <h1>你好这是子页面aaaaaaaaaa</h1>
    </div>
</template>

<script>

    export default {
        name: 'A',
        data() {
            return {}
        },
        methods: {
        },
        created() {
            console.log('子组件a请求数据')
        },
    };
</script>