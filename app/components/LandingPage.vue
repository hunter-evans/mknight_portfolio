<script setup lang="ts">
	import AboutCard from "components/AboutCard.vue";

	const props = defineProps({
		pageTitle: String,
	});

	import projectArr from 'data/projects.json';
	const ytBaseURL = "https://www.youtube.com/embed/";
	let ytProjectList = ref([]);

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

	const carouselIndex = ref(0);
	function clearIFrame(idx) {
		let iframe = document.getElementsByTagName("iframe")[idx].contentWindow;
		iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
	}

	onMounted(() => {
		for(const project of projectArr) {
			if(project.platform === "YouTube") {
				generateYouTubeURLs(project.playlistID);
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
					v-model="carouselIndex"
					height="352"
					hide-delimiters
					progress="white"
				>
					<template v-slot:prev="{ props }">
						<v-btn
							icon="mdi-chevron-left"
							@click="props.onClick(); clearIFrame(carouselIndex === project.length - 1 ? 0 : carouselIndex + 1)"
						/>
					</template>
					<template v-slot:next="{ props }">
						<v-btn
							icon="mdi-chevron-right"
							@click="props.onClick(); clearIFrame(carouselIndex === 0 ? project.length - 1 : carouselIndex - 1)"
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
