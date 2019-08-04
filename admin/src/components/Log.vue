<template>
  <div>
    <!-- <Tabs v-model="currentTab" type="card" :animated="false" @on-click="toStaffVist">

      <TabPane label="员工管理" name="/">
          <people v-if="currentTab == '/'"></people>
      </TabPane>

      <TabPane label="角色管理" name="/role_managent">
          <role ></role>
      </TabPane>
    </Tabs> -->
    <div class="container">
        <div v-for="(item,index) in tabs" :key="item.name">
            <div @click="showComponent(index)">组件{{index}}</div>
            <component @click="showComponent(item.label)" :is="item.components" v-if="item.loaded"></component>
        </div>
    </div>
    <!-- <button @click="showComponent">点击加载</button> -->
    {{currentTab}}
  </div>
</template>

<script>
import people from './A.vue';
import role from './B.vue';

export default {
    data() {
        return {
            currentTab: '',
            tabs:[
                {
                    lable: '角色管理',
                    components:'role',
                    name: '/role1',
                    loaded: true
                },{
                    lable: '员工管理',
                    components:'people',
                    name: '/people2',
                    loaded: false
                },
                {
                    lable: '员工管理2',
                    components:'people',
                    name: '/people3',
                    loaded: false
                },
                {
                    lable: '角色管理',
                    components:'role',
                    name: '/role4',
                    loaded: true
                },{
                    lable: '员工管理',
                    components:'people',
                    name: '/people5',
                    loaded: false
                },
                {
                    lable: '员工管理2',
                    components:'people',
                    name: '/people6',
                    loaded: false
                }
            ]
        };
    },
    methods: {
        showComponent(val){
            console.log(val)
            this.$set(this.tabs[val],'loaded', 'true')
        },
        updateName(val) {
            this.name = val;
        },
        toStaffVist(tabsName) {
            // Vue.set(data,'sex', '男')
            console.log('toStaffVist'+tabsName)
        },
    },
    components: {
        people,
        role
    },
};
</script>