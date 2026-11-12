<script setup lang="ts">
  import tabArr from 'data/tabs.json'

  // TODO: incorporate GSO/UMW icons
  const drawer = ref(false)
</script>

<template>
  <v-app-bar
    :location="$vuetify.display.mobile ? 'bottom' : 'top'"
    order="1"
    :scroll-behavior="!$vuetify.display.mobile ? 'hide inverted collapse' : undefined"
  >
    <template #prepend>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
      />
    </template>

    <v-app-bar-title>
      Projects
    </v-app-bar-title>

    <template #append>
      <v-btn
        class="m-2"
        icon="mdi-theme-light-dark"
        @click="$vuetify.theme.cycle()"
      />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    elevation="2"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    :rounded="true"
    temporary
  >
    <v-list nav>
      <v-list-item
        v-for="item in tabArr"
        :key="item.title"
        :href="'#' + item.href"
        :title="item.title"
        @click="drawer = false"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
