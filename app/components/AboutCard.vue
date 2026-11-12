<script setup lang="ts">
  // prop to handle about info
  const props = defineProps(['aboutObj'])

  // reactive values for popups
  const emailDialog = ref(false)
  const successSnackbar = ref(false)
  const failureSnackbar = ref(false)

  // error messaging
  const errMsg = ref('')
  function handleFailure (err) {
    errMsg.value = err
    failureSnackbar.value = true
  }
</script>

<template>
  <v-card
    :id="props.aboutObj.href"
    :text="props.aboutObj.text"
    :title="props.aboutObj.title"
  >
    <v-card-actions>
      <SpeedDial @open-dialog="emailDialog = true" />
    </v-card-actions>
  </v-card>

  <EmailDialog
    v-model="emailDialog"
    @close-dialog="emailDialog = false"
    @fail-snack="handleFailure"
    @success-snack="successSnackbar = true"
  />

  <v-snackbar
    v-model="successSnackbar"
    timeout="2500"
  >
    Email sent successfully!
  </v-snackbar>

  <v-snackbar
    v-model="failureSnackbar"
    color="red"
    timeout="5000"
  >
    Error while sending: {{ errMsg }}
  </v-snackbar>
</template>
