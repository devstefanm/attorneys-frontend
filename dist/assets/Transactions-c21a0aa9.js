import{aB as B,an as m,r as p,j as r,a as C,E as D}from"./index-b06e28a8.js";import{a as F,c as M,m as w,T as $}from"./transformData-a87a07ee.js";import{s as k}from"./setupAxios-0f8339ed.js";const L=({amount:e,case_number:t,excerpt_number:n,payment_date:c,posting_method:l,type:s})=>({amount:e,caseNumber:t,excerptNumber:n,paymentDate:c,postingMethod:l,displayType:B.t(`entities.${s}`),type:s}),V=async e=>{var i;const{sortBy:t="created_at",sort:n="asc",page:c=1,size:l=10}=e;let s;try{s=await k({method:"get",url:"api/transactions-list",params:{...e,sortBy:t===""?"created_at":M(t),sort:n===""?"asc":n,page:c,size:l},withCredentials:!0}),(i=s.data.data)!=null&&i.transactions&&(s.data.data.transactions=s.data.data.transactions.map(d=>L(d)))}catch{s={data:{error:500,message:"Connection problem"}}}return s},v=e=>F(["transactionsList",e],()=>V(e),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),E=(e,t)=>{var n;switch(t.type){case m.sortable:return{...e,sortable:t.payload};case m.pageable:return{...e,pageable:t.payload};case m.searchable:const{key:c,value:l}=t.payload,s=(n=e.searchable)==null?void 0:n.map(i=>i.key===c?{...i,value:l}:i);return e.searchable.some(i=>i.key===c)||s.push({key:c,value:l}),{...e,searchable:s};default:return e}},y={sortable:{sort:"",sortBy:""},pageable:{page:1,size:25,totalNumber:null},searchable:[]},g=p.createContext({state:y,dispatch:()=>null}),P=({children:e})=>{const[t,n]=p.useReducer(E,y);return r.jsx(g.Provider,{value:{state:t,dispatch:n},children:e})},_=()=>p.useContext(g),R=e=>{switch(e){case"payment":return"#93c5fd";case"fee":return"#fde047";case"legal_fee":return"#f97316";default:return"#6b7280"}},o={displayType:"type",amount:"amount",postingMethod:"postingMethod",paymentDate:"paymentDate",caseNumber:"caseNumber",excerptNumber:"excerptNumber"},z=()=>{var b,h;const{t:e}=C(),{state:{sortable:{sort:t,sortBy:n},pageable:{page:c,size:l},searchable:s},dispatch:i}=_();let d={page:c,size:l,sort:t,sortBy:n};const x=s.reduce((a,j)=>{const N=w(j);return{...a,...N}},{}),{data:u,isLoading:T,refetch:f}=v({...d,...x}),S=p.useMemo(()=>[{accessorFn:a=>a.caseNumber,id:o.caseNumber,header:()=>r.jsx("span",{children:e(`entities.${[o.caseNumber]}`)}),cell:a=>a.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:a=>a.excerptNumber,id:o.excerptNumber,header:()=>r.jsx("span",{children:e(`entities.${[o.excerptNumber]}`)}),cell:a=>a.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:a=>a.amount,id:o.amount,header:()=>r.jsx("span",{children:e(`entities.${[o.amount]}`)}),cell:a=>a.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:a=>a.displayType,id:o.displayType,header:()=>r.jsx("span",{children:e(`entities.${[o.displayType]}`)}),cell:a=>a.getValue(),isSortable:!0},{accessorFn:a=>a.postingMethod,id:o.postingMethod,header:()=>r.jsx("span",{children:e(`entities.${[o.postingMethod]}`)}),cell:a=>a.getValue(),isSearchable:!1,isSortable:!0},{accessorFn:a=>a.paymentDate,id:o.paymentDate,header:()=>r.jsx("span",{children:e(`entities.${[o.paymentDate]}`)}),cell:a=>a.getValue(),isSortable:!0}],[]);return T?r.jsx(r.Fragment,{children:"Loading..."}):r.jsx($,{columns:S,data:(b=u==null?void 0:u.data.data)==null?void 0:b.transactions,hasSearch:!0,sort:t,sortBy:n,totalNumber:(h=u==null?void 0:u.data.data)==null?void 0:h.meta.total_number,page:c,size:l,borderKeyword:"type",updateState:i,refetch:f,mapBorderColors:R})},G=e=>r.jsx(D,{children:r.jsx(p.Suspense,{fallback:"Loading....",children:r.jsx(P,{children:r.jsx(z,{})})})});export{G as Transactions};
