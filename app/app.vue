<script setup>
	// high-level imports
	import { ref, onMounted } from 'vue';
	import emailjs from '@emailjs/browser';

	// data imports
	import projectArr from 'data/projects.json'

	const ytBaseURL = "https://www.youtube.com/embed/";
	const spotifyBaseURL = "https://open.spotify.com/embed/track/";
	const spotifyPostURL = "?utm_source=generator&theme=0";

	// dialog consts
	const emailDialog = ref(false);
	const successSnackbar = ref(false);
	const failureAlert = ref(false);
	const failureMessage = ref('');
	const form = ref(false);
	const loading = ref(false);
	const userEmail = ref('');
	const userSubject = ref('');
	const userMessage = ref('');

	// dialog rules/methods
	function required(v) {
		return !!v || 'Field is required.';
	}

	function email(v) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Must be a valid e-mail address.';
	}

	function onSubmit() {
		if(!form.value) return
		loading.value = true;
		// add email logic.
		const templateParams = {
			userSubject: userSubject.value,
			userEmail: userEmail.value,
			userMessage: userMessage.value,
		};
		emailjs.send("service_3hhr3e9", "template_7fpyzb9", templateParams)
			.then(() => {
				loading.value = false;
				emailDialog.value = false;
				successSnackbar.value = true;
			}, (error) => {
				loading.value = false;
				emailDialog.value = false;
				failureAlert.value = true;
				failureMessage.value = error;
			});
	}

	// project data/methods
	let ytProjectList = ref([]);
	let spotifyProjectList = ref([]);
	let projectCounter = ref(0);

	async function generateYouTubeURLs(id) {
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
			ytProjectList.value.push(newProject);
		}
		catch(error) {
			console.log(`Error fetching YouTube playlist ${id}:`, error);
		}
	}

	/* TODO: finish method once Spotify API allows new apps
	async function generateSpotifyURLs(id) {
		const token = useRuntimeConfig().public.SPOTIFY_TOKEN;
		const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
		try {
			const response = await $fetch(url, {
				method: 'GET'
			});
			let newProject = [];
			for(const video of response. ) {
				newProject.push(video. );
			}
			projectCounter.value += newProject.length;
			spotifyProjectList.value.push(newProject);
		}
		catch(error) {
			console.log(`Error fetching Spotify playlist ${id}:`, error);
		}
	}
	*/

	onMounted(() => {
		for(const project of projectArr) {
			if(project.platform === "YouTube") {
				generateYouTubeURLs(project.playlistID);
			}
			/* TODO: eliminate alt method *see above note
			else if(project.platform === "Spotify") {
				generateSpotifyURLs(project.playlistID);
			}
			*/
			else if(project.platform === "altSpotify") {
				let newProject = [];
				for(const track of project.trackIDs) {
					newProject.push(track);
				}
				projectCounter.value += newProject.length;
				spotifyProjectList.value.push(newProject);
			}
		}

		emailjs.init({
			publicKey: useRuntimeConfig().public.EMAILJS_PUBLIC_KEY,
			privateKey: useRuntimeConfig().public.EMAILJS_PRIVATE_KEY,
			blockHeadless: true,
			limitRate: {
				id: 'app',
				throttle: 10000
			}
		});
	});

	// meta consts/methods
	const title = ref("D. M. Knight: Music Technologist");
	const aboutTitle = ref("About Me");

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
		<v-dialog
			v-model="emailDialog"
			width="auto"
		>
			<v-form
				v-model="form"
				@submit.prevent="onSubmit"
			>
				<v-card
					density="comfortable"
				>
					<v-card-item>
						<v-card-title>Send Email</v-card-title>
						<v-card-subtitle>Fill out the form, and I'll respond back soon!</v-card-subtitle>
					</v-card-item>
					<v-card-text>
						<v-text-field 
							v-model="userEmail"
							clearable
							label="Email"
							type="email"
							placeholder="Enter your email address."
							:rules="[required, email]"
						/>
						<v-text-field
							v-model="userSubject"
							clearable
							label="Subject"
							type="input"
							placeholder="Enter your subject."
							:rules="[required]"
						/>
						<v-textarea
							v-model="userMessage"
							clearable
							label="Message"
							placeholder="Enter your message."
							auto-grow
							:rules="[required]"
						/>
					</v-card-text>
					<v-card-actions>
						<v-btn
							@click="emailDialog=false"
						>
							Close
						</v-btn>
						<v-btn
							:disabled="!form"
							:loading="loading"
							type="submit"
						>
							Send
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
		<v-layout>
			<v-navigation-drawer
				expand-on-hover
				permanent
				rail
				:location="$vuetify.display.mobile ? 'bottom' : undefined"
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
				<v-container fluid>
					<v-row class="justify-center align-center">
						<v-col cols="12">
							<v-row>
								<v-col cols="12">
									<h2 class="text-h2">{{ title }}</h2>
									<v-divider 
										gradient
										class="border-opacity-75"
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<h4 class="text-h4">Hi, I'm Mark! Check out some of the projects I've been working on recently.</h4>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row 
						class="justify-center align-center" 
						id="projects"
					>
						<v-col cols="12" lg="6" v-for="project in ytProjectList">
							<v-carousel 
								show-arrows="hover"
								height="352"
							>
								<v-carousel-item v-for="video in project" cover>
									<iframe
										:src="ytBaseURL.concat(video)"
										height="100%"
										width="100%"
										allowfullscreen
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									/>	
								</v-carousel-item>
							</v-carousel>
						</v-col>
						<v-col cols="12" lg="6" v-for="project in spotifyProjectList">
							<v-carousel 
								show-arrows="hover"
								height="352"
							>
								<v-carousel-item v-for="track in project" cover>
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
								<v-card-actions>
									<v-speed-dial
										location="right center"
										transition="slide-y-reverse-transition"
									>
										<template v-slot:activator="{ props: activatorProps }">
											<v-btn v-bind="activatorProps">Contact</v-btn>
										</template>
										<v-btn
											key="1"
											icon="mdi-email"
											@click="emailDialog = true"
										/>
										<v-btn 
											key="2"
											icon="mdi-linkedin"
											href="https://www.linkedin.com/in/mark-knight-683442129/"
										/>
									</v-speed-dial>
								</v-card-actions>
							</v-card>
							<v-snackbar
								v-model="successSnackbar"
								timeout="2000"
							>
								Email sent successfully!
							</v-snackbar>
							<v-alert
								v-model="failureAlert"
								closable
								title="Error"
								color="error"
								icon="$error"
							>
								Error while sending email. Please try again. {{ failureMessage }}
							</v-alert>
						</v-col>
					</v-row>
				</v-container>
			</v-main>
		</v-layout>
  </div>
</template>

<style>
	h2 {
		text-align: center;
	}
	h4 {
		text-align: center;
	}
</style>
