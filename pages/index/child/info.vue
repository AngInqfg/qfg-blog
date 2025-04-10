<template>
    <div class="home_info">
        <div class="home_info_left">
            <div class="tab">
                <div class="tab_item" v-for="item in myTabList" :key="item.value"
                    :class="{ active: myActive === item?.value }" @click="myActive = item?.value">
                    <img v-if="item?.img" :src="item?.img"> {{ item?.label }}
                </div>
            </div>
            <div class="content">
                <div class="content_user" v-show="myActive === 1">
                    <div>姓名：
                        <pre>{{ item?.name }}</pre>
                    </div>
                    <div>经验：
                        <pre>{{ time }}</pre>
                    </div>
                    <div>教育：
                        <pre>{{ item?.school?.schoolName }}</pre>
                    </div>
                    <div>
                        <pre>{{ item?.school?.schoolStartDay }}-{{ item?.school?.schoolEndDay }}</pre>
                    </div>
                    <div>
                        <pre v-html="item?.describe?.join('\n')"></pre>
                    </div>
                    <div></div>
                    <div>
                        预览：
                        <a style="font-weight: 400;" :href="item?.biographicalNotesUrl" target="_blank">
                            {{ item?.biographicalNotesName }}
                        </a>
                    </div>
                </div>
                <div class="content_skill" v-show="myActive === 2">
                    <div v-for="(skillItem, index) in item?.skill" :key="`${index}skill`">
                        {{ skillItem }}
                    </div>
                </div>
                <div class="content_ing" v-show="myActive === 3">
                    <div v-for="(companyItem, index) in item?.company" :key="`${index}company`">
                        <p>{{ companyItem?.name }}</p>
                        <p>{{ companyItem?.position }} </p>
                        <p>
                            {{ companyItem?.startTime }}
                            -
                            {{ companyItem?.endTime === '至今' ? Dayjs().format('YYYY.MM') : companyItem?.endTime }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="home_info_right">
            <div class="tab">
                <div class="tab_item" v-for="item in otherTabList" :key="item.value"
                    :class="{ active: otherActive === item?.value }" @click="otherActive = item?.value">
                    {{ item?.label }}
                </div>
            </div>
            <div class="content">
                <div class="content_chat" v-show="otherActive === 1">
                    <div class="content_chat_tab">
                        <div class="content_chat_tab_item" v-for="item in chatTabList" :key="item.value"
                            :class="{ active: chatActive === item?.value }" @click="chatActive = item?.value">
                            <img v-if="item?.img" :src="item?.img">
                        </div>
                    </div>
                    <div style="margin: 12px 0 0;font-size: 18px;">
                        {{
                            chatActive === 1 ? item?.qq :
                                chatActive === 2 ? item?.wx :
                                    chatActive === 3 ? item?.phone :
                                        chatActive === 4 ? item?.email : ''
                        }} <span v-if="[1, 2].includes(chatActive)" style="margin-left: 10px;">{{ item?.wxName }}</span>
                        <br>
                        <img v-if="[1, 2].includes(chatActive)"
                            @click="handleShow(chatActive === 1 ? item?.qqCode : item?.wxCode)"
                            :src="chatActive === 1 ? item?.qqCode : item?.wxCode" />
                    </div>
                </div>
                <div class="content_work" v-show="otherActive === 2">
                    <div class="content_o" @click="handleDownload('', item?.biographicalNotesWorkDownloadUrl)">
                        {{ item?.biographicalNotesWorkDownloadName }}
                    </div>
                    <div class="content_o"
                        @click="handleDownload(item?.biographicalNotesPdfDownloadName, item?.biographicalNotesPdfDownloadUrl)">
                        <span>
                            {{ item?.biographicalNotesPdfDownloadName }}
                        </span>
                        <span>
                            ↓
                        </span>
                    </div>
                    <div class="content_o"
                        @click="handleDownload(item?.biographicalNotesPngDownloadName, item?.biographicalNotesPngDownloadUrl)">
                        <span>
                            {{ item?.biographicalNotesPngDownloadName }}
                        </span>
                        <span>
                            ↓
                        </span>
                    </div>
                </div>
                <div class="content_o content_url" v-show="otherActive === 3">
                    <div>
                        <span>CURRENT：</span>
                        <span class="url">
                            <a :href="item?.currentUrl" target="_blank">
                                当前链接 {{ item?.currentUrl }}
                            </a>
                        </span>
                    </div>
                    <div>
                        <span>SCDN：</span>
                        <span class="url">
                            <a :href="item?.csdnUrl" target="_blank">
                                {{ item?.csdnName }} {{ item?.csdnUrl }}
                            </a>
                        </span>
                    </div>
                    <div>
                        <span>GIT：</span>
                        <span class="url">
                            <a :href="item?.giteeUrl" target="_blank">
                                {{ item?.giteeName }} {{ item?.giteeUrl }}
                            </a>
                        </span>
                    </div>
                </div>
                <div class="content_o content_demo" v-show="otherActive === 4">
                    <div>
                        <span>CURRENT：</span>
                        <span class="url">{{ item?.demoCurrentUrl }}</span>
                    </div>
                    <div @click="handleDownload('qfgDemoElectron', item?.demoElectronUrl)">
                        <span>ELECTRON：</span>
                        <span class="url">{{ item?.demoElectronUrl }}↓</span>
                    </div>
                    <div @click="handleDownload('qfgDemoaPP', item?.demoAppUrl)">
                        <span>APP：</span>
                        <span class="url">{{ item?.demoAppUrl }}↓</span>
                    </div>
                    <div style="display: flex;" @click="handleShow(item?.demoWxXcxUrl)">
                        <span>WEIXINXCX：</span>
                        <img :src="item?.demoWxXcxUrl" />
                    </div>
                </div>
            </div>
        </div>
        <Dialog ref="dialogRef">
            <img :src="bigImage" />
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import Dayjs from 'dayjs'
import { ref } from 'vue';
import Dialog from '@/components/Dialog.vue'
import { getDiffYear } from '@/composables'
const props = defineProps<{ item: InfoType }>()
const myList = [
    { value: 1, label: '信息', icon: 'info', img: '' },
    { value: 2, label: '技能', icon: 'skill', img: '' },
    { value: 3, label: '经历', icon: 'ing', img: '' },
] as const
const myTabList = ref<typeof myList>(myList)
const myActive = ref<typeof myList[number]['value']>(1)
const otherList = [
    { value: 1, label: '通讯' },
    { value: 2, label: '文件' },
    { value: 3, label: 'URL' },
    { value: 4, label: 'DEMO' },
] as const
const otherTabList = ref<typeof otherList>(otherList)
const otherActive = ref<typeof otherList[number]['value']>(1)
const chatList = [
    { value: 1, icon: 'qq', img: '' },
    { value: 2, icon: 'wx', img: '' },
    { value: 3, icon: 'phone', img: '' },
    { value: 4, icon: 'email', img: '' },
] as const
const chatTabList = ref<typeof chatList>(chatList)
const chatActive = ref<typeof chatList[number]['value']>(1)

const time = `${getDiffYear(props?.item?.experience)?.y}年${getDiffYear(props?.item?.experience)?.m}月`

const dialogRef = ref()
const bigImage = ref<InfoType['avatar']>('')
const handleShow = (str: InfoType['avatar'] = '') => {
    bigImage.value = str
    dialogRef.value.open()
}

const module = import.meta.glob('@/assets/icons/*.svg')
const setChatImg = async () => {
    if (import.meta.client) {
        const res1 = myTabList.value.map(async (n) => {
            const res: any = await module[`/assets/icons/${n?.icon}.svg`]();
            (n as any).img = res.default
            return n
        })
        const data1 = await Promise.allSettled(res1)
        myTabList.value = data1.map((n: any) => n.value) as any
        const res2 = chatTabList.value.map(async (n) => {
            const res: any = await module[`/assets/icons/${n?.icon}.svg`]();
            (n as any).img = res.default
            return n
        })
        const data2 = await Promise.allSettled(res2)
        chatTabList.value = data2.map((n: any) => n.value) as any
    }
}
setChatImg()

const handleDownload = (name: string, url: string) => {
    if (!name || !url) return
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
}
</script>