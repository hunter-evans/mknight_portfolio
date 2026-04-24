<script setup lang="ts">
	const props = defineProps({
		pageTitle: String,
	});
</script>

<template>
  <LandingPage 
		:page-title="props.pageTitle"
	/>
</template>
