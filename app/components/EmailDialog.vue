<script setup lang="ts">
  import emailjs from '@emailjs/browser'

  // input props and output emits
  const openDialog = defineModel({ type: Boolean })
  const emit = defineEmits([
    'close-dialog',
    'success-snack',
    'fail-snack',
  ])

  // reactive values
  const form = ref(false)
  const userEmail = ref('')
  const userSubject = ref('')
  const userMessage = ref('')
  const loading = ref(false)

  // validation functions
  function required (v) {
    return !!v || 'Field is required.'
  }
  function email (v) {
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Must be a valid e-mail address.'
  }

  function closeDialog () {
    userEmail.value = ''
    userSubject.value = ''
    userMessage.value = ''
    emit('close-dialog')
  }

  function onSubmit () {
    if (!form.value) return
    loading.value = true

    const templateParams = {
      userSubject: userSubject.value,
      userEmail: userEmail.value,
      userMessage: userMessage.value,
    }

    emailjs.send('service_029buva', 'template_xzix9nr', templateParams)
      .then(() => {
        loading.value = false
        emit('success-snack')
        emit('close-dialog')
      }, error => {
        loading.value = false
        emit('fail-snack', error)
        emit('close-dialog')
      })
  }

  onMounted(() => {
    emailjs.init({
      publicKey: useRuntimeConfig().public.EMAILJS_PUBLIC_KEY,
      privateKey: useRuntimeConfig().public.EMAILJS_PRIVATE_KEY,
      blockHeadless: true,
      limitRate: {
        id: 'app',
        throttle: 10_000,
      },
    })
  })
</script>

<template>
  <v-dialog
    v-model="openDialog"
    width="auto"
  >
    <v-form
      v-model="form"
      @submit.prevent="onSubmit"
    >
      <v-card
        density="comfortable"
        subtitle="Please fill out the form, and I'll respond back soon!"
        title="Send Email"
      >
        <v-card-text>
          <v-text-field
            v-model="userEmail"
            clearable
            label="Email"
            placeholder="Enter your email address."
            :rules="[required, email]"
            type="email"
          />

          <v-text-field
            v-model="userSubject"
            clearable
            label="Subject"
            placeholder="Enter your subject line."
            :rules="[required]"
            type="input"
          />

          <v-textarea
            v-model="userMessage"
            auto-grow
            clearable
            label="Message"
            placeholder="Enter your message."
            :rules="[required]"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn @click="closeDialog">Close</v-btn>

          <v-btn
            :disabled="!form"
            :loading="loading"
            type="submit"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
