<template>
  <div
      :class="['relative', isWorkflow && 'workflow-wrapper transition-[background-color]',
      workflowStore.currentStep?.theme === 'green'
        ? 'bg-green'
        :  store.theme ==='dark'
          ? 'bg-primary'
          : undefined
       ]">
    <nav v-if="isWorkflow"
         :class="[store.theme === 'dark' && 'text-white', 'group !pb-0 !flex-shrink !flex-grow-0 grid grid-cols-[1fr_auto_1fr]']">
      <div id="logo-wrapper">
        <GeneroLogo/>
      </div>
      <div
          class="opacity-0 -translate-y-full duration-1000 group-hover:translate-y-0 group-hover:opacity-100 transition select-none ">
        <span>
          {{ workflowStore.currentFlow.title }}
        </span>
      </div>
      <div class="text-right ">
        <NuxtLink class="text-fix-mono font-mono font-bold p-sm" to="/" title="Exit">X</NuxtLink>
      </div>
    </nav>
    <nav v-else class="flex fixed left-0 right-0 w-full top-0 bg-white z-30 border-b border-black">
      <div id="logo-wrapper">
        <NuxtLink to="/">
          <GeneroLogo/>
        </NuxtLink>
      </div>
      <div class="flex gap-x-md">
        <NuxtLink active-class="font-semibold text-primary" class="hover:text-primary" to="/workflows">Workflows
        </NuxtLink>
        <NuxtLink active-class="font-semibold text-primary" class="hover:text-primary" to="/tools">AI tools</NuxtLink>
        <NuxtLink active-class="font-semibold text-primary" class="hover:text-primary" to="/glossary">Glossary
        </NuxtLink>
      </div>
    </nav>
    <NuxtPage/>

    <div id="noise-wrapper">
      <div id="noise-animation"></div>
    </div>
  </div>
</template>

<script setup>

import {useStore} from "../store/store";
import {useWorkflowsStore} from "../store/workflows";

const route = useRoute();
const store = useStore();
const workflowStore = useWorkflowsStore()

const isWorkflow = computed(() => !!route.params.slug)


</script>

<style scoped lang="scss">
#noise-wrapper {
  inset: 0;

  pointer-events: none;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000000;
}

#noise-animation {
  animation: 3s steps(6) 0s infinite normal none running noise;

  width: calc(100% + 20rem);
  height: calc(100% + 20rem);
  background-position: 50% center;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  left: -10rem;
  top: -10rem;
  background-image: url(~/assets/images/noise.webp);
  background-size: 10% 10%;
}

@keyframes noise {

  0%, 100% {
    transform: translate(0px, 0px);
  }

  10% {
    transform: translate(-5rem, -5rem);
  }
  30% {
  }
  50% {
    transform: translate(10rem, 10rem);
  }
  70% {
    transform: translate(9rem, 3rem);
  }
  90% {
    transform: translate(-1rem, 7rem);
  }
}

#logo-wrapper {
  @apply h-6 w-auto;

  svg {
    @apply block h-full w-auto
  }
}

nav {
  @apply py-md px-outsides flex-shrink flex-grow-0 w-full justify-between items-center
}

.workflow-wrapper {
  @apply w-full h-screen flex flex-col flex-wrap;

}
</style>