<script setup lang="ts">
	// input props
	const props = defineProps(["tabObj", "projectList"]);

	// constants
	const ytBaseURL = "https://www.youtube.com/embed/";
	const ytPostURL = "?enablejsapi=1";
	const spBaseTrackURL = "https://open.spotify.com/embed/track/";
	const spBaseAlbumURL = "https://open.spotify.com/embed/album/";
	const spPostURL = "?utm_source=generator";
	const driveBaseURL = "https://drive.google.com/file/d/";
	const drivePostURL = "/preview";

	// reactive values
	const localProjectList = ref([]);

	// TODO: consider moving methods to external file
	// generate URL string methods
	function generateYouTubeURL(id) {
		return ytBaseURL.concat(id).concat(ytPostURL);
	}

	function generateSpotifyTrackURL(id) {
		return spBaseTrackURL.concat(id).concat(spPostURL);
	}

	function generateSpotifyAlbumURL(id) {
		return spBaseAlbumURL.concat(id).concat(spPostURL);
	}

	function generateDriveURL(id) {
		return driveBaseURL.concat(id).concat(drivePostURL);
	}

	// generate single entry project method
	function generateSingleURL(project) {
		let urls = [];
		if(project.platform === "YouTube") {
			urls.push(generateYouTubeURL(project.id));
		}
		else if(project.platform === "Spotify") {
			urls.push(generateSpotifyTrackURL(project.id));
		}
		else if(project.platform === "Drive") {
			urls.push(generateDriveURL(project.id));
		}
		project.id = urls;
		return project;
	}

	// generate playlist methods
	async function generateMultipleURLsFromSingle(project) {
		let urls = [];
		if(project.platform === "YouTube") {
			const key = useRuntimeConfig().public.GOOGLE_API_KEY;
			const queryURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${project.id}&key=${key}`;

			try {
				const response = await $fetch(queryURL, {
					method: "GET"
				});
				for(const track of response.items) {
					urls.push(generateYouTubeURL(track.snippet.resourceId.videoId));
				}
			}
			catch(error) {
				console.log(`Error fetching ${project.platform} playlist ${project.id}:`, error);
			}
		}
		else if(project.platform === "Spotify") {
			urls.push(generateSpotifyAlbumURL(project.id));
		}

		project.id = urls;
		localProjectList.value.push(project);
	}

	function generateMultipleURLsFromMultiple(project) {
		let urls = [];
		for(const track of project.id) {
			let newTrack = "";
			if(project.platform === "YouTube") {
				newTrack = generateYouTubeURL(track);
			}
			else if(project.platform === "Spotify") {
				newTrack = generateSpotifyTrackURL(track);
			}
			urls.push(newTrack);
		}
		project.id = urls;
		return project;
	}

	onMounted(() => {
		for(const project of props.projectList) {
			if(project.category === props.tabObj.category) {
				if(project.playlist) {
					if(project.singleQuery) {
						generateMultipleURLsFromSingle(project);
					}
					else {
						localProjectList.value.push(generateMultipleURLsFromMultiple(project));
					}
				}
				else {
					localProjectList.value.push(generateSingleURL(project));
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
