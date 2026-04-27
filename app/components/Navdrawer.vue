<script setup lang="ts">
	import { provide } from "vue";
	import tabArr from "data/tabs.json"

	// TODO: incorporate GSO/UMW icons
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
				v-for="item in tabArr"
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
