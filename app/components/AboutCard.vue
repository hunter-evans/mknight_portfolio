<script setup lang="ts">
	// imports
	import SpeedDial from "components/SpeedDial.vue";
	import EmailDialog from "components/EmailDialog.vue";

	// prop to handle about info
	const props = defineProps(['aboutObj']);

	// reactive values for popups
	const emailDialog = ref(false);
	const successSnackbar = ref(false);
	const failureSnackbar = ref(false);

	// error messaging
	const errMsg = ref('');
	function handleFailure(err) {
		errMsg.value = err;
		failureSnackbar.value = true;
	}
</script>

<template>
	<v-card 
		:id="props.aboutObj.href"
		:title="props.aboutObj.title"
		:text="props.aboutObj.text"
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
