<script setup lang="ts">
	// input props
	const props = defineProps(["project"]);

	// reactive values
	const carouselIndex = ref(0);

	function clearIFrame(side) {
		let idx = 0;
		if(side === "left") {
			idx = ((carouselIndex.value === (props.project.length - 1)) ? 0 : (carouselIndex.value + 1));
		}
		else if(side === "right") {
			idx = ((carouselIndex.value === 0) ? (props.project.length - 1) : (carouselIndex.value - 1));
		}
		console.log(idx);

		let iframe = document.getElementsByTagName("iframe")[idx].contentWindow;
		iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
	}
</script>

<template>
	<v-carousel
		v-model="carouselIndex"
		height="352"
		hide-delimiters
		progress="white"
	>
		<template v-slot:prev="{ props }">
			<v-btn
				icon="mdi-chevron-left"
				@click="props.onClick(); clearIFrame('left')"
			/>
		</template>
		<template v-slot:next="{ props }">
			<v-btn
				icon="mdi-chevron-right"
				@click="props.onClick(); clearIFrame('right')"
			/>
		</template>
		<v-carousel-item
			v-for="track in props.project"
			cover
		>
			<iframe
				:src="track"
				height="100%"
				width="100%"
				allowfullscreen
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			/>
			<!--
			<iframe
				data-testid="embed-iframe"
				style="border-radius:12px"
				:src="spotifyBaseURL.concat(track).concat(spotifyPostURL)"
				height="100%"
				width="100%"
				frameBorder="0"
				allowfullscreen
				allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
			/>
			-->
		</v-carousel-item>
	</v-carousel>
</template>
