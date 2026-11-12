<template>
  <v-speed-dial
    location="right center"
    open-on-hover
    scroll-strategy="close"
    transition="slide-y-reverse-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps">Contact</v-btn>
    </template>

    <v-btn
      key="1"
      icon="mdi-email"
      @click="$emit('open-dialog')"
    />

    <v-btn
      key="2"
      href="https://www.linkedin.com/in/mark-knight-683442129"
      icon="mdi-linkedin"
      target="_blank"
    />
  </v-speed-dial>
</template>
