<script setup lang="ts">
	import { ref } from 'vue';

	const title = ref("D. M. Knight: Music Technologist");
	const descrp = ref("Discover Mark Knight's plethora of audio projects and consider hiring him for your next audio engineering or recording need in the Washington, D.C. metro area or around the world.");

	useSeoMeta({
		creator: "Hunter Evans",
		description: descrp,
		ogDescription: descrp,
		robots: 'index, follow',
		title: title,
		ogType: "website",
		ogUrl: "https://mknight.site",
	});
</script>

<template>
	<v-responsive>
  <v-app>
		<Navdrawer />
    <v-main
			class="flex justify-center content-center"
		>
      <nuxt-page 
				:page-title="title"
			/>
    </v-main>
  </v-app>
	</v-responsive>
</template>
