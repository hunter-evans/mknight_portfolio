<script setup lang="ts">
	// input props
	const props = defineProps(["project"]);

	// reactive values
	const carouselIndex = ref(0);

	function clearIFrame(side) {
		let idx = 0;
		if(side === "left") {
			idx = ((carouselIndex.value === (props.project.id.length - 1)) ? 0 : (carouselIndex.value + 1));
		}
		else if(side === "right") {
			idx = ((carouselIndex.value === 0) ? (props.project.id.length - 1) : (carouselIndex.value - 1));
		}

		let iframe = document.getElementById(props.project.name + idx).contentWindow;
		iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
	}
</script>

<template>
	<v-carousel
		v-model="carouselIndex"
		:show-arrows="props.project.id.length > 1"
		:progress="props.project.id.length > 1 ? 'white' : false"
		height="352"
		hide-delimiters
	>
		<template 
			v-slot:prev="{ props }"
		>
			<v-btn
				icon="mdi-chevron-left"
				@click="props.onClick(); clearIFrame('left')"
			/>
		</template>
		<template 
			v-slot:next="{ props }"
		>
			<v-btn
				icon="mdi-chevron-right"
				@click="props.onClick(); clearIFrame('right')"
			/>
		</template>
		<v-carousel-item
			v-for="(track, n) in props.project.id"
			cover
		>
			<p
				v-if="props.project.category === 'award'"
				class="mt-0"
			>
				WINNER: 
				<a 
					:href="props.project.link" 
					target="_blank"
				>
					{{ props.project.description }}
				</a>
			</p>
			<iframe
				:id="props.project.name + n"
				:src="track"
				:title="props.project.platform + 'video player'"
				:style=" props.project.platform === 'Spotify' ? 'border-radius:12px' : null"
				:height="props.project.category === 'award' ? '89%' : '100%'"
				width="100%"
				frameborder="0"
				loading="lazy"
				allowfullscreen
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			/>
		</v-carousel-item>
	</v-carousel>
</template>
