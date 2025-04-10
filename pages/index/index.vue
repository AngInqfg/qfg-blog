<template>
    <div class="home" ref="homeRef" v-if="isClient && !loading">
        <div class="home_alert">
            {{ data?.webNike }} {{ data?.webName }}
        </div>
        <div class="home_user">
            <div class="home_user_img" @click="handleShow(data?.avatar)">
                <img :src="data?.avatar" />
            </div>
            <div class="home_user_dir"></div>
            <div class="home_user_text">
                <div class="home_user_text_item" @click="NumerousTimes(handleEdit, 500, 10)">{{ data?.name }}</div>
                <div class="home_user_text_item">{{ data?.nikeName }} | {{ data?.webNike }}</div>
                <div class="home_user_text_item">{{ data?.city }}</div>
            </div>
            <Time />
        </div>
        <Info v-if="data" :item="data" />
        <MsgC v-if="list" :list="list" />
        <div class="menu" :class="{
            isHide: isHide
        }">
            <div class="menu_item" @click="goTop">↑</div>
            <div class="menu_item" @click="handleChat">C</div>
            <div class="menu_change" @click="isHide = !isHide">S</div>
            <div style="opacity: 0;pointer-events: none;"></div>
        </div>
        <Dialog ref="dialogRef">
            <img :src="bigImage" />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import Time from './child/time.vue'
import Info from './child/info.vue'
import MsgC from './child/message.vue'
import Dialog from '@/components/Dialog.vue'
import { useStore } from '@/store';
useSeoMeta({
    title: 'qinfugui',
    description: '个人用例',
    keywords: 'qinfugui,qfg'
})

const isClient = process.client;

const store = useStore()
const homeEl = useTemplateRef('homeRef')
const dialogRef = ref()
const isHide = ref<boolean>(false)
const data = ref<InfoType>()
const list = ref<listType[]>()
const loading = ref<boolean>(true)
const res1 = await request<InfoType>('/getQfgBlogInfo')
data.value = res1.data
const res2 = await request<listType[]>('/getQfgBlogMsgList')
list.value = res2.data

const bigImage = ref('')
const handleShow = (str: InfoType['avatar'] = '') => {
    bigImage.value = str
    dialogRef.value.open()
}

const goTop = () => {
    homeEl.value?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
const handleChat = () => {
    navigateTo('/chat')
}

const handleEdit = () => {
    navigateTo('/editInfo')
}
onBeforeMount(() => {
    loading.value = false
})
</script>
<style scoped lang="scss">
@import './index.scss';
</style>