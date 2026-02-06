<script setup>
	// high-level imports
	import { ref, onMounted } from 'vue';
	import emailjs from '@emailjs/browser';

	// data imports
	import projectArr from 'data/projects.json'

	const ytBaseURL = "https://www.youtube.com/embed/";

	// dialog consts
	const emailDialog = ref(false);
	const successDialog = ref(false);
	const failureDialog = ref(false);
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
				successDialog.value = true;
			}, (error) => {
				loading.value = false;
				emailDialog.value = false;
				failureDialog.value = true;
				failureMessage.value = error;
			});
	}

	// project data/methods
	let projectList = ref([]);
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
			projectList.value.push(newProject);
		}
		catch(error) {
			console.log(`Error fetching YouTube playlist ${id}:`, error);
		}
	}

	async function generateSpotifyURLs(id) {
		const url = ``;
		try {
			const response = await $fetch(url, {
				method: 'GET'
			});
			let newProject = [];
		}
		catch(error) {
			console.log(`Error fetching Spotify playlist ${id}:`, error);
		}
	}

	onMounted(() => {
		for(const project of projectArr) {
			if(project.platform === "YouTube") {
				generateYouTubeURLs(project.playlistID);
			}
			else if(project.platform === "Spotify") {
				generateSpotifyURLs(project.playlistID);
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
		<v-dialog
			v-model="successDialog"
			width="auto"
		>
			<v-card>
				<v-card-item>
					<v-card-title>Success</v-card-title>
				</v-card-item>
				<v-card-text>Email successfully sent. Please allow a few days for a response.</v-card-text>
				<v-card-actions>
					<v-btn @click="successDialog=false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog
			v-model="failureDialog"
			width="auto"
		>
			<v-card>
				<v-card-item>
					<v-card-title>Error</v-card-title>
				</v-card-item>
				<v-card-text>Error while sending email. Please try again. {{ failureMessage }}</v-card-text>
				<v-card-actions>
					<v-btn @click="failureDialog=false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
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
							</v-col>
						</v-row>
					</v-container>
				</v-parallax>
			</v-main>
		</v-layout>
  </div>
</template>
