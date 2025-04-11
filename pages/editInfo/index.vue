<template>
    <div class="edit">
        <div class="edit_content">
            <div class="title">信息</div>
            <div class="info">
                <div class="content">
                    <div class="their">pdf预览：</div>
                    <input type="text" placeholder="url" v-model="detail.biographicalNotesUrl" />
                </div>
                <div class="content textareaList">
                    <div class="their">个人：</div>
                    <div class="list">
                        <div v-for="(item, idx) in detail?.describe" :key="idx">
                            <textarea placeholder="请输入" v-model="item.value" />
                            <div class="remove" @click="handleRemove('describe', idx)">-</div>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <div class="title" @click="handleAdd('describe')">+</div>
                </div>
            </div>
            <div class="title">图片</div>
            <div class="upload">
                <div class="upload_item">
                    <div>头像上传</div>
                    <div class="upload_item_content">
                        <img :src="detail?.avatar">
                        <div class="remark" v-show="detail?.avatar">
                            <span @click="handleShow(detail?.avatar)">查看</span>
                            <span @click="handleUpload('avatar')">上传</span>
                        </div>
                    </div>
                </div>
                <div class="upload_item">
                    <div>QQ二维码</div>
                    <div class="upload_item_content">
                        <img :src="detail?.qqCode">
                        <div class="remark" v-show="detail?.qqCode">
                            <span @click="handleShow(detail?.qqCode)">查看</span>
                            <span @click="handleUpload('qqCode')">上传</span>
                        </div>
                    </div>
                </div>
                <div class="upload_item">
                    <div>微信二维码</div>
                    <div class="upload_item_content">
                        <img :src="detail?.wxCode">
                        <div class="remark" v-show="detail.wxCode">
                            <span @click="handleShow(detail?.wxCode)">查看</span>
                            <span @click="handleUpload('wxCode')">上传</span>
                        </div>
                    </div>
                </div>
                <div class="upload_item">
                    <div>小程序二维码</div>
                    <div class="upload_item_content">
                        <img :src="detail?.demoWxXcxUrl">
                        <div class="remark" v-show="detail?.demoWxXcxUrl">
                            <span @click="handleShow(detail?.demoWxXcxUrl)">查看</span>
                            <span @click="handleUpload('demoWxXcxUrl')">上传</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="title">经历</div>
            <div class="ing">
                <div class="content" v-for="(item, idx) in detail?.company" :key="idx">
                    <input type="text" placeholder="公司" v-model="item.name">
                    <input type="text" placeholder="职位" v-model="item.position">
                    <input type="date" placeholder="开始时间" v-model="item.startTime">
                    {{ item.startTime }}
                    <input type="date" placeholder="结束时间" v-model="item.endTime">
                    <div @click="handleRemove('company', idx)">-</div>
                </div>
                <div class="btn">
                    <div class="title" @click="handleAdd('company')">+</div>
                </div>
            </div>
            <div class="title">技能</div>
            <div class="skill">
                <div class="content" v-for="(item, idx) in detail?.skill" :key="idx">
                    <textarea placeholder="请输入" v-model="item.value" />
                    <div @click="handleRemove('skill', idx)">-</div>
                </div>
                <div class="btn">
                    <div class="title" @click="handleAdd('skill')">+</div>
                </div>
            </div>
            <div class="title">通讯</div>
            <div class="chat">
                <div class="content">
                    <div class="their">QQ：</div>
                    <input type="text" placeholder="NAME" v-model="detail.qqName">
                    <input type="text" placeholder="QQ" v-model="detail.qq">
                </div>
                <div class="content">
                    <div class="their">微信：</div>
                    <input type="text" placeholder="NAME" v-model="detail.wxName">
                    <input type="text" placeholder="微信" v-model="detail.wx">
                </div>
                <div class="content">
                    <div class="their">电话：</div>
                    <input type="text" placeholder="手机号" v-model="detail.phone">
                </div>
                <div class="content">
                    <div class="their">邮箱：</div>
                    <input type="text" placeholder="邮箱" v-model="detail.email">
                </div>
            </div>
            <div class="title">URL</div>
            <div class="url">
                <div class="second"> 文件 </div>
                <div class="content">
                    <div class="their">work：</div>
                    <input type="text" placeholder="name" v-model="detail.biographicalNotesWorkDownloadName">
                    <input type="text" placeholder="url" v-model="detail.biographicalNotesWorkDownloadUrl">
                </div>
                <div class="content">
                    <div class="their">pdf：</div>
                    <input type="text" placeholder="name" v-model="detail.biographicalNotesPdfDownloadName">
                    <input type="text" placeholder="url" v-model="detail.biographicalNotesPdfDownloadUrl">
                </div>
                <div class="content">
                    <div class="their">png：</div>
                    <input type="text" placeholder="name" v-model="detail.biographicalNotesPngDownloadName">
                    <input type="text" placeholder="url" v-model="detail.biographicalNotesPngDownloadUrl">
                </div>
                <div class="second"> URL </div>
                <div class="content">
                    <div class="their">当前：</div>
                    <input type="text" placeholder="url" v-model="detail.currentUrl">
                </div>
                <div class="content">
                    <div class="their">SCDN：</div>
                    <input type="text" placeholder="name" v-model="detail.csdnName">
                    <input type="text" placeholder="url" v-model="detail.csdnUrl">
                </div>
                <div class="content">
                    <div class="their">GIT：</div>
                    <input type="text" placeholder="name" v-model="detail.giteeName">
                    <input type="text" placeholder="url" v-model="detail.giteeUrl">
                </div>
                <div class="second"> DEMO </div>
                <div class="content">
                    <div class="their">当前：</div>
                    <input type="text" placeholder="url" v-model="detail.demoCurrentUrl">
                </div>
                <div class="content">
                    <div class="their">应用：</div>
                    <input type="text" placeholder="url" v-model="detail.demoElectronUrl">
                </div>
                <div class="content">
                    <div class="their">APP：</div>
                    <input type="text" placeholder="url" v-model="detail.demoAppUrl">
                </div>
            </div>
            <div class="submit">
                <button @click="handleGoBack">返回</button>
                <button @click="handleSubmit">确认</button>
            </div>
            <Dialog ref="dialogRef">
                <img :src="bigImage" />
            </Dialog>
            <Dialog ref="messageRef" class="messageDialog">
                保存成功
            </Dialog>
            <input style="position: absolute;top: 0;left: 0;opacity: 0;pointer-events: none;" ref="uploadRef"
                type="file" :accept="accept" @change="uploadChange">
        </div>
    </div>
</template>
<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
type uploadKeyStr = 'avatar' | 'qqCode' | 'wxCode' | 'demoWxXcxUrl'
type operListType = 'describe' | 'skill' | 'company'

const accept = " .png, .jpg, .jpeg, .PNG, .JPG, .JPEG"
const uploadEl = useTemplateRef<HTMLInputElement>('uploadRef')

const bigImage = ref<string>('')
const dialogRef = ref()
const handleShow = (str: InfoType['avatar'] = '') => {
    bigImage.value = str
    dialogRef.value.open()
}
const uploadKey = ref<uploadKeyStr>()
const handleUpload = (str: uploadKeyStr) => {
    uploadKey.value = str
    uploadEl.value?.click()
}

const detail = ref<InfoFormType>({
    name: '',
    avatar: '',
    qq: '',
    qqName: '',
    qqCode: '',
    wx: '',
    wxName: '',
    wxCode: '',
    phone: '',
    email: '',
    nikeName: '',
    city: '',
    school: {
        schoolName: '',
        schoolStartDay: '',
        schoolEndDay: ''
    },
    experience: '',
    describe: [],
    biographicalNotesUrl: '',
    biographicalNotesPdfDownloadUrl: '',
    biographicalNotesPngDownloadUrl: '',
    biographicalNotesWorkDownloadUrl: '',
    demoElectronUrl: '',
    demoCurrentUrl: '',
    demoWxXcxUrl: '',
    demoAppUrl: '',
    skill: [],
    company: [],
    webName: '',
    webNike: '',
    biographicalNotesName: '',
    biographicalNotesPdfDownloadName: '',
    biographicalNotesPngDownloadName: '',
    biographicalNotesWorkDownloadName: '',
    csdnUrl: '',
    currentUrl: '',
    giteeUrl: '',
    csdnName: '',
    giteeName: '',
    avatarKey: '',
    qqCodeKey: '',
    wxCodeKey: '',
    demoWxXcxUrlKey: '',
    keyCode: '',
})
const uploadChange = async (e: any) => {
    const file = e.target.files?.[0]
    const size = file.size / 1024 / 1024 > 3
    if (size) {
        alert('最大上传3M大小图片')
        e.target.value = ''
        return
    }
    const type = accept.replaceAll(' .', '').split(',').some((n) => file.type.indexOf(n) > -1)
    if (!type) {
        alert(`只能上传${accept}类型文件`)
        e.target.value = ''
        return
    }
    const res = await uploadImage(file)
    if (res) {
        detail.value = {
            ...detail.value,
            [`${uploadKey.value}`]: res.url,
            [`${uploadKey.value}Key`]: res.key
        }
    }
    e.target.value = ''
}
const handleAdd = (str: operListType) => {
    detail.value = {
        ...detail.value,
        [str]: [...detail.value[str], (str === 'describe' ? { value: '' } : { name: '', startTime: '', endTime: '', position: '' })]
    }
}
const handleRemove = (str: operListType, idx: number) => {
    detail.value = {
        ...detail.value,
        [str]: detail.value[str].filter((_n, i) => i !== idx)
    }
}

const handleGoBack = () => {
    navigateTo('/')
}
const messageRef = ref()
const handleSubmit = async () => {
    const query = {
        ...detail.value,
        skill: detail.value?.skill.map((n) => n.value),
        describe: detail.value?.skill.map((n) => n.value)
    }
    const res = await request<InfoType>('/setQfgBlogInfo', query)
    if (res?.code === 0) {
        messageRef.value.show()
        handleGoBack()
    }
}
const { data: blogInfo } = await useAsyncData('blogInfo', () =>
    request<InfoType>('/getQfgBlogInfo')
);
detail.value = {
    ...blogInfo.value?.data as InfoType,
    skill: blogInfo.value?.data?.skill?.map((n) => {
        return { value: n }
    }) || [],
    describe: blogInfo.value?.data?.skill?.map((n) => {
        return { value: n }
    }) || []
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>