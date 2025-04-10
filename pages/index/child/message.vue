<template>
    <div class="home_message">
        <div class="home_message_content">
            <div class="home_message_content_item" v-for="(item, index) in list"
                :key="`${index}msgList`">
                <div>{{ item?.content }}</div>
                <div class="img_list">
                    <div v-for="(imgChild, idx) in item?.imageList" :key="`${index}${idx}imgList`"
                        @click="handleShow(imgChild)">
                        <img :src="imgChild">
                    </div>
                </div>
                <div>{{ item?.createTime }}</div>
            </div>
            <div class="loading"></div>
        </div>
        <Dialog ref="dialogRef">
            <img :src="bigImage" />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Dialog from '@/components/Dialog.vue'
defineProps<{ list: listType[] }>()
const dialogRef = ref()
const bigImage = ref<string>('')
const handleShow = (str: string) => {
    bigImage.value = str
    dialogRef.value.open()
}
</script>