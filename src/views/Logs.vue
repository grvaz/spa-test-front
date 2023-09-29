<template>
  <div>
    <h3 class="text-left">История</h3>
    <table class="table table-striped" v-if="logs.length">
      <thead>
      <tr>
        <th>Дата и время</th>
        <th>Действие</th>
        <th>Результат</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="log in logs">
        <td>{{ log.date }}</td>
        <td>{{ getActionName(log) }}</td>
        <td>{{ getActionResult(log) }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import { getActionResult, getActionName } from "@/components/logDecorator";

export default {
  name: "Logs",
  data() {
    return {
      logs: [],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    getActionResult,
    getActionName,
    fetchData() {
      this.leads = [];
      this.$http.get('/api/logs')
        .then(res => {
          this.logs = res.data;
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data?.message ?? "Неизвестная ошибка", {
            variant: "danger",
            title: "Ошибка",
            autoHideDelay: 3000,
          });
        });
    },
  },
}
</script>

<style scoped>

</style>