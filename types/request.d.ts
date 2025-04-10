type requestCode = number
type requestMessage = string
interface requestType<T> {
	code: requestCode,
	message: requestMessage,
	data: T
}
interface uploadImageResultType {
	url: string,
	key: string
}
interface chatParamType {
	textList: chatChoicesDeltaType[],
	callback: (result: chatChoicesDeltaType['content']) => void,
	endChange: Function,
	requestAsyncChange?: (result: any) => void
}
type roleType = "assistant" | "user" | "system" | "tool"
type chatChoicesDeltaType = {
	content: string,
	role: roleType,
	createTime?: number
}
interface chatChoicesType {
	delta: chatChoicesDeltaType,
	index: number
}
interface chatResultType {
	code: number,
	created: number,
	id: string,
	message: string,
	sid: string,
	choices: chatChoicesType[]
}