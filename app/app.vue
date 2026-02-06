<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { mdiBookMusicOutline, mdiInformationOutline } from '@mdi/js';
	import projectArr from 'data/projects.json'

	const title = ref("D. M. Knight: Music Technologist");
	const aboutTitle = ref("About Me");
	const ytBaseURL = "https://www.youtube.com/embed/";

	let projectList = ref([]);
	let projectCounter = ref(0);

	async function generateYouTubeURLs(id: string) {
		const key = useRuntimeConfig().public.GOOGLE_API_KEY;
		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}`;
		try {
			const response = await $fetch(url, {
				method: 'GET'
			});
			let newProject = [];
			for(const video of response.items) {
				newProject.push(video.snippet.resourceId.videoId);
			}
			projectCounter.value += newProject.length;
			projectList.value.push(newProject);
		}
		catch(error) {
			console.log("Error fetching playlist:", error);
		}
	}

	onMounted(() => {
		for(const project of projectArr) {
			if(project.platform === "YouTube") {
				generateYouTubeURLs(project.playlistID);
			}
		}
		console.log(projectCounter);
	});

	useSeoMeta({
		creator: "Hunter Evans",
		description: () => `Browse Mark Knight's ${projectCounter} audio projects and consider hiring him for your next audio engineering needs in the Washington, D.C. metro area.`,
		ogDescription: () => `Browse Mark Knight's ${projectCounter} audio projects and consider hiring him for your next audio engineering needs in the Washington, D.C. metro area.`,
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
						href="#projects"
						prepend-icon="mdi-book-music-outline" 
						title="Projects"
					/>
					<v-list-item
						href="#about"
						prepend-icon="mdi-information-outline"
						:title="aboutTitle"
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
						<v-row id="projects" v-for="project in projectList">
							<v-carousel show-arrows="hover">
								<v-carousel-item v-for="video in project">
									<iframe
										:src="ytBaseURL.concat(video)"
										height="100%"
										width="100%"
										allowfullscreen
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									/>
								</v-carousel-item>
							</v-carousel>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-card id="about">
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
