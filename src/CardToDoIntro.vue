<template>
  <div class="card-todo-intro">
    <transition name="ease-in-out">
    <p v-if="tasksLeft > 0" key="1"><i class="fas fa-exclamation-triangle"></i>You have {{ tasksLeft }} task<span v-show="tasksLeft > 1">s</span> left</p>
    <p v-else key="2"><i class="fas fa-thumbs-up"></i>All tasks were successfully done</p>
    </transition>
    <div class="card-todo-intro-icons">
      <i v-if="!editModeGlobal" class="fas fa-plus-circle" @click="addTask"></i>
      <i v-else class="fas fa-ban" @click="cancelTask"></i>
    </div>
  </div>
</template>

<script>
import { eventBus } from './main'

export default {
  data(){
    return {
      tasksLeft: 0,
      editModeGlobal: false,
    }
  },
  methods: {
    addTask: function(){
      this.editModeGlobal = true;
      eventBus.$emit('addTask', {
        name: '',
        done: false,
        editMode: true,
      });
    },
    cancelTask: function(){
      eventBus.$emit('cancelTask', {});
      this.editModeGlobal = false;
    }
  },
  created(){
    eventBus.$on('tasksDoneCount', data => {
      this.tasksLeft = data.count;
      this.editModeGlobal = false;
    });
  }
}
</script>

<style lang="css">
  .card-todo-intro {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    color: white;
    background-color: #19374D;
    border-radius: 10px;
    padding: 0 20px 0 30px;
  }

  .fas {
    cursor: pointer;
  }

  .fa-thumbs-up, .fa-exclamation-triangle {
    margin-right: 10px;
  }

  .ease-in-out-enter-active {
    transition: opacity 3s;
  }

  .ease-in-out-enter {
    opacity: 0;
  }


</style>
