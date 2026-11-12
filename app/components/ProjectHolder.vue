<script setup lang="ts">
  // input props
  const inputProps = defineProps(['project'])

  // reactive values
  const carouselIndex = ref(0)

  function clearIFrame (side) {
    let idx = 0
    if (side === 'left') {
      idx = ((carouselIndex.value === (inputProps.project.id.length - 1)) ? 0 : (carouselIndex.value + 1))
    } else if (side === 'right') {
      idx = ((carouselIndex.value === 0) ? (inputProps.project.id.length - 1) : (carouselIndex.value - 1))
    }

    const iframe = document.querySelector('#' + inputProps.project.name + idx).contentWindow
    iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
  }
</script>

<template>
  <p class="mt-0">
    <span v-if="inputProps.project.category === 'award'">WINNER: </span>

    <a
      v-if="inputProps.project.category === 'award'"
      :href="inputProps.project.link"
      target="_blank"
    >
      {{ inputProps.project.description }}
    </a>

    <template v-else>{{ inputProps.project.description }}</template>
  </p>

  <v-carousel
    v-model="carouselIndex"
    :height="inputProps.project.platform === 'Drive' ? '200' : '500'"
    hide-delimiters
    :progress="inputProps.project.id.length > 1 ? 'white' : false"
    :show-arrows="inputProps.project.id.length > 1"
  >
    <template #prev="{ props }">
      <v-btn
        icon="mdi-chevron-left"
        @click="props.onClick(); clearIFrame('left')"
      />
    </template>

    <template #next="{ props }">
      <v-btn
        icon="mdi-chevron-right"
        @click="props.onClick(); clearIFrame('right')"
      />
    </template>

    <v-carousel-item
      v-for="(track, n) in inputProps.project.id"
      :key="track"
      cover
    >
      <iframe
        :id="inputProps.project.name + n"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
        :height="inputProps.project.category === 'award' ? '89%' : '100%'"
        loading="lazy"
        :src="track"
        :style=" inputProps.project.platform === 'Spotify' ? 'border-radius:12px' : null"
        :title="inputProps.project.platform + 'video player'"
        width="100%"
      />
    </v-carousel-item>
  </v-carousel>
</template>
