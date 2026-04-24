<script setup lang="ts">
	import AboutCard from "components/AboutCard.vue";

	const props = defineProps({
		pageTitle: String,
	});

	import projectArr from 'data/projects.json';
	const ytBaseURL = "https://www.youtube.com/embed/";
	const spotifyBaseURL = "https://open.spotify.com/embed/track/";
	const spotifyPostURL = "?utm_source=generator&theme=0";
	let ytProjectList = ref([]);
	let spotifyProjectList = ref([]);

	async function generateYouTubeURLs(id) {
		const key = useRuntimeConfig().public.GOOGLE_API_KEY;
		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}`;
		try {
			const response = await $fetch(url, {
				method: "GET"
			});
			let newProject = [];
			for(const video of response.items) {
				newProject.push(video.snippet.resourceId.videoId);
			}
			ytProjectList.value.push(newProject);
		}
		catch(error) {
			console.log(`Error fetching YouTube playlist ${id}:`, error);
		}
	}

	const ytCarouselIndex = ref(0);
	const spCarouselIndex = ref(0);
	function clearIFrame(idx) {
		let iframe = document.getElementsByTagName("iframe")[idx].contentWindow;
		iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
	}

	onMounted(() => {
		for(const project of projectArr) {
			if(project.platform === "YouTube") {
				generateYouTubeURLs(project.playlistID);
			}
			else if(project.platform === "altSpotify") {
				let newProject = [];
				for(const track of project.trackIDs) {
					newProject.push(track);
				}
				spotifyProjectList.value.push(newProject);
			}
		}
	});

</script>

<template>
	<v-container 
		fluid
	>
		<v-row>
			<v-col 
				cols="12"
			>
				<h1 
					class="text-5xl"
				>{{ props.pageTitle }}</h1>
				<v-divider
					gradient
					class="border-opacity-75"
				/>
				<h4 
					class="text-xl"
				>Hi, I'm Mark! Check out some of the projects I've been working on recently.</h4>
			</v-col>
		</v-row>
		<!-- TODO: Award winner list -->
		<!-- TODO: WMGSO list -->
		<!-- TODO: UMW list -->
		<!-- TODO: Collab list -->
		<!-- TODO: Personal list -->
		<v-row
			class="justify-center align-center"
		>
			<v-col 
				cols="12" 
				lg="6" 
				v-for="project in ytProjectList"
			>
				<v-carousel
					v-model="ytCarouselIndex"
					height="352"
					hide-delimiters
					progress="white"
				>
					<template v-slot:prev="{ props }">
						<v-btn
							icon="mdi-chevron-left"
							@click="props.onClick(); clearIFrame(ytCarouselIndex === project.length - 1 ? 0 : ytCarouselIndex + 1)"
						/>
					</template>
					<template v-slot:next="{ props }">
						<v-btn
							icon="mdi-chevron-right"
							@click="props.onClick(); clearIFrame(ytCarouselIndex === 0 ? project.length - 1 : ytCarouselIndex - 1)"
						/>
					</template>
					<v-carousel-item
						v-for="video in project"
						cover
					>
						<iframe
							:id="video"
							:src="ytBaseURL.concat(video).concat('?enablejsapi=1')"
							height="100%"
							width="100%"
							allowfullscreen
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						/>
					</v-carousel-item>
				</v-carousel>
			</v-col>
			<v-col 
				cols="12" 
				lg="6" 
				v-for="project in spotifyProjectList"
			>
				<v-carousel
					v-model="spCarouselIndex"
					height="352"
					hide-delimiters
					progress="white"
				>
					<template v-slot:prev="{ props }">
						<v-btn
							icon="mdi-chevron-left"
							@click="props.onClick(); clearIFrame(spCarouselIndex === project.length - 1 ? 0 : spCarouselIndex + 1)"
						/>
					</template>
					<template v-slot:next="{ props }">
						<v-btn
							icon="mdi-chevron-right"
							@click="props.onClick(); clearIFrame(spCarouselIndex === 0 ? project.length - 1 : spCarouselIndex - 1)"
						/>
					</template>
					<v-carousel-item
						v-for="track in project"
						cover
					>
						<iframe
							data-testid="embed-iframe"
							style="border-radius:12px"
							:src="spotifyBaseURL.concat(track).concat(spotifyPostURL)"
							height="100%"
							width="100%"
							frameBorder="0"
							allowfullscreen
							allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
						/>
					</v-carousel-item>
				</v-carousel>
			</v-col>
		</v-row>
		<v-row>
			<v-col 
				cols="12"
			>
				<AboutCard />
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<!-- TODO: ad disclaimer -->
				<p>© Copyright {{ new Date().getFullYear() }}. Any views expressed by advertisements on this page to not reflect the views held by D. M. Knight, Jr.</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
	h1 {
		text-align: center;
	}
	h4 {
		text-align: center;
	}
</style>
