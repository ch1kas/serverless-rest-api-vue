
<template>
  <div id="app">
    <h1>List of Visitors</h1>
    <div class="add-visitor-wrapper">
      <input type="text" v-model="newVisitorFirstName">
      <input type="text" v-model="newVisitorLastName">
      <button @click="addVisitor">Add Visitor</button>
    </div>
    <div class="visitor" v-for="visitor in visitors" :key="visitor.id">
      <div>{{visitor.firstName}} {{visitor.lastName}}</div>
      <div>
      <span><button @click="updateVisitor(visitor.id)">Change</button></span>
      <span><button @click="removeVisitor(visitor.id)">X</button></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        newVisitorFirstName: "",
        newVisitorLastName: "",
        visitors: []
      }
    },
    async created() {
      const response = await fetch("https://jm6q3mn6nj.execute-api.us-east-1.amazonaws.com/visitors")
      this.visitors = await response.json()
    },
    methods: {
      async addVisitor() {
        let newVisitor = {
          id: 0,
          firstName: this.newVisitorFirstName,
          lastName: this.newVisitorLastName
        }

        await fetch("https://jm6q3mn6nj.execute-api.us-east-1.amazonaws.com/addVisitor", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newVisitor)
        })

        this.visitors.push(newVisitor)
        this.newVisitorFirstName = ""
        this.newVisitorLastName = ""
      },
      async removeVisitor(visitorId) {
        await fetch(`https://jm6q3mn6nj.execute-api.us-east-1.amazonaws.com/visitor/${visitorId}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json"
          }
        })
        this.visitors = this.visitors.filter( visitor => visitor.id !== visitorId)
      },
      async updateVisitor(visitorId) {
        let updatedVisitor = {
          firstName: this.newVisitorFirstName,
          lastName: this.newVisitorLastName
        }
        await fetch(`https://jm6q3mn6nj.execute-api.us-east-1.amazonaws.com/visitor/${visitorId}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedVisitor)
        })
      }
    }
  }
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 500px;
  margin: 0 auto;
}
button, input {
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid #aaa;
  margin: 5px;
}

.add-visitor-wrapper {
  display: flex;
}

.add-visitor-wrapper input {
  flex: 1;
}

.visitor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
  border-radius: 5px;
  margin: 5px 10px;
  padding: 5px 10px;
}

</style>
