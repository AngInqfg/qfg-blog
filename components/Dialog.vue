<template>
    <dialog class="dialog_el" ref="dialogRef">
        <div class="dialog_el_content">
            <div class="close" @click="close">×</div>
            <slot></slot>
        </div>
    </dialog>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
const isShow = ref(false)
const dialogEl = useTemplateRef('dialogRef')
const emits = defineEmits(['close'])
const open = () => {
    dialogEl.value.showModal()
    isShow.value = true
}
const show = () => {
    dialogEl.value.show()
    isShow.value = true
}
const close = () => {
    isShow.value = false
    dialogEl.value.close()
}
onMounted(() =>{
    nextTick(() =>{
        dialogEl.value.addEventListener('close', () => {
            emits('close')
        });
    })
})
defineExpose({
    open, close, show
})
</script>
<style scoped lang="scss">
.dialog_el {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    margin: 0;
    padding: 0;
    outline: none;
    border: 0;
    overflow: hidden;

    &_content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    &::v-deep img {
        width: 90vmin;
        height: 90vmin;
        object-fit: contain;
    }


    .close {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 12px;
        color: #ddd;
        font-size: 30px;
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
    }

    @include fitter('phone') {
        background: #000;

        .close {
            color: var(--bgColor);
        }
    }
}
</style>