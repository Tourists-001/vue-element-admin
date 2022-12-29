<template>
  <div class="components-container">
    <aside>
      drag-list base on
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">
        Vue.Draggable
      </a>
    </aside>
    <div class="editor-container">
      <dnd-list
        :list1="list1"
        :list2="list2"
        list1-title="List"
        list2-title="Article pool"
      />
    </div>
  </div>
</template>

<script>
import DndList from '@/components/DndList'
import { fetchList } from '@/api/article'
export default {
  name: 'DndListDemo',
  components: {
    DndList
  },
  data() {
    return {
      list1: [],
      list2: []
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const res = await fetchList()
      this.list1 = res.data.items.splice(0, 5)
      this.list2 = res.data.items
    }
  }
}
</script>

<style></style>
