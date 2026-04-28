<template>
	<v-speed-dial
		location="right center"
		transition="slide-y-reverse-transition"
		open-on-hover
	>
		<template 
			v-slot:activator="{ props: activatorProps }"
		>
			<v-btn 
				v-bind="activatorProps"
			>Contact
			</v-btn>
		</template>
		<v-btn
			key="1"
			icon="mdi-email"
			@click="$emit('openDialog')"
		/>
		<v-btn
			key="2"
			icon="mdi-linkedin"
			href="https://www.linkedin.com/in/mark-knight-683442129"
			target="_blank"
		/>
	</v-speed-dial>
</template>
