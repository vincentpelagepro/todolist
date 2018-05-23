<template>
  <div class="card-todo-list">
    <ul>
      <transition-group name="list" tag="ul">
      <li v-for='(task, index) in tasks'
        v-bind:key="index"
        :class="task.done
        ? { taskTodo: !styles.taskDone, taskDone: styles.taskDone }
        : { taskTodo: styles.taskDone, taskDone: !styles.taskDone }"
      >
        <i v-if="task.done" @click="valideTask(task)" class="fas fa-check-circle"></i>
        <i v-else="!task.done" @click="valideTask(task)" class="fas fa-times-circle"></i>
        <template v-if="!task.editMode">
          <p @click="valideTask(task)">{{ task.name }}</p>
        </template>
        <template v-else="task.editMode">
          <div class="card-todo-list-input">
            <input
              :class="task.done
              ? { inputItem: true, green: !styles.taskColor, white: styles.taskColor }
              : { inputItem: true, green: styles.taskColor, white: !styles.taskColor }"
              v-model="task.name"
              @keypress.enter="updateTask(task)"
              placeholder="Edit task">
            </input>
            <i @click="task.name = ''" class="fas fa-times"></i>
          </div>

        </template>
        <div class="card-todo-list-icons">
          <i class="fas fa-edit" @click="task.editMode = !task.editMode"></i>
          <i class="fas fa-trash-alt" @click="deleteTask(task)"></i>
        </div>
      </li>
       </transition-group>
    </ul>
  </div>
</template>

<script>
import { eventBus } from './main';

export default {
  data(){
    return {
      tasks: [
        {
          name: 'Learn Vue.js',
          done: true,
          editMode: false,
        },
        {
          name: 'Learn in-depth Javascript',
          done: false,
          editMode: false,
        },
        {
          name: 'Learn React / Redux',
          done: true,
          editMode: false,
        },
      ],
      styles: {
        taskDone: true,
        taskColor: true,
      }
    }
  },
  methods: {
    updateTask: function(data){
      // @blur="updateTask(task)"
      const taskClicked = this.tasks.filter(task => {
        return task.name ===  data.name;
      })
      taskClicked[0].editMode = !taskClicked[0].editMode;
      this.tasksDoneCount();
    },
    deleteTask: function(data){
      const taskClicked = this.tasks.filter(task => {
        return task.name ===  data.name;
      })
      this.tasks.splice(this.tasks.indexOf(taskClicked[0]), 1)
      this.tasksDoneCount();
    },
    valideTask: function(data){
      const taskClicked = this.tasks.filter(task => {
        return task.name ===  data.name;
      })
      taskClicked[0].done = !taskClicked[0].done;
      this.tasksDoneCount();
    },
    tasksDoneCount: function(){
      let count = 0;
      this.tasks.map(task => {
        !task.done ? count++ : null;
      })
      eventBus.$emit('tasksDoneCount', {
        count: count,
      });
    },
  },
  created: function() {
   	this.tasksDoneCount();

    eventBus.$on('addTask', newTask => {
      this.tasks.push( newTask )
    });
    eventBus.$on('cancelTask', newTask => {
      this.tasks.pop();
    });
   },
}
</script>

<style lang="css">
  .card-todo-list {

  }

  .card-todo-list li {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    border-radius: 10px;
    padding: 0 20px;
    margin: 10px 0 10px;
  }

  .card-todo-list li:last-child {
    margin-bottom: 0px;
  }

  .card-todo-list p {
    cursor: pointer;
    width: 450px;
    padding: 20px;
    text-align: center;
  }

  .card-todo-list-input {
    display: flex;
    align-items: center;
  }

  .card-todo-list-input input {
    text-align: center;
    font-family: 'Exo', sans-serif;
    height: 35px;
    outline: none;
    background-color: transparent;
    border-right: none;
    border-left: none;
    border-top: none;
    border-bottom: 1px solid white;
    font-size: 24px;
    margin-right: 20px;
  }

  .card-todo-list-input .white {
    color: white;
  }

  .card-todo-list-input .green {
    color: #1A6F4B;
  }

  .card-todo-list-input input::placeholder {
    text-align: center;
    font-family: 'Exo', sans-serif;
  }

  .taskTodo {
    background-color: white;
    color: #1A6F4B;
    border: 1px solid #1A6F4B;
  }

  .taskDone {
    background-color: #1A6F4B;
    color: white;
    border: 1px solid white;
  }

  .fa-check-circle, .fa-times-circle{
    padding: 10px;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(30px);
  }

</style>
