<template>
  <b-modal
    id="new-contact"
    title="Привязать контакт"
    @ok.prevent="submit"
    :ok-disabled="buttonsDisabled"
    :cancel-disabled="buttonsDisabled"
  >
    <b-form ref="form" :validated="validated">
      <b-form-group label="Имя">
        <b-form-input required v-model="name"></b-form-input>
      </b-form-group>
      <b-form-group label="Телефон">
        <b-form-input required v-model="phone"></b-form-input>
      </b-form-group>
      <b-form-group label="Комментарий">
        <b-form-textarea required v-model="comment"></b-form-textarea>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "NewContactModal",
  props: {
    leadId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      name: "",
      phone: "",
      comment: "",
      validated: false,
      buttonsDisabled: false,
    }
  },
  methods: {
    submit() {
      this.validated = true;
      if (!this.name || !this.phone || !this.comment) {
        this.$bvToast.toast("Заполните все поля", {
          variant: "danger",
          title: "Ошибка",
          autoHideDelay: 3000,
        });
        return;
      }

      this.buttonsDisabled = true;
      this.$http.post("/api/leads/" + this.leadId + "/attach-contact", this.$data)
        .then(res => {
          this.$emit('contact-added', true);
        })
        .catch((err) => {
          this.$bvToast.toast(err.response.data?.message ?? "Неизвестная ошибка", {
            variant: "danger",
            title: "Ошибка",
            autoHideDelay: 3000,
          });
        })
        .finally(() => {
          this.$bvModal.hide('new-contact');
          this.buttonsDisabled = false;
          this.name = "";
          this.phone = "";
          this.comment = "";
          this.validated = false;
        });
    },
  }
}
</script>

<style scoped>

</style>