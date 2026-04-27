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

	// TODO: consider moving methods to external file
	// generate URL string methods
	function generateYouTubeURL(id) {
		return ytBaseURL.concat(id).concat(ytPostURL);
	}

	function generateSpotifyURL(id) {
		return spBaseURL.concat(id).concat(spPostURL);
	}

	// generate single entry project method
	function generateSingleURL(name, platform, id) {
		// TODO: create newProject type
		let newProject = {
			"name": name,
			"platform": platform,
			"list": []
		};
		if(platform === "YouTube") {
			newProject.list.push(generateYouTubeURL(id));
		}
		else if(platform === "Spotify") {
			newProject.list.push(generateSpotifyURL(id));
		}
		return newProject;
	}

	// generate playlist methods
	async function generateMultipleURLsFromSingle(name, platform, id) {
		let newProject = {
			"name": name,
			"platform": platform,
			"list": [],
		};
		let key = "";
		let queryURL = "";
		if(platform === "YouTube") {
			key = useRuntimeConfig().public.GOOGLE_API_KEY;
			queryURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}`;
		}
		else {
			// TODO: add spotify options
			return;
		}

		try {
			const response = await $fetch(queryURL, {
				method: "GET"
			});
			for(const track of response.items) {
				let newTrack = "";
				if(platform === "YouTube") {
					newTrack = generateYouTubeURL(track.snippet.resourceId.videoId);
				}
				else if(platform === "Spotify") {
					// TODO: fill in generate Spotify
					// newTrack = generateSpotifyURL();
				}
				newProject.list.push(newTrack);
			}
		}
		catch(error) {
			console.log(`Error fetching ${platform} playlist ${id}:`, error);
		}
		localProjectList.value.push(newProject);
	}

	function generateMultipleURLsFromMultiple(name, platform, ids) {
		let newProject = {
			"name": name,
			"platform": platform,
			"list": []
		};
		for(const track of ids) {
			let newTrack = "";
			if(platform === "YouTube") {
				newTrack = generateYouTubeURL(track);
			}
			else if(platform === "Spotify") {
				newTrack = generateSpotifyURL(track);
			}
			newProject.list.push(newTrack);
		}
		return newProject;
	}

	onMounted(() => {
		for(const project of props.projectList) {
			if(project.category === props.tabObj.category) {
				if(project.playlist) {
					if(project.singleQuery) {
						generateMultipleURLsFromSingle(project.name, project.platform, project.id);
					}
					else {
						localProjectList.value.push(generateMultipleURLsFromMultiple(project.name, project.platform, project.id));
					}
				}
				else {
					localProjectList.value.push(generateSingleURL(project.name, project.platform, project.id));
				}
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
