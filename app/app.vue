<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { mdiBookMusicOutline, mdiInformationOutline } from '@mdi/js';
	import projects from 'data/projects.json'

	const title = ref("D. M. Knight: Music Technologist");
	const aboutTitle = ref("About Me");

	function generateYouTubeURLs(id: string) {
		const key = useRuntimeConfig().public.GOOGLE_API_KEY;
		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}`;
		try {
			
		}
		catch(error) {
			console.log("Error fetching playlist:", error);
		}
	}

	onMounted(() => {
		for(let project of projects) {
			if(project.platform === "YouTube") {
				generateYouTubeURLs(project.playlistID);
			}
		}
	});

	useSeoMeta({
		creator: "Hunter Evans",
		description: () => "Browse Mark Knight's ${} audio projects and consider hiring him for your next audio engineering needs.",
		ogDescription: () => "Browse Mark Knight's ${} audio projects and consider hiring him for your next audio engineering needs.",
		robots: 'index, follow',
		title: () => title,
		ogTitle: () => title,
		ogType: "website",
	});
</script>

<template>
  <div>
		<v-layout>
			<v-navigation-drawer
				expand-on-hover
				permanent
				rail
			>
				<v-list>
					<v-list-item 
						prepend-icon="mdi-book-music-outline" 
						title="Projects"
						value="projects"
					/>
					<v-list-item
						prepend-icon="mdi-information-outline"
						:title="aboutTitle"
						value="about"
					/>
				</v-list>
			</v-navigation-drawer>
			<v-main class="d-flex align-center justify-center">
				<v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
					<v-container class="fill-height">
						<v-row class="justify-center align-center flex-md-row">
							<v-col col="12">
								<h1 class="text-h1">{{ title }}</h1>
								<h3 class="text-h3">Hi, I'm Mark! Check out some of the projects I've been working on recently.</h3>
							</v-col>
						</v-row>
						<v-row v-for="project in projects">
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card>
									<v-card-item>
										<v-card-title>
											{{ aboutTitle }}
										</v-card-title>
									</v-card-item>
									<v-card-text>
										D. Mark Knight, Jr. is an audio engineer based in the Washington, D.C. metro region with a background in audio editing, engineering, and live sound recording. He is an audio editor and concert producer for the Washington Metropolitan Gamer Symphony Orchestra and it's associated small ensembles. In his spare time, Mark is an avid woodwinds musician, playing flute, clarinet, tenor saxophone, and bassoon.
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-parallax>
			</v-main>
		</v-layout>
  </div>
</template>
