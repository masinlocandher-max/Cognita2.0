import { createContext, useContext, useEffect, useState } from 'react'
import { STORE_KEY, initialState, normalizeState } from './state'
const Context=createContext(null)
export function WorkspaceProvider({children}){
 const [state,setState]=useState(initialState);const [loaded,setLoaded]=useState(false);const [status,setStatus]=useState('Loading local workspace…')
 useEffect(()=>{try{const raw=localStorage.getItem(STORE_KEY);setState(raw?normalizeState(JSON.parse(raw)):initialState())}catch{setStatus('Stored work could not be read. Export new work before leaving.')}setLoaded(true)},[])
 useEffect(()=>{if(!loaded)return;try{localStorage.setItem(STORE_KEY,JSON.stringify(state));setStatus('Saved in this browser. No cloud sync.')}catch{setStatus('Unable to save locally. Export your work before leaving.')}},[state,loaded])
 return <Context.Provider value={{state,setState,status}}>{children}</Context.Provider>
}
export function useWorkspace(){const c=useContext(Context);if(!c)throw Error('WorkspaceProvider required');return c}
export function downloadFile(text,name,type='text/plain'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
