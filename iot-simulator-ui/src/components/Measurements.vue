<template>
  <div>
    <div v-for='measurement in measurements'>
      <pre>{{measurement}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.createConnection();
  },
  data () {
    return {
      socket: null,
      measurements: [],
    }
  },
  methods: {
    createConnection () {
      this.socket = new WebSocket(process.env.API_URL);
      this.socket.onclose = () => {
        this.createConnection();
      };
      this.socket.onmessage = this.onMessage;
    },
    onMessage (msg) {
      this.measurements.unshift(JSON.parse(msg.data));
    },
  }
}
</script>

<style scoped>
pre {
  display: inline-block;
  background-color: #FFFFFF;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
</style>
