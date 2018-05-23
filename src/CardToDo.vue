<template>
  <div class="card-todo">
    <cardToDoIntro></cardToDoIntro>
    <cardToDoList></cardToDoList>
  </div>
</template>

<script>
import cardToDoIntro from './CardToDoIntro'
import cardToDoList from './CardToDoList'

export default {
  components: {
    cardToDoIntro: cardToDoIntro,
    cardToDoList: cardToDoList,
  }
}
</script>

<style lang="css">
  .card-todo {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
  }


</style>
