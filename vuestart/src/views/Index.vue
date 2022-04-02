<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-input
        filled
        ref="username"
        v-model="username"
        label="Username"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length >= 5) ||
            'Por favor, ingresa un nombre de usuario con más de 5 caracteres',
        ]"
      />

      <div>
        <q-btn label="Agregar Usuario" v-on:click="addUser" color="primary" />
        <q-btn
          label="Reset"
          v-on:click="onReset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn
          color="red"
          v-on:click="deleteAllUsers"
          label="Eliminar todos los usuarios"
          class="q-ml-sm"
        />
        <q-btn
          color="red"
          class="q-ml-sm"
          :disabled="selected.length == 0"
          v-on:click="deleteSelectedUsers"
          label="Eliminar usuarios seleccionados"
        />
      </div>
    </div>
  </div>
  <template v-if="loading">
    <div class="spinner-container">
      <q-spinner color="primary" size="3em" :thickness="10" />
    </div>
  </template>
  <template v-else>
    <div class="q-pa-md">
      <q-table
        v-model:selected.sync="selected"
        selection="multiple"
        :rows-per-page-options="[20]"
        :columns="columns"
        :rows="rows"
        row-key="id"
      >
      </q-table>
    </div>
  </template>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

const columns = [
  { name: "id", label: "Id", field: "id", sortable: true },
  { name: "username", label: "Username", field: "username" },
];

export default {
  data() {
    return {
      loading: true,
      rows: {},
      columns,
      selected: [],
      username: "",
      disableDeleteAll: true,
    };
  },
  methods: {
    magic() {
      console.log(this.selected.length);
    },
    addUser() {
      if (this.$refs.username.validate()) {
        this.loading = true;
        axios
          .post("http://localhost:8000/users", {
            username: this.username,
          })
          .then((response) => {
            Swal.fire(response.data);
            this.getUsers();
          })
          .catch((err) => console.log("custom error ", err.err));
      }
    },
    getUsers() {
      console.log("some");
      axios.get("http://localhost:8000/users").then((response) => {
        console.log(response);
        this.rows = response.data;
        this.loading = false;
      });
    },
    deleteAllUsers() {
      Swal.fire({
        title: "Seguro?",
        text: "Estás a punto de eliminar a todos los usuarios, ¿deseas continuar?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar todos los usuarios",
        denyButtonText: `No eliminar`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8000/users").then((response) => {
            Swal.fire(response.data);
            this.getUsers();
            this.loading = false;
          });
        }
      });
    },
    deleteSelectedUsers() {
      let selectedUsers = JSON.parse(JSON.stringify(this.selected));
      axios
        .delete("http://localhost:8000/users/all", { data: { selectedUsers } })
        .catch((err) => console.log("custom error ", err.err));
    },
    onReset() {
      console.log("reset");
      this.username = "";
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style>
.spinner-container {
  text-align: center;
}
</style>