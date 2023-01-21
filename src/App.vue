<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: "App",
  created() {

  },
  methods: {

    getCookie(name) {
      // console.log(name);
      name = name + "=";

      var start = document.cookie.indexOf(name);
      var value = null;

      if (start > -1) {
        var end = document.cookie.indexOf(";", start);

        if (end === -1) {
          end = document.cookie.length;
        }

        value = document.cookie.substring(start + name.length, end);
      }

      return value;
    },
  },
};
</script>
<style lang="scss">
p {
  margin: 0;
}

.breadcrumb {
  height: 50px;
  line-height: 48px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 1px 5px 0 rgb(0 0 0 / 20%);
  padding-left: 24px;

  display: flex;

  p {
    //   margin: 0;
    font-size: 20px;
    font-weight: 500;
    -ms-flex-item-align: center;
    align-self: center;
    color: black;
    cursor: pointer;
  }
}

.el-card__body {
  padding: 0;
}
</style>
