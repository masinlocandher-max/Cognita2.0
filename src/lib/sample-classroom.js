export const SAMPLE_KEY = 'cognita-public-sample-v1'
export const emptySample = () => ({read:false, checked:false, draft:''})
export function normalizeSample(value) {return {read:value?.read===true, checked:value?.checked===true, draft:typeof value?.draft==='string'?value.draft.slice(0,12000):''}}
export function completedSteps(state){return Number(state.read)+Number(state.checked)+Number(state.draft.trim().length>=40)}
export function exportDraft(state){return `COGNITA SAMPLE WORKSPACE\nPractice only. Not submitted or assessed.\n\n${state.draft || '(No draft yet)'}\n`}
