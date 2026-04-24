<script setup lang="ts">
	import { provide } from "vue";

	// TODO: incorporate GSO/UMW icons
	// TODO: construct tabs via method
  const navTabs = [
		{
			title: "WMGSO Projects",
			href: "wmgsoproj",
			icon: "mdi-music-note-eighth"
		},
		{
			title: "UMW Projects",
			href: "umwproj",
			icon: "mdi-school"
		},
		{
			title: "Collaborative Projects",
			href: "collabproj",
			icon: "mdi-human-queue"
		},
		{
			title: "Personal Projects",
			href: "personalproj",
			icon: "mdi-waveform"
		},
		{
			title: "About Me",
			href: "about",
			icon: "mdi-information-variant-box"
		}
	];

	// TODO: move aboutTitle into parent component to provide
	// provide('aboutTitle', navTabs[navTabs.length - 1].title);
</script>

<template>
	<v-navigation-drawer
		:location="$vuetify.display.mobile ? 'bottom' : undefined"
		:rounded="true"
		elevation="2"
		expand-on-hover
		permanent
		rail
	>
	<!--
	-->
		<v-list
			nav
		>
			<v-list-item
				v-for="item in navTabs"
				:href="'#' + item.href"
				:title="item.title"
			>
				<template 
					v-slot:prepend
					class="justify-self-center"
				>
					<v-icon 
						:icon="item.icon"
					/>
				</template>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>
