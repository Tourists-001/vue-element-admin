<template>
  <div class="todoapp">
    <!-- header -->
    <header class="header">
      <input
        class="new-todo"
        autocomplete="off"
        placeholder="Todo List"
        @keyup.enter="addTodo"
      >
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      >
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a
            :class="{ selected: visibility === key }"
            @click.prevent="visibility = key"
          >
            {{ key | capitalize }}
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import todo from './Todo.vue'
const STORAGE_KEY = 'todos'
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
const filters = {
  all: (todo) => todo,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done)
}
export default {
  components: { todo },
  filters: {
    // n: 要过滤的参数，w；传入的参数
    pluralize: (n, w) => (n === 1 ? w : w + 's'),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1) // 首字母大写
  },
  data() {
    return {
      todos: defalutList,
      visibility: 'all',
      filters
    }
  },
  computed: {
    allChecked() {
      return this.todos.every((todo) => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter((todo) => !todo.done).length
    }
  },
  methods: {
    /**
     * 写入本地保存
     */
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    // 添加任务
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
    },
    // 任务状态全部切换
    toggleAll({ done }) {
      this.todos.forEach((todo) => {
        todo.done = done
        this.setLocalStorage()
      })
    },
    // 任务状态切换
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    // 编辑任务
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    // 删除任务
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorage()
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
