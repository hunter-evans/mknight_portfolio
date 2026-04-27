<script setup lang="ts">
	// imports
	import AboutCard from "components/AboutCard.vue";
	import ProjectHolder from "components/ProjectHolder.vue";

	// input props
	const props = defineProps(["tabObj", "projectList"]);

	// constants
	const ytBaseURL = "https://www.youtube.com/embed/";
	const ytPostURL = "?enablejsapi=1";
	const spBaseURL = "https://open.spotify.com/embed/track/";
	const spPostURL = "?utm_source=generator&theme=0";

	// reactive values
	const localProjectList = ref([]);

	async function generateYouTubeURLs(id) {
		const key = useRuntimeConfig().public.GOOGLE_API_KEY;
		const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}`;
		try {
			const response = await $fetch(url, {
				method: "GET"
			});
			let newProject = [];
			for(const video of response.items) {
				const newVideo = ytBaseURL.concat(video.snippet.resourceId.videoId).concat(ytPostURL);
				newProject.push(newVideo);
			}
			localProjectList.value.push(newProject);
		}
		catch(error) {
			console.log(`Error fetching YouTube playlist ${id}:`, error);
		}
	}

	onMounted(() => {
		for(const project of props.projectList) {
			if(project.category === props.tabObj.category) {
				if(project.platform === "YouTube") {
					if(project.playlist) {
						generateYouTubeURLs(project.id);
					}
				}
				/*
				else if(project.platform === "altSpotify") {
					let newProject = [];
					for(const track of project.trackIDs) {
						newProject.push(track);
					}
					spotifyProjectList.value.push(newProject);
				}
				*/
			}
		}
	});
</script>

<template>
	<AboutCard 
		v-if="tabObj.href === 'about'"
		:about-obj="tabObj"
	/>
	<v-card
		v-if="tabObj.href != 'about'"
		:id="tabObj.href"
		:title="tabObj.title"
	>
		<v-container
			fluid
		>
			<v-row
				class="justify-center align-center"
			>
				<v-col 
					cols="12" 
					lg="6" 
					v-for="project in localProjectList"
				>
					<ProjectHolder 
						:project="project"
					/>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
	<br>
</template>
