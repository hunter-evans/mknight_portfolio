<script setup lang="ts">
	import SpeedDial from "components/SpeedDial.vue";
	import EmailDialog from "components/EmailDialog.vue";

	// TODO: reinject after move into app
	// const aboutTitle = inject("aboutTitle");
	const aboutTitle = "About Me";
	const aboutText = "D. Mark Knight, Jr. is an award-winning audio engineer based in the Washington, D.C. metro region with a background in audio editing, engineering, and live sound recording. He is an audio editor and small concert producer for the Washington Metropolitan Gamer Symphony Orchestra and its associated small ensembles. Mark is a graduate of the University of Mary Washington with a Bachelor of Arts in Music. In his spare time, Mark is an avid woodwinds musician, playing flute, clarinet, tenor saxophone, and bassoon.";

	const emailDialog = ref(false);
	const successSnackbar = ref(false);
	const failureSnackbar = ref(false);

	const errMsg = ref('');
	function handleFailure(err) {
		errMsg.value = err;
		failureSnackbar.value = true;
	}
</script>

<template>
	<v-card 
		id="about"
		:title="aboutTitle"
		:text="aboutText"
	>
		<v-card-actions>
			<SpeedDial 
				@open-dialog="emailDialog = true"
			/>
		</v-card-actions>
	</v-card>
	<EmailDialog 
		:open-dialog="emailDialog"
		@close-dialog="emailDialog = false"
		@success-snack="successSnackbar = true"
		@fail-snack="handleFailure"
	/>
	<v-snackbar
		v-model="successSnackbar"
		timeout="2500"
	>
		Email sent successfully!
	</v-snackbar>
	<v-snackbar
		v-model="failureSnackbar"
		timeout="5000"
		color="red"
	>
		Error while sending: {{ errMsg }}
	</v-snackbar>
</template>
