<template>
    <div class="home" ref="homeRef">
        <div class="home_alert">
            {{ data?.webNike }} {{ data?.webName }}
        </div>
        <div class="home_user">
            <div class="home_user_img" @click="handleShow(data?.avatar)">
                <img :src="data?.avatar" loading="lazy" />
            </div>
            <div class="home_user_dir"></div>
            <div class="home_user_text">
                <div class="home_user_text_item">{{ data?.name }}</div>
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
useSeoMeta({
    title: 'qinfugui',
    description: '个人用例',
    keywords: 'qinfugui,qfg'
})

const homeEl = useTemplateRef('homeRef')
const dialogRef = ref()
const isHide = ref<boolean>(false)
const data = ref<InfoType>()
const list = ref<listType[]>()

const { data: blogInfo } = await useAsyncData('blogInfo', () =>
    request<InfoType>('/getQfgBlogInfo')
);
const { data: blogList } = await useAsyncData('blogList', () =>
    request<listType[]>('/getQfgBlogMsgList')
);
data.value = blogInfo.value?.data;
list.value = blogList.value?.data;
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

</script>
<style scoped lang="scss">
@import './index.scss';
</style>