<template>
  <section class="home">
    <div class="content">欢迎简单测试</div>
    <div id="protoId"></div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  mounted () {
    this.protoTest()
    this.typeTest()
  },
  methods: {
    createClass () {
      class Point {
        constructor (x, y) {
          this.x = x
          this.y = y
        }
        add () {
          return this.x + this.y
        }
      }
      let a = new Point(1, 2)
      console.log(a.add())
    },
    protoTest () {
      function Elem (id) {
        this.elem = document.getElementById(id)
      }
      Elem.prototype.html = function (val) {
        var elem = this.elem
        if (val) {
          elem.innerHTML = val
          console.log(this)
          return this // 链式操作
        } else {
          return elem.innerHTML
        }
      }
      Elem.prototype.on = function (type, fn) {
        var elem = this.elem
        elem.addEventListener(type, fn) // addEventListener() 方法用于向指定元素添加事件句柄
        // return this
      }
      var div1 = new Elem('protoId')
      div1.html('<p>hello killua</p>').on('click', function () {
        console.log(this)
        alert('clicked')
      })
      // div1.html('<p>hello killua</p>').on('click', function () {
      //   console.log(this)
      //   alert('clicked')
      // }).html('<p>javascript</p>')
    },
    typeTest () {
      // console.log([] == 0) // true
      // console.log(![] == 0) // true
      // console.log([] == ![]) // true
      // console.log([] == []) // false
      // console.log({} == !{}) // false
      // console.log({} == {}) // false
      console.log(Number([]))
      console.log(Number(![]))
      console.log(Number({}))
      console.log(Number(!{}))
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    .content {
      position: relative;
      font-size: 48px;
      color: #999;
      text-align: center;
      margin-top: 200px;
    }
  }
</style>
