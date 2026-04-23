<script setup lang="ts">
	//
</script>

<template>
	<v-responsive>
  <v-app>
		<Navdrawer />
    <v-main
			class="flex justify-center content-center"
		>
      <nuxt-page />
    </v-main>
    <v-btn
      class="m-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app>
	</v-responsive>
</template>
