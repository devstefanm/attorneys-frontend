import{G as d,r as p,j as l,a as j,E as R,B as _}from"./index-f919451c.js";import{a as T,c as O,m as B,T as w}from"./transformData-0a63b46d.js";import{s as L}from"./setupAxios-dbc54428.js";const z=({case_count:e,client:s})=>({numberOfCases:e,client:s}),$=async e=>{var r;const{sortBy:s="created_at",sort:a="desc",page:n=1,size:c=25}=e;let t;try{t=await L({method:"get",url:"api/clients-list",params:{...e,sortBy:s===""?"created_at":O(s),sort:a===""?"asc":a,page:n,size:c},withCredentials:!0}),(r=t.data.data)!=null&&r.clients&&(t.data.data.clients=t.data.data.clients.map(u=>z(u)))}catch{t={data:{error:500,message:"Connection problem"}}}return t},A=e=>T(["clientsList",e],()=>$(e),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),N=(e,s)=>{var a;switch(s.type){case d.sortable:return{...e,sortable:s.payload};case d.pageable:return{...e,pageable:s.payload};case d.searchable:const{key:n,value:c}=s.payload,t=(a=e.searchable)==null?void 0:a.map(r=>r.key===n?{...r,value:c}:r);return e.searchable.some(r=>r.key===n)||t.push({key:n,value:c}),{...e,searchable:t};default:return e}},k={sortable:{sort:"",sortBy:""},pageable:{page:1,size:25,totalNumber:null},searchable:[]},v=p.createContext({state:k,dispatch:()=>null}),D=({children:e})=>{const[s,a]=p.useReducer(N,k);return l.jsx(v.Provider,{value:{state:s,dispatch:a},children:e})},M=()=>p.useContext(v),Q=()=>"#6b7280",y={client:"client",numberOfCases:"numberOfCases"},V=()=>{var m,b;const{t:e}=j(),{state:{sortable:{sort:s,sortBy:a},pageable:{page:n,size:c},searchable:t},dispatch:r}=M();let u={page:n,size:c,sort:s,sortBy:a};const f=t.reduce((o,S)=>{const E=B(S);return{...o,...E}},{}),{data:i,isLoading:g,refetch:x}=A({...u,...f}),C=p.useMemo(()=>[{accessorFn:o=>o.client,id:y.client,header:()=>l.jsx("span",{children:e(`entities.${[y.client]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.numberOfCases,id:y.numberOfCases,header:()=>l.jsx("span",{children:e(`entities.${[y.numberOfCases]}`)}),cell:o=>o.getValue(),isSortable:!0}],[]);return g?l.jsx(l.Fragment,{children:"Loading..."}):l.jsx(w,{columns:C,data:(m=i==null?void 0:i.data.data)==null?void 0:m.clients,hasSearch:!0,sort:s,sortBy:a,totalNumber:(b=i==null?void 0:i.data.data)==null?void 0:b.meta.total_number,page:n,size:c,borderKeyword:"type",updateState:r,refetch:x,mapBorderColors:Q})},G=(e,s)=>{var a;switch(s.type){case d.sortable:return{...e,sortable:s.payload};case d.pageable:return{...e,pageable:s.payload};case d.searchable:const{key:n,value:c}=s.payload,t=(a=e.searchable)==null?void 0:a.map(r=>r.key===n?{...r,value:c}:r);return e.searchable.some(r=>r.key===n)||t.push({key:n,value:c}),{...e,searchable:t};default:return e}},P={sortable:{sort:"",sortBy:""},pageable:{page:1,size:25,totalNumber:null},searchable:[]},F=p.createContext({state:P,dispatch:()=>null}),H=({children:e})=>{const[s,a]=p.useReducer(G,P);return l.jsx(F.Provider,{value:{state:s,dispatch:a},children:e})},K=()=>p.useContext(F),W=({employees_count:e,employer:s})=>({numberOfEmployees:e,employer:s}),q=async e=>{var r;const{sortBy:s="created_at",sort:a="desc",page:n=1,size:c=25}=e;let t;try{t=await L({method:"get",url:"api/employers-list",params:{...e,sortBy:s===""?"created_at":O(s),sort:a===""?"asc":a,page:n,size:c},withCredentials:!0}),(r=t.data.data)!=null&&r.employers&&(t.data.data.employers=t.data.data.employers.map(u=>W(u)))}catch{t={data:{error:500,message:"Connection problem"}}}return t},I=e=>T(["employersList",e],()=>q(e),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),J=()=>"#6b7280",h={employer:"employer",numberOfEmployees:"numberOfEmployees"},U=()=>{var m,b;const{t:e}=j(),{state:{sortable:{sort:s,sortBy:a},pageable:{page:n,size:c},searchable:t},dispatch:r}=K();let u={page:n,size:c,sort:s,sortBy:a};const f=t.reduce((o,S)=>{const E=B(S);return{...o,...E}},{}),{data:i,isLoading:g,refetch:x}=I({...u,...f}),C=p.useMemo(()=>[{accessorFn:o=>o.employer,id:h.employer,header:()=>l.jsx("span",{children:e(`entities.${[h.employer]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.numberOfEmployees,id:h.numberOfEmployees,header:()=>l.jsx("span",{children:e(`entities.${[h.numberOfEmployees]}`)}),cell:o=>o.getValue(),isSortable:!0}],[]);return g?l.jsx(l.Fragment,{children:"Loading..."}):l.jsx(w,{columns:C,data:(m=i==null?void 0:i.data.data)==null?void 0:m.employers,hasSearch:!0,sort:s,sortBy:a,totalNumber:(b=i==null?void 0:i.data.data)==null?void 0:b.meta.total_number,page:n,size:c,borderKeyword:"type",updateState:r,refetch:x,mapBorderColors:J})},ee=e=>l.jsx(R,{children:l.jsx(p.Suspense,{fallback:"Loading....",children:l.jsxs(_,{className:"flex flex-col lg:flex-row gap-4",children:[l.jsx(D,{children:l.jsx(V,{})}),l.jsx(H,{children:l.jsx(U,{})})]})})});export{ee as ClientsAndEmployers};
