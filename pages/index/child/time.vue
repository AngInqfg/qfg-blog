<template>
    <div class="home_user_time">
        <div class="home_user_time_line"></div>
        <div class="home_user_time_zhong">
            <div class="circle"></div>
            <div v-show="dateVal?.h" class="once" ref="hLineRef"></div>
            <div v-show="dateVal?.m" class="two" ref="mLineRef"></div>
            <div v-show="dateVal?.s" class="therr" ref="sLineRef"></div>
            <div class="text" v-show="dateVal?.h">
                <span>{{ dateVal?.h || '00' }}</span>
                <span>{{ dateVal?.m || '00' }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Dayjs from 'dayjs'
import { ref, useTemplateRef } from 'vue';
const hLineEl = useTemplateRef<HTMLDivElement>('hLineRef')
const mLineEl = useTemplateRef<HTMLDivElement>('mLineRef')
const sLineEl = useTemplateRef<HTMLDivElement>('sLineRef')
const dateVal = ref<Record<'h' | 'm' | 's', string>>()

const timeAnimate = () => {
    const now = new Date();
    const h = Dayjs(now).format('HH')
    const m = Dayjs(now).format('mm')
    const s = Dayjs(now).format('ss')
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const milliseconds = now.getMilliseconds();
    const secondDeg = (seconds + milliseconds / 1000) * 6;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const hourDeg = (hours % 12 + minutes / 60) * 30;
    if (hLineEl.value && mLineEl.value && sLineEl.value) {
        hLineEl.value.style.transform = `rotate(${hourDeg}deg)`
        mLineEl.value.style.transform = `rotate(${minuteDeg}deg)`
        sLineEl.value.style.transform = `rotate(${secondDeg}deg)`
    }
    requestAnimationFrame(timeAnimate)
    dateVal.value = { h, m, s }
}
if (import.meta.client) {
    requestAnimationFrame(timeAnimate)
}
</script>