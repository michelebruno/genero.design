<template>
  <div class="flex gap-x-4 h-[90px]">
    <div class="aspect-[136/90] border-2 border-black bg-white" v-show="false">
      <img src="~assets/images/net.png" class="h-full w-full object-fill">
    </div>
    <div v-if="status === 'started'">
      <UiButton class="block h-full px-sm bg-white border-2 aspect-square"
                @click="handlePrev">
        ←
      </UiButton>
    </div>
    <div class="flex-grow border-2 border-black bg-white">
      <Transition appear name="stepper">
        <div class="flex gap-x-sm items-center justify-center h-full"
             ref="stepperRef"
             v-show="!['section', 'options'].includes(currentStep.layout) && status === 'started'">
          <div class="flex" v-if="prevStep">
            <WorkflowPill layout="prev">{{ prevStep?.shortTitle || prevStep.title }}</WorkflowPill>
          </div>
          <div v-if="prevStep">
            >
          </div>
          <div v-if="Array.isArray(currentStep)" class="flex max-w-[30ch] gap-1 justify-center flex-wrap"
               ref="currentPillRef">
            <WorkflowPill v-for="choice in currentStep" :layout="selectedItem?._id === choice._id ? 'active':undefined">
              {{ choice?.shortTitle || choice.title }}
            </WorkflowPill>
          </div>
          <div v-else class="flex">
            <WorkflowPill>{{ currentStep?.shortTitle || currentStep.title }}</WorkflowPill>
          </div>
          <div>
            >
          </div>
          <div class="flex">
            <WorkflowPill layout="next">Next step</WorkflowPill>
          </div>
        </div>
      </Transition>
    </div>
    <div class="flex bg-white" ref="navButtons">
      <UiButton :class="['block h-full  border-2', status !== 'final' && 'aspect-square']" @click="handleNext" primary
                :disabled="isNextDisabled"
                :theme="status === 'started' && 'dark'  ">
        <template v-if="status === 'onboarding'">Start</template>
        <template v-else-if="status === 'started'">Next →</template>
        <template v-else-if="status === 'final'">Get your <br> report ↗</template>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useWorkflowsStore} from "../../store/workflows";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted} from "#imports";

const workflowsStore = useWorkflowsStore()
const {getItem, goNext, goBack} = workflowsStore
const {selectedItem, status, prevSteps, nextSteps, showModal} = storeToRefs(workflowsStore)

function handleNext() {
  goNext()
}

function handlePrev() {
  goBack()
}

const navButtons = ref(null)
const currentPillRef = ref(null)
const stepperRef = ref(null)

const isNextDisabled = computed(() => {
  if (workflowsStore.currentStep.layout === 'choose' && !showModal.value) {
    return false
  }
  return !workflowsStore.canMoveOn ? {text: 'Select an option to continue'} : false
})


const currentStep = computed(() => {
  return workflowsStore.showModal ? workflowsStore.currentStep.items : workflowsStore.currentStep
})

const nextStep = computed(() => {
  return nextSteps.value[1]
})

const prevStep = computed(() => {
  if (workflowsStore.currentStep.layout === 'choose' && showModal.value) return workflowsStore.currentStep

  return prevSteps.value.filter(n => !['options'].includes(n.layout)).slice(-1)[0]
})

watch(currentStep, () => {
  let stepperWidth = 0;

  stepperRef?.value?.childNodes.forEach((e: Element) => {
    stepperWidth += e.clientWidth
  })

})


function keyListener(e) {

  e = e || window.event;

  if (e.keyCode == '38') {
    // up arrow
  } else if (e.keyCode == '40') {
    // down arrow
  } else if (e.keyCode == '37') {
    // left arrow
    goBack()
  } else if (e.keyCode == '39') {
    // right arrow
    !isNextDisabled.value && goNext()
  }

}

onMounted(() => window?.addEventListener('keydown', keyListener)
)

onUnmounted(() => window?.removeEventListener('keydown', keyListener))

</script>

<style scoped lang="scss">

.stepper-enter-active,
.stepper-leave-active {
  transition: opacity 0.5s ease;
}

.stepper-enter-from,
.stepper-leave-to {
  opacity: 0;
}

</style>