import {createServer} from 'vite'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {MemoryRouter,createRoutesFromElements,matchRoutes} from 'react-router-dom'
import fs from 'node:fs'
const server=await createServer({server:{middlewareMode:true},appType:'custom'})
try{
 const {AppRoutes}=await server.ssrLoadModule('/src/AppRoutes.jsx')
 const tree=AppRoutes();const routes=createRoutesFromElements(tree.props.children.props.children)
 const flatten=rs=>rs.flatMap(r=>[...(r.path&&r.path!=='*'&&r.path!=='/app'?[r.path]:[]),...flatten(r.children||[])])
 const paths=flatten(routes);if(new Set(paths).size!==paths.length)throw Error('Duplicate route paths')
 const errors=[],links=new Set();let rendered=0
 for(const pattern of paths){const path=pattern.replace(/:module/g,'understand').replace(/:lesson/g,'1').replace(/:program/g,'applied-ai').replace(/:id/g,pattern.startsWith('/projects')?'understand':'sample-a').replace(/:view/g,'workspace').replace(/:action/g,'result').replace(/:number/g,'1').replace(/:lab/g,'verification').replace(/:slug/g,'verification').replace(/:session/g,'sample').replace(/:thread/g,'sample');try{const html=renderToString(React.createElement(MemoryRouter,{initialEntries:[path]},React.createElement(AppRoutes)));if(html.includes('Let’s get you back'))throw Error('Unexpected not-found');for(const match of html.matchAll(/href="(\/[^"#]*)"/g))links.add(match[1].replaceAll('&amp;','&'));rendered++}catch(e){errors.push(path+': '+e.message)}}
 for(const link of links){if(link.startsWith('/brand/')){if(!fs.existsSync('.'+link))errors.push('Missing source asset '+link)}else if(link.startsWith('/resources/')||link.startsWith('/images/')){if(!fs.existsSync('public'+link))errors.push('Missing asset '+link)}else{const matched=matchRoutes(routes,link);if(!matched||matched.at(-1).route.path==='*')errors.push('Unmatched link '+link)}}
 if(errors.length)throw Error(errors.join('\n'))
 console.log(`Rendered ${rendered} route patterns; checked ${links.size} internal links/assets. No duplicate routes or unmatched rendered links.`)
 fs.writeFileSync('docs/FRONTEND-ROUTES.json',JSON.stringify({routes:paths,renderedPatterns:rendered,checkedLinks:links.size,note:'Server render and link coverage only. Not browser interaction or visual testing.'},null,2)+'\n')
}finally{await server.close()}
