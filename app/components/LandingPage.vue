<script setup lang="ts">
	// imports
	import projectArr from 'data/projects.json';
	import tabsArr from "data/tabs.json";

	// props
	const props = defineProps({
		pageTitle: String,
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
		<ContentSection 
			v-for="tab in tabsArr"
			:tab-obj="tab"
			:project-list="projectArr"
		/>
		<v-row>
			<v-col>
				<!-- TODO: ad disclaimer rewriet -->
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
