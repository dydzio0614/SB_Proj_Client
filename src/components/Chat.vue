<template>
<div id="chatUI">
    <div class="form-group">
        <form>
            <div>
                <label for="userName">Your Name</label>
                <input type="text" name="Name" id="userName" v-model="userName">
            </div>
            <div>
                <label for="userMessage">Message</label>
                <input type="text" name="Message" id="userMessage" v-model="userMessage">
            </div>
            <button v-on:click="sendMessage" type="button">Submit</button>
        </form>
        <ul v-for="(item, index) in messages" v-bind:key="index + 'itemMessage'">
            <li><b>{{ item.user }}: {{ item.message }}</b></li>
        </ul>
    </div>
</div>
</template>

<script>
const SignalR = require('@aspnet/signalr')

export default {
  name: 'Chat',
  data () {
    return {
      userName: '',
      userMessage: '',
      messages: [],
      connection: ''
    }
  },
  methods: {
    sendMessage () {
      if (this.userName && this.userMessage) {
        this.connection
          .invoke('SendMessage', this.userName, this.userMessage)
          .catch(function (err) {
            return console.error(err.toSting())
          })

        this.userName = ''
        this.userMessage = ''
      }
    }
  },
  created: function () {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl('https://localhost:44397/chatHub')
      .build()
  },
  mounted: function () {
    var thisVue = this
    thisVue.connection.start()
    thisVue.connection.on('ReceiveMessage', function (user, message) {
      thisVue.messages.push({ user, message })
    })
  }
}
</script>
