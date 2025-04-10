type schoolType = {
    schoolName: string,
    schoolStartDay: string,
    schoolEndDay: string
}
type descType = string
type skillType = string
type companyType = {
    name: string,
    startTime: string,
    endTime: string,
    position: string
}
interface InfoType {
    name: string,
    avatar: string,
    qq: string,
    qqName: string,
    qqCode: string,
    wx: string,
    wxName: string,
    wxCode: string,
    phone: string,
    email: string,
    nikeName: string,
    city: string,
    school: schoolType,
    experience: string,
    describe: descType[],
    biographicalNotesUrl: string,
    biographicalNotesPdfDownloadUrl: string,
    biographicalNotesPngDownloadUrl: string,
    biographicalNotesWorkDownloadUrl: string,
    demoElectronUrl: string,
    demoCurrentUrl: string,
    demoWxXcxUrl: string,
    demoAppUrl: string,
    skill: skillType[],
    company: companyType[],
    webName: string,
    webNike: string,
    biographicalNotesName: string,
    biographicalNotesPdfDownloadName: string,
    biographicalNotesPngDownloadName: string,
    biographicalNotesWorkDownloadName: string,
    csdnUrl: string,
    currentUrl: string,
    giteeUrl: string,
    csdnName: string,
    giteeName: string,
    avatarKey: string,
    qqCodeKey: string,
    wxCodeKey: string,
    demoWxXcxUrlKey: string,
    keyCode: string
}
interface InfoFormType extends InfoType {
    describe: { value: string }[],
    skill: { value: string }[],
}
interface listType {
    createTime: string,
    content: string,
    imageList: { [key: string]: string }
}