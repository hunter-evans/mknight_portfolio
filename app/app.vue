<script lang="ts" setup>
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
			title: "About",
			href: "about",
			icon: "mdi-information-variant-box"
		}
	];
</script>

<template>
	<v-responsive class="flex rounded">
  	<v-app>
			<v-navigation-drawer
				:location="$vuetify.display.mobile ? 'bottom' : undefined"
				:rounded="true"
				elevation="2"
				expand-on-hover
				permanent
				rail
			>
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
  	  <v-main>
				<v-container>
				</v-container>
  	  </v-main>
  	  <v-btn
  	    class="m-2"
  	    icon="mdi-theme-light-dark"
  	    location="top right"
  	    position="absolute"
  	    @click="$vuetify.theme.cycle()"
  	  />
  	</v-app>
	</v-responsive>
</template>

<style>
	.v-icon {
		padding-left: 50%
	}
</style>
