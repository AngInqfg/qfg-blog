import { useFetch } from '#app'
const env = import.meta.env
const {
	VITE_NUXT_BASE_NAME, VITE_NUXT_BASE_URL,
	VITE_NUXT_CHAT_NAME, VITE_NUXT_CHAT_AUTH, VITE_NUXT_CHAT_MODEL,
	VITE_NUXT_YDTC_NAME, VITE_NUXT_YDTC_AUTH
} = env
/**
 * 
 * @param url url
 * @param query  参数
 * @param option 其他请求配置
 * @returns 
 */
export const request = async <T>(url: string, query?: any, option?: any) => {
	const isServer = import.meta.server
	const urls = isServer ? VITE_NUXT_BASE_URL + url : VITE_NUXT_BASE_NAME + url;
	
	const res = await useFetch(urls, {
		method: 'POST',
		body: query,
		headers: {
			'Content-Type': 'application/json',
		},
		...option
	});
	if (res?.status.value === 'success') {
		const { code, message, data } = res?.data.value as requestType<T>
		return { code, message, data }
	} else {
		return { code: 9999, data: undefined, message: '未知异常' } as requestType<T>
	}
}
/**
 * 上传图片 https://pngcdn.cn/ 云朵图床
 * @param file 文件
 * @returns 返回 图床图片链接
 */
export const uploadImage = async (file: File): Promise<uploadImageResultType | undefined> => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('api_key', VITE_NUXT_YDTC_AUTH);
	const res: any = await useFetch(VITE_NUXT_YDTC_NAME, {
		method: 'post',
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${VITE_NUXT_YDTC_AUTH}`
		},
		cache: 'no-cache',
		body: formData
	});
	if (res?.status) {
		const val = res?.data.value
		return {
			url: val?.data?.links?.url,
			key: val?.data?.key
		}
	} else {
		return undefined
	}
}
/**
 * chat消息发送
 * @param text 发送文本
 * @param user 用户
 * @param callback 流传输接收回调
 */
export const sendChatMessage = async ({ textList, callback, endChange, requestAsyncChange }: chatParamType) => {
	const controller = new AbortController();
	const signal = controller.signal;
	try {
		const response = await fetch(VITE_NUXT_CHAT_NAME, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${VITE_NUXT_CHAT_AUTH}`,
			},
			body: JSON.stringify({
				model: VITE_NUXT_CHAT_MODEL,
				messages: textList,
				stream: true,
			}),
			signal
		});
		if (requestAsyncChange) {
			requestAsyncChange(controller)
		}
		const reader = response.body?.getReader();
		let stop = false;
		let decoder = new TextDecoder();
		while (!stop) {
			const { done, value } = await reader?.read() || { done: true, value: new Uint8Array() };
			if (done) {
				endChange()
				stop = true;
			} else {
				const data = decoder.decode(value, { stream: true })
				// 处理usage  拆分一次返回了多个data:
				let resultStr = data.split('"usage":')[0];
				const arr = resultStr.split(/data:\s*/).filter(chunk => chunk.length > 0);
				arr.map(chunk => {
					// 处理空格
					let cleanedItem = chunk.trim();
					const idx = cleanedItem.lastIndexOf('],')
					// 处理最后的,]
					if (idx > -1) {
						cleanedItem = cleanedItem.slice(idx, 2)
					}
					// 有值才返回
					if (cleanedItem.indexOf('[DONE]') < 0) {
						const parsedData = JSON.parse(cleanedItem) as chatResultType;
						const text: chatChoicesDeltaType['content'] = (parsedData?.choices?.[0]?.delta?.content ?? '')
						callback(text)
					}
				});
			}
		}
	} catch (error) {
		endChange()
		console.warn('Error:', error);
	}
}