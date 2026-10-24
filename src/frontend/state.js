export const STORE_KEY = 'cognita-frontend-workspace-v1'
export const initialState = () => ({version:1, notes:[], bookmarks:[], lessons:{}, projects:{}, goal:'', hours:'3', days:[], application:{}, reviews:{}, content:{}})
const unitIds=['understand','brief','instructions','verification','workflow','communication','transfer','project']
const str=v=>typeof v==='string'?v.slice(0,20000):''
const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{}
const fields=(v,keys)=>Object.fromEntries(keys.filter(k=>typeof v?.[k]==='string').map(k=>[k,str(v[k])]))
export function revisionSnapshot(project){return {brief:str(project?.brief),draft:str(project?.draft),sources:str(project?.sources),reflection:str(project?.reflection)}}
export function normalizeState(input){
 const base=initialState();if(!input||input.version!==1)return base
 const lessons={},projects={};for(const id of unitIds){if(obj(input.lessons)[id])lessons[id]={checked:input.lessons[id]?.checked===true,reflection:str(input.lessons[id]?.reflection)};if(obj(input.projects)[id]){const p=obj(input.projects[id]);projects[id]={...revisionSnapshot(p),revisions:Array.isArray(p.revisions)?p.revisions.slice(-10).map(revisionSnapshot):[]}}}
 const reviews={};for(const id of ['sample-a']){const r=obj(obj(input.reviews)[id]);if(Object.keys(r).length){reviews[id]=fields(r,['strength','gap','revision']);for(let i=0;i<4;i++){if(['0','1','2','3'].includes(r['score'+i]))reviews[id]['score'+i]=r['score'+i]}}}
 return {...base,notes:Array.isArray(input.notes)?input.notes.slice(0,100).filter(n=>typeof n?.id==='string'&&typeof n?.text==='string').map(n=>({id:n.id.slice(0,100),text:str(n.text)})):[],bookmarks:Array.isArray(input.bookmarks)?[...new Set(input.bookmarks.filter(v=>unitIds.includes(v)))]:[],lessons,projects,goal:str(input.goal),hours:['1','3','5','8'].includes(input.hours)?input.hours:'3',days:Array.isArray(input.days)?[...new Set(input.days.filter(d=>['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].includes(d)))]:[],application:fields(obj(input.application),['alias','contact','background','goals','availability','support','interest']),reviews,content:fields(obj(input.content),['mission','vision','homepage','program','faq','article','event'])}
}
export function practiceCount(state){return unitIds.filter(id=>state.lessons[id]?.checked===true).length}
export function projectReady(project){return ['brief','draft','sources','reflection'].every(k=>typeof project?.[k]==='string'&&project[k].trim().length>=20)}
