<template>
  <ArticleDetail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'
export default {
  name: 'CreateArticle',
  components: { ArticleDetail }
}
</script>

<style></style>
