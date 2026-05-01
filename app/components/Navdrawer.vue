<script setup lang="ts">
	import tabArr from "data/tabs.json"

	// TODO: incorporate GSO/UMW icons
	const drawer = ref(false);
</script>

<template>
	<v-app-bar
		:scroll-behavior="!$vuetify.display.mobile ? 'hide inverted collapse' : undefined"
		:location="$vuetify.display.mobile ? 'bottom' : 'top'"
	>
		<template 
			v-slot:prepend
		>
			<v-app-bar-nav-icon 
				@click="drawer = !drawer"
			/>
		</template>
		<v-app-bar-title>
			Projects
		</v-app-bar-title>
		<template v-slot:append>
    	<v-btn
    	  class="m-2"
    	  icon="mdi-theme-light-dark"
    	  @click="$vuetify.theme.cycle()"
    	/>
		</template>
	</v-app-bar>
	<v-navigation-drawer
		v-model="drawer"
		:location="$vuetify.display.mobile ? 'bottom' : undefined"
		:rounded="true"
		elevation="2"
		temporary
	>
		<v-list
			nav
		>
			<v-list-item
				v-for="item in tabArr"
				:href="'#' + item.href"
				:title="item.title"
				@click="drawer = false"
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
