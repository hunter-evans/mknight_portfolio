<script setup lang="ts">
	import { ref } from "vue";
	import emailjs from "@emailjs/browser";

	// input props and output emits
	const props = defineProps({
		openDialog: Boolean
	});
	const emit = defineEmits([
		"closeDialog",
		"successSnack",
		"failSnack"
	]);

	// reactive values
	const form = ref(false);
	const userEmail = ref("");
	const userSubject = ref("");
	const userMessage = ref("");
	const loading = ref(false);

	// validation functions
	function required(v) {
		return !!v || "Field is required.";
	}
	function email(v) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "Must be a valid e-mail address.";
	}

	function closeDialog() {
		userEmail.value = "";
		userSubject.value = "";
		userMessage.value = "";
		emit("closeDialog");
	}

	function onSubmit() {
		if(!form.value) return;
		loading.value = true;

		const templateParams = {
			userSubject: userSubject.value,
			userEmail: userEmail.value,
			userMessage: userMessage.value
		};
	
		emailjs.send("service_029buva", "template_xzix9nr", templateParams)
			.then(() => {
				loading.value = false;
				emit("successSnack");
				emit("closeDialog");
			}, (error) => {
				loading.value = false;
				emit("failSnack", error);
				emit("closeDialog");
			});
	}

	onMounted(() => {
		emailjs.init({
			publicKey: useRuntimeConfig().public.EMAILJS_PUBLIC_KEY,
			privateKey: useRuntimeConfig().public.EMAILJS_PRIVATE_KEY,
			blockHeadless: true,
			limitRate: {
				id: "app",
				throttle: 10000
			}
		});
	});
</script>

<template>
	<v-dialog
		v-model="props.openDialog"
		width="auto"
	>
		<v-form
			v-model="form"
			@submit.prevent="onSubmit"
		>
			<v-card
				density="comfortable"
				title="Send Email"
				subtitle="Please fill out the form, and I'll respond back soon!"
			>
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
						placeholder="Enter your subject line."
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
						@click="closeDialog"
					>Close
					</v-btn>
					<v-btn
						:disabled="!form"
						:loading="loading"
						type="submit"
					>Send
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-dialog>
</template>
