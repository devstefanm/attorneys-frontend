import{e as d,j as c,F as j,H as P,J as $}from"./index-21362e13.js";import{a as w,c as L,E as p,m as T,T as B}from"./transformData-c9a6da6d.js";import{a as E}from"./setupAxios-8a7a2a3c.js";const R=({debtor_count:e,executor_count:t,lawyer_count:r,city:n})=>({numberOfDebtors:e,numberOfExecutors:t,numberOfLawyers:r,city:n}),_=async e=>{var o;const{sortBy:t="created_at",sort:r="asc",page:n=1,size:u=10}=e;let a;try{a=await E({method:"get",url:"api/cities-list",params:{...e,sortBy:t===""?"created_at":L(t),sort:r===""?"asc":r,page:n,size:u},withCredentials:!0}),(o=a.data.data)!=null&&o.cities&&(a.data.data.cities=a.data.data.cities.map(l=>R(l)))}catch{a={data:{error:500,message:"Connection problem"}}}return a},z=e=>w(["citiesList",e],()=>_(e),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),V=(e,t)=>{var r;switch(t.type){case p.sortable:return{...e,sortable:t.payload};case p.pageable:return{...e,pageable:t.payload};case p.searchable:const{key:n,value:u}=t.payload,a=(r=e.searchable)==null?void 0:r.map(o=>o.key===n?{...o,value:u}:o);return e.searchable.some(o=>o.key===n)||a.push({key:n,value:u}),{...e,searchable:a};default:return e}},F={sortable:{sort:"",sortBy:""},pageable:{page:1,size:25,totalNumber:null},searchable:[]},k=d.createContext({state:F,dispatch:()=>null}),A=({children:e})=>{const[t,r]=d.useReducer(V,F);return c.jsx(k.Provider,{value:{state:t,dispatch:r},children:e})},N=()=>d.useContext(k),M=()=>"#6b7280",b={city:"city",numberOfDebtors:"numberOfDebtors",numberOfExecutors:"numberOfExecutors",numberOfLawyers:"numberOfLawyers"},Q=()=>{var m,h;const{t:e}=j(),{state:{sortable:{sort:t,sortBy:r},pageable:{page:n,size:u},searchable:a},dispatch:o}=N();let l={page:n,size:u,sort:t,sortBy:r};const y=a.reduce((s,O)=>{const S=T(O);return{...s,...S}},{}),{data:i,isLoading:x,refetch:C}=z({...l,...y}),g=d.useMemo(()=>[{accessorFn:s=>s.city,id:b.city,header:()=>c.jsx("span",{children:e(`entities.${[b.city]}`)}),cell:s=>s.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:s=>s.numberOfDebtors,id:b.numberOfDebtors,header:()=>c.jsx("span",{children:e(`entities.${[b.numberOfDebtors]}`)}),cell:s=>s.getValue(),isSortable:!0},{accessorFn:s=>s.numberOfExecutors,id:b.numberOfExecutors,header:()=>c.jsx("span",{children:e(`entities.${[b.numberOfExecutors]}`)}),cell:s=>s.getValue(),isSortable:!0},{accessorFn:s=>s.numberOfLawyers,id:b.numberOfLawyers,header:()=>c.jsx("span",{children:e(`entities.${[b.numberOfLawyers]}`)}),cell:s=>s.getValue(),isSortable:!0}],[]);return x?c.jsx(c.Fragment,{children:"Loading..."}):c.jsx(B,{columns:g,data:(m=i==null?void 0:i.data.data)==null?void 0:m.cities,hasSearch:!0,sort:t,sortBy:r,totalNumber:(h=i==null?void 0:i.data.data)==null?void 0:h.meta.total_number,page:n,size:u,borderKeyword:"type",updateState:o,refetch:C,mapBorderColors:M})},H=(e,t)=>{var r;switch(t.type){case p.sortable:return{...e,sortable:t.payload};case p.pageable:return{...e,pageable:t.payload};case p.searchable:const{key:n,value:u}=t.payload,a=(r=e.searchable)==null?void 0:r.map(o=>o.key===n?{...o,value:u}:o);return e.searchable.some(o=>o.key===n)||a.push({key:n,value:u}),{...e,searchable:a};default:return e}},v={sortable:{sort:"",sortBy:""},pageable:{page:1,size:25,totalNumber:null},searchable:[]},D=d.createContext({state:v,dispatch:()=>null}),G=({children:e})=>{const[t,r]=d.useReducer(H,v);return c.jsx(D.Provider,{value:{state:t,dispatch:r},children:e})},K=()=>d.useContext(D),W=({case_count:e,court:t})=>({numberOfCases:e,court:t}),J=async e=>{var o;const{sortBy:t="created_at",sort:r="asc",page:n=1,size:u=10}=e;let a;try{a=await E({method:"get",url:"api/courts-list",params:{...e,sortBy:t===""?"created_at":L(t),sort:r===""?"asc":r,page:n,size:u},withCredentials:!0}),(o=a.data.data)!=null&&o.courts&&(a.data.data.courts=a.data.data.courts.map(l=>W(l)))}catch{a={data:{error:500,message:"Connection problem"}}}return a},q=e=>w(["courtsList",e],()=>J(e),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),I=()=>"#6b7280",f={court:"court",numberOfCases:"numberOfCases"},U=()=>{var m,h;const{t:e}=j(),{state:{sortable:{sort:t,sortBy:r},pageable:{page:n,size:u},searchable:a},dispatch:o}=K();let l={page:n,size:u,sort:t,sortBy:r};const y=a.reduce((s,O)=>{const S=T(O);return{...s,...S}},{}),{data:i,isLoading:x,refetch:C}=q({...l,...y}),g=d.useMemo(()=>[{accessorFn:s=>s.court,id:f.court,header:()=>c.jsx("span",{children:e(`entities.${[f.court]}`)}),cell:s=>s.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:s=>s.numberOfCases,id:f.numberOfCases,header:()=>c.jsx("span",{children:e(`entities.${[f.numberOfCases]}`)}),cell:s=>s.getValue(),isSortable:!0}],[]);return x?c.jsx(c.Fragment,{children:"Loading..."}):c.jsx(B,{columns:g,data:(m=i==null?void 0:i.data.data)==null?void 0:m.courts,hasSearch:!0,sort:t,sortBy:r,totalNumber:(h=i==null?void 0:i.data.data)==null?void 0:h.meta.total_number,page:n,size:u,borderKeyword:"type",updateState:o,refetch:C,mapBorderColors:I})},ee=e=>c.jsx(P,{children:c.jsx(d.Suspense,{fallback:"Loading....",children:c.jsxs($,{className:"flex flex-col lg:flex-row gap-4",children:[c.jsx(G,{children:c.jsx(U,{})}),c.jsx(A,{children:c.jsx(Q,{})})]})})});export{ee as CourtsAndCities};
