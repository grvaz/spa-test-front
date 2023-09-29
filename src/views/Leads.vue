<template>
  <div>
    <h3 class="text-left">Сделки</h3>
    <table class="table table-striped" v-if="leads.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Дата создания</th>
          <th>Есть контакт</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads">
          <td>{{ lead.id }}</td>
          <td>{{ lead.name }}</td>
          <td>{{ getDate(lead.created_at) }}</td>
          <td>{{ getHasContacts(lead) }}</td>
          <td>
            <b-button :disabled="hasContacts(lead)" @click="newContact(lead)">
              Привязать контакт
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Загрузка...</div>
    <new-contact-modal :leadId="selectedLeadId" @contact-added="fetchData" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import NewContactModal from "@/components/NewContactModal";

export default {
  name: 'Leads',
  components: { NewContactModal },
  data() {
    return {
      leads: [],
      selectedLeadId: null,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.leads = [];
      this.$http.get('/api/leads')
        .then(res => {
          this.leads = res.data;
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data?.message ?? "Неизвестная ошибка", {
            variant: "danger",
            title: "Ошибка",
            autoHideDelay: 3000,
          });
        });
    },

    getDate(timestamp) {
      return dayjs.unix(timestamp).format("DD.MM.YYYY HH:mm");
    },

    hasContacts(lead) {
      return Boolean(lead?._embedded?.contacts?.length);
    },

    getHasContacts(lead) {
      return this.hasContacts(lead) ? 'Да' : 'Нет';
    },

    newContact(lead) {
      this.selectedLeadId = lead?.id;
      this.$bvModal.show('new-contact');
    },
  },
}
</script>
