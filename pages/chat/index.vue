<template>
    <div class="chat_content" v-if="isClient">
        <div class="chat_content_head">
            <span>讯飞星火API 4.0Ultra</span>
            <span></span>
        </div>
        <div class="chat_content_container">
            <div class="chat_content_container_menu" :class="{
                isMask: !isMask
            }">
                <div class="item" @click="handleCreate(true)">
                    <span>创建新窗口</span>
                </div>
                <div v-for="item in menuList" :key="item?.id" @click="handleCheckoutMenu(item?.id)">
                    <div class="create">{{ dayjs(item?.id).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    <div class="item val" :class="{
                        active: menuActive === item?.id
                    }">
                        <span>{{ item?.title }}</span>
                    </div>
                </div>
            </div>
            <div class="mask" v-if="isMask" @click="isMask = false"></div>
            <div class="chat_content_container_box">
                <div class="chat_content_container_box_list" ref="listRef">
                    <div class="content" v-for="(item, index) in historyList" :key="index" :class="{
                        user: item?.role === 'user',
                        chat: item?.role !== 'user'
                    }">
                        <div class="content_name">
                            <span>{{ item?.role === 'user' ? 'qfg' : 'chat' }}</span>
                            <span class="time">{{ dayjs(item?.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        </div>
                        <div class="content_result">
                            <pre>
                                {{ item?.content }}
                            </pre>
                        </div>
                    </div>
                </div>
                <div class="again_send" v-if="isAbout" @click="handleAngin">
                    重新获取
                </div>
                <div class="chat_content_container_box_btn">
                    <div class="btn" @click="handleClearMenu">
                        <svg viewBox="0 0 1024 1024" version="1.1" width="18" height="18">
                            <path
                                d="M573.013 725.333v-335.36a30.72 30.72 0 0 1 61.44 0v335.36a30.72 30.72 0 0 1-61.44 0m-183.466 0v-335.36a30.72 30.72 0 0 1 61.44 0v335.36a30.72 30.72 0 0 1-61.44 0m519.68-487.68H756.48V176.64a91.307 91.307 0 0 0-90.88-91.307H359.253a91.307 91.307 0 0 0-91.733 91.307v61.013H114.773a30.72 30.72 0 0 0 0 61.014h794.454a30.72 30.72 0 0 0 0-61.014M328.533 176.64a31.147 31.147 0 0 1 30.72-30.293H665.6a29.44 29.44 0 0 1 29.867 30.293v61.013H328.533V176.64m396.8 762.027H298.667a91.307 91.307 0 0 1-91.734-91.307V389.973a29.867 29.867 0 0 1 30.294-30.293 30.293 30.293 0 0 1 30.72 30.293V847.36a31.147 31.147 0 0 0 30.72 30.293h426.666a31.147 31.147 0 0 0 30.72-30.293V391.253a30.72 30.72 0 0 1 61.014 0V847.36a91.307 91.307 0 0 1-91.734 91.307z" />

                        </svg>
                    </div>
                    <div class="btn phoneMenuBtn seft" :class="{ active: isMask }" @click="isMask = true">
                        <svg viewBox="0 0 1024 1024" version="1.1" width="18" height="18">
                            <path
                                d="M332.3904 813.4656h545.1776c17.8176 0 31.3344-13.312 31.3344-31.3344s-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176 0-31.3344 13.312-31.3344 31.3344 0 13.312 13.5168 31.3344 31.3344 31.3344z m0-268.288h545.1776c22.3232 0 35.84-13.312 35.84-31.3344s-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176-4.5056-31.3344 9.0112-31.3344 31.3344 0 18.0224 13.5168 31.3344 31.3344 31.3344z m0-263.5776h545.1776c22.3232 0 35.84-17.8176 35.84-35.84 0-17.8176-13.312-31.3344-31.3344-31.3344H332.3904c-17.8176 0-31.3344 13.312-31.3344 31.3344 0 17.8176 13.5168 35.84 31.3344 35.84zM158.1056 826.7776c26.8288 0 49.152-22.3232 49.152-49.152s-22.3232-49.152-49.152-49.152-49.152 22.3232-49.152 49.152 22.3232 49.152 49.152 49.152z m49.152-312.9344c0-26.8288-22.3232-49.152-49.152-49.152-26.8288-4.5056-49.152 17.8176-49.152 49.152 0 26.8288 22.3232 49.152 49.152 49.152s49.152-22.3232 49.152-49.152zM158.1056 294.912c26.8288 0 49.152-22.3232 49.152-49.152s-22.3232-49.152-49.152-49.152-49.152 22.3232-49.152 49.152 22.3232 49.152 49.152 49.152z m0 0" />
                        </svg>
                    </div>
                    <div class="btn" :class="{ active: isBigTextarea }" @click="isBigTextarea = !isBigTextarea">
                        <svg viewBox="0 0 1024 1024" version="1.1" width="18" height="18">
                            <path
                                d="M672.495448 771.063111C536.288206 861.520472 350.802077 846.716896 230.724063 726.652386 93.758646 589.702371 93.758646 367.662526 230.724063 230.712511 367.68948 93.762496 589.754297 93.762496 726.719714 230.712511 846.795912 350.775203 861.60252 536.236675 771.139544 672.42803 773.082599 674.008086 774.96705 675.706322 776.783972 677.52304L875.05372 775.781733C902.70344 803.428352 903.102472 847.853384 875.518408 875.434352 848.125328 902.824352 803.92872 903.040688 775.854586 874.969704L677.584842 776.711015C675.771042 774.897418 674.074508 773.01162 672.495448 771.063111L672.495448 771.063111ZM677.120149 677.058399C786.692482 567.498387 786.692482 389.86651 677.120149 280.306498 567.547815 170.746486 389.895962 170.746486 280.323628 280.306498 170.751294 389.86651 170.751294 567.498387 280.323628 677.058399 389.895962 786.61841 567.547815 786.61841 677.120149 677.058399ZM448 448 320 448 320 512 448 512 448 640 512 640 512 512 640 512 640 448 512 448 512 320 448 320 448 448Z" />
                        </svg>
                    </div>
                </div>
                <div class="chat_content_container_box_text">
                    <textarea v-model="messageValue" placeholder="请输入"></textarea>
                    <button @click="sendLoading ? cancelRequest() : sendMessage()">
                        <svg v-show="sendLoading" viewBox="0 0 1024 1024" version="1.1" width="18" height="18">
                            <path fill="#F58E6F"
                                d="M365.014704 657.815846H657.084939V365.74561H365.014704V657.815846z m584.140471-146.035118c0-240.906781-197.125482-438.105353-438.105353-438.105353-240.979872 0-438.105353 197.198572-438.105354 438.105353 0 240.979872 197.125482 438.178444 438.105354 438.178444 240.979872 0 438.105353-197.198572 438.105353-438.178444zM511.634547 0.730906c281.399001 0 511.634547 230.235546 511.634547 511.634547s-230.235546 511.634547-511.634547 511.634547-511.634547-230.235546-511.634547-511.634547 230.235546-511.634547 511.634547-511.634547z" />
                        </svg>
                        <svg v-show="!sendLoading" viewBox="0 0 1024 1024" version="1.1" width="18" height="18">
                            <path
                                d="M324.078 650.246c-0.908 0-1.82-0.152-2.698-0.46L5.452 538.886a8.152 8.152 0 0 1-0.388-15.234l1007.7-412.284a8.152 8.152 0 0 1 8.002 14.044L328.994 648.596a8.134 8.134 0 0 1-4.916 1.65z m-292.98-119.632l291.552 102.344 638.396-482.82L31.098 530.614z"
                                p-id="4493"></path>
                            <path d="M84.64 529.254l748.538-306.252-513.86 388.63z" fill="#DFDFDF" p-id="4494"></path>
                            <path
                                d="M324.08 956.712a8.15 8.15 0 0 1-8.154-8.152V642.096c0-2.554 1.196-4.96 3.234-6.5L1010.932 112.412a8.154 8.154 0 0 1 10.674 12.272L465.634 679.326l-134.244 272.832a8.152 8.152 0 0 1-7.31 4.554z m8.148-310.56v267.384l119.38-242.622c0.396-0.804 0.92-1.538 1.554-2.172L925.794 197.238 332.228 646.152z"
                                p-id="4495"></path>
                            <path d="M351.246 655.612L715.666 380 436.534 658.468l-85.288 173.338z" fill="#F58E6F"
                                p-id="4496"></path>
                            <path
                                d="M792.56 823.806c-1.08 0-2.16-0.214-3.176-0.644l-333.642-141.146a8.152 8.152 0 0 1-2.582-13.276l556.932-555.6a8.144 8.144 0 0 1 10.004-1.184 8.146 8.146 0 0 1 3.512 9.442L800.322 818.144a8.148 8.148 0 0 1-7.762 5.662z m-319.308-152.08l314.272 132.948L997.846 148.384 473.252 671.726z"
                                p-id="4497"></path>
                            <path d="M506.694 665.226l449.142-448.07-180.074 561.896z" fill="#DFDFDF" p-id="4498">
                            </path>
                            <path
                                d="M324.074 956.71a8.148 8.148 0 0 1-7.31-11.75l134.842-274.048a8.15 8.15 0 0 1 10.488-3.906l80.838 34.198a8.142 8.142 0 0 1 2.884 12.954l-215.68 239.85a8.128 8.128 0 0 1-6.062 2.702z m138.758-271.692l-105.45 214.316 168.668-187.572-63.218-26.744z"
                                p-id="4499"></path>
                            <path d="M471.966 709.532l22.108 9.352-58.982 65.592z" fill="#F58E6F" p-id="4500"></path>
                            <path
                                d="M238.726 334.924l-0.16-16.3a117.158 117.158 0 0 0 15.184-1.144l2.276 16.142c-5.718 0.808-11.54 1.246-17.3 1.302z m-17.318-0.96a134.04 134.04 0 0 1-17.044-3.202l4.044-15.792a117.31 117.31 0 0 0 14.958 2.81l-1.958 16.184z m51.6-3.874l-4.346-15.712a125.064 125.064 0 0 0 5.052-1.514l9.822-3.512 5.482 15.35-10.05 3.59a137.816 137.816 0 0 1-5.96 1.798z m-85.126-4.706a135.124 135.124 0 0 1-15.656-7.452l7.944-14.236a118.308 118.308 0 0 0 13.756 6.55l-6.044 15.138z m116.486-6.166l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m-146.704-10.688a134.832 134.832 0 0 1-13.242-11.21l11.318-11.732a117.724 117.724 0 0 0 11.628 9.844l-9.704 13.098z m177.406-0.276l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.704-10.964l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.966l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m-263.73-1.84a133.368 133.368 0 0 1-9.912-14.252l13.96-8.412a117.14 117.14 0 0 0 8.696 12.504l-12.744 10.16z m294.432-9.126l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.7-10.964l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482zM114.866 254.82a137.726 137.726 0 0 1-4.734-12.464 152.826 152.826 0 0 1-1.176-3.82l15.648-4.574c0.328 1.128 0.676 2.254 1.038 3.38 1.2 3.69 2.6 7.384 4.16 10.958l-14.936 6.52z m373.714-1.39l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.966l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.964l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m-444.812-9.88a133.034 133.034 0 0 1-1.562-17.288l16.296-0.4c0.124 5.062 0.586 10.162 1.372 15.158l-16.106 2.53z m475.516-1.086l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.964l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.966l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482zM120.522 188.72l-16.21-1.72c0.608-5.722 1.6-11.47 2.948-17.088l15.85 3.804a118.068 118.068 0 0 0-2.588 15.004z m552.272-1.08l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.966l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.702-10.964l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m-384.946-0.922a119.088 119.088 0 0 0-5.62-14.164l14.736-6.972a135.366 135.366 0 0 1 6.388 16.112l-15.504 5.024z m-221.64-5.618l-15.224-5.824a135.244 135.244 0 0 1 7.22-15.76l14.354 7.732a118.2 118.2 0 0 0-6.35 13.852z m637.288-4.424l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m30.704-10.966l-5.482-15.35 15.35-5.482 5.482 15.35-15.35 5.482z m-459.362-6.464a117.96 117.96 0 0 0-9.068-12.242l12.444-10.53a134.04 134.04 0 0 1 10.326 13.942l-13.702 8.83z m-194.208-4.922l-13.24-9.508a133.96 133.96 0 0 1 11.01-13.404l11.896 11.14a118.664 118.664 0 0 0-9.666 11.772z m174.556-18.268a118.092 118.092 0 0 0-11.916-9.494l9.312-13.376a134.592 134.592 0 0 1 13.566 10.808l-10.962 12.062z m-153.772-3.92l-10.352-12.594a133.558 133.558 0 0 1 14.102-10.122l8.622 13.834a116.85 116.85 0 0 0-12.372 8.882z m128.818-13.454a118.392 118.392 0 0 0-13.944-6.136l5.588-15.314a134.468 134.468 0 0 1 15.87 6.986l-7.514 14.464z m-103.026-2.62l-6.754-14.836a135.878 135.878 0 0 1 14.294-5.548l1.9-0.6 4.812 15.574-1.682 0.532a118.488 118.488 0 0 0-12.57 4.878z m74.464-7.808c-4.94-1.108-10-1.904-15.038-2.362l1.48-16.234c5.738 0.522 11.502 1.428 17.128 2.692l-3.57 15.904z m-45.394-1.15l-2.764-16.064a133.748 133.748 0 0 1 17.254-1.822l0.652 16.288c-5.056 0.202-10.15 0.74-15.142 1.598zM888.778 773.172l-15.866-3.746 3.746-15.864 15.866 3.746-3.746 15.864z m7.49-31.728l-15.866-3.746 3.746-15.866 15.866 3.746-3.746 15.866z m7.492-31.73l-15.866-3.746 3.746-15.864 15.866 3.746-3.746 15.864z m7.492-31.728l-15.866-3.746 3.746-15.864 15.866 3.746-3.746 15.864z m7.49-31.73l-15.866-3.746 3.746-15.866 15.866 3.746-3.746 15.866z m7.494-31.73l-15.866-3.746 3.746-15.864 15.866 3.746-3.746 15.864z m7.492-31.728l-15.866-3.746 3.746-15.864 15.866 3.746-3.746 15.864z m7.49-31.728l-15.866-3.746 3.746-15.866 15.866 3.746-3.746 15.866z m7.492-31.73l-15.866-3.746 3.746-15.864 15.866 3.746-3.746 15.864z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <Dialog ref="dialogRef" @close="isBigTextarea = false">
            <textarea class="dialogText" v-model="messageValue" placeholder="请输入"></textarea>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
useSeoMeta({
    title: 'qinfugui 讯飞星火 4.0Ultra',
    description: 'qinfugui讯飞星火Api测试4.0Ultra',
})

const isClient = process.client;

const listEl = useTemplateRef<HTMLDivElement>('listRef')
const menuList = ref<chatMenuType[]>([]) // 通讯栏
const menuActive = ref<chatMenuType['id']>() // 选中的通讯栏
const historyList = ref<chatListType[]>([]) // 历史通讯记录
const userSendList = ref<chatListType[]>([]) // 用户历史发送的消息
const messageValue = ref<string>('') // 发送文本
const sendLoading = ref<boolean>(false) // 请求状态
const isBigTextarea = ref<boolean>(false) // 查看大textarea
const isMask = ref<boolean>(false) // 手机端遮影
const isAbout = ref<boolean>(false) // 手机端遮影
const isCreateMenu = ref<boolean>(false)
// 获取菜单 然后根据菜单id获取history   
// 每次发送后再把当前值重新保存进数据库
// 再加一个清空菜单标签
onMounted(async () => {
    const res = await request<chatMenuType[]>('/getQfgBlogChatMenu', {}, { sc: true });
    menuList.value = res?.data || []
    if (menuList.value.length > 0) {
        menuActive.value = menuList.value[menuList.value.length - 1].id
        const res = await request<chatListType[]>('/getQfgBlogChatHistory', { id: menuActive.value }, { sc: true })
        historyList.value = res?.data || []
        userSendList.value = historyList.value.filter((n) => {
            return n.role === 'user'
        })
        nextTick(() => {
            if (listEl.value) {
                listEl.value.scrollTop = listEl.value.scrollHeight
            }
        })
    };
})
watch(() => menuActive.value, async (_new, _old) => {
    if (import.meta.client) {
        if (_new !== _old) {
            userSendList.value = historyList.value.filter((n) => {
                return n.role === 'user'
            })
        }
    }
})

// 切换窗口
const handleCheckoutMenu = async (e: number) => {
    cancelRequest()
    isCreateMenu.value = false
    menuActive.value = e
    isMask.value = false
    const res = await request<chatListType[]>('/getQfgBlogChatHistory', { id: e }, { sc: true })
    historyList.value = res?.data || []
    userSendList.value = historyList.value.filter((n) => {
        return n.role === 'user'
    })
    nextTick(() => {
        if (listEl.value) {
            listEl.value.scrollTop = listEl.value.scrollHeight
        }
    })
}
// 创建新窗口
async function handleCreate(bool?: boolean, title?: string) {
    isCreateMenu.value = true
    if (historyList.value.length === 0 && !bool) {
        return
    }
    const id = new Date()?.getTime()
    menuList.value.push({
        title: title || '新窗口',
        id
    })
    await request('/addQfgBlogChatMenu', { title: title || '新窗口', id }, { sc: true })
    await handleCheckoutMenu(id)
}
// 是否停止了
watch(() => sendLoading.value, (_new) => {
    if (!_new) {
        request('/setQfgBlogChatHistory', { list: historyList.value, id: menuActive.value }, { sc: true })
    }
})
// 打开大的输入框
const dialogRef = ref();
watch(() => isBigTextarea.value, (_new) => {
    _new ? dialogRef.value.open() : dialogRef.value.close()
})
// 清空侧边栏
const handleClearMenu = async () => {
    await request('/clearQfgBlogChat', {}, { sc: true });
    menuList.value = []
    historyList.value = []
    userSendList.value = []
}
const controller = shallowRef()
// 发送
const sendMessage = async (bool?: boolean) => {
    isAbout.value = false
    // 如果没有值 就不发送消息
    if (!messageValue.value.trim() && !bool) return
    // 没有通讯栏就创建一个
    if (menuList.value.length === 0) {
        await handleCreate(true, messageValue.value);
    }
    sendLoading.value = true
    // 把发送的消息加入到历史消息记录里并创建一个chat层供接收消息
    if (historyList.value.length === 0) {
        const item = menuList.value.find((n) => n.id === menuActive.value)
        if (item) {
            item.title = messageValue.value
            await request('/updateQfgBlogChatTitle', {id: item.id, text: item.title }, { sc: true });
        };
    }
    if (bool) {
        historyList.value[historyList.value.length - 1] = { role: 'assistant', createTime: new Date().getTime(), content: '' }
    } else {
        userSendValueChange(messageValue.value)
        historyList.value.push(
            { role: 'user', createTime: new Date().getTime(), content: messageValue.value },
            { role: 'assistant', createTime: new Date().getTime(), content: '' }
        )
    }
    sendChatMessage({
        textList: userSendList.value, callback: (e: chatChoicesDeltaType['content']) => {
            getResultData(e)
            if (listEl.value) {
                listEl.value.scrollTop = listEl.value.scrollHeight
            }
        }, endChange: () => {
            sendLoading.value = false
        },
        requestAsyncChange: (e) => {
            controller.value = e
        }
    })
    messageValue.value = ''
};
// 终止
const cancelRequest = async () => {
    isAbout.value = true
    sendLoading.value = false
    controller.value.abort()
}
// 重新发送
const handleAngin = () => {
    sendMessage(true)
}

// 处理发送的信息列表 
function userSendValueChange(val: string) {
    if (val) {
        userSendList.value = [...userSendList.value, { content: val, role: 'user', createTime: new Date().getTime() }]
    }
}
// 向最后一个history持续修改文本
function getResultData(val: string) {
    const last = historyList.value.length - 1
    const item = historyList.value?.[last]
    const newText = (item?.content || '') + val
    historyList.value[last] = { ...item, content: newText }
}
onBeforeUnmount(() => {
    cancelRequest()
})
</script>
<style scoped lang="scss">
@import './index.scss';
</style>