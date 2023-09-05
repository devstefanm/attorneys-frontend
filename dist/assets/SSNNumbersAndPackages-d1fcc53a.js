import{a as y,Z as P,r as O,j as e,$ as w,v as p,E as j,a0 as x,x as L,a1 as f,B as k}from"./index-f919451c.js";import{a as D,c as $,m as z,T as V}from"./transformData-0a63b46d.js";import{s as B,T as W}from"./setupAxios-dbc54428.js";import{C as _,G as N,L as E,A as Y,D as I,F as Q,a as q,M as R}from"./AdapterMoment-075cb260.js";import{D as G}from"./DynamicInputs-2baf6532.js";import{u as K,B as A}from"./useMutation-53d3e637.js";const v=({ssn:s,case_count:r})=>({ssn:s,numberOfCases:r}),H=async s=>{var o;const{sortBy:r="created_at",sort:t="desc",page:l=1,size:d=25}=s;let c;try{c=await B({method:"get",url:"api/ssn-list",params:{...s,sortBy:r===""?"created_at":$(r),sort:t===""?"asc":t,page:l,size:d},withCredentials:!0}),(o=c.data.data)!=null&&o.ssn_numbers&&(c.data.data.ssn_numbers=c.data.data.ssn_numbers.map(a=>v(a)))}catch{c={data:{error:500,message:"Connection problem"}}}return c},Z=s=>D(["ssnNumbersList",s],()=>H(s),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),J=()=>"#6b7280",U=({ssnNumber:s})=>({ssn:s}),C={ssn:"ssn",numberOfCases:"numberOfCases"},X=()=>{var g,S;const{t:s}=y(),{state:{sortable:{sort:r,sortBy:t},pageable:{page:l,size:d},searchable:c},dispatch:o}=P();let a={page:l,size:d,sort:r,sortBy:t};const i=c.reduce((m,T)=>{const M=z(T);return{...m,...M}},{}),{data:n,isLoading:h,refetch:u}=Z({...a,...i}),b=O.useMemo(()=>[{accessorFn:m=>m.ssn,id:C.ssn,header:()=>e.jsx("span",{children:s(`entities.${[C.ssn]}`)}),cell:m=>m.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:m=>m.numberOfCases,id:C.numberOfCases,header:()=>e.jsx("span",{children:s(`entities.${[C.numberOfCases]}`)}),cell:m=>m.getValue(),isSortable:!0}],[]);return h?e.jsx(e.Fragment,{children:"Loading..."}):e.jsx(V,{columns:b,data:(g=n==null?void 0:n.data.data)==null?void 0:g.ssn_numbers,hasSearch:!0,sort:r,sortBy:t,totalNumber:(S=n==null?void 0:n.data.data)==null?void 0:S.meta.total_number,page:l,size:d,borderKeyword:"type",updateState:o,refetch:u,mapBorderColors:J})},ee=({case_count:s,package_name:r})=>({numberOfCases:s,packageName:r}),ae=async s=>{var o;const{sortBy:r="created_at",sort:t="desc",page:l=1,size:d=25}=s;let c;try{c=await B({method:"get",url:"api/packages-list",params:{...s,sortBy:r===""?"created_at":$(r),sort:t===""?"asc":t,page:l,size:d},withCredentials:!0}),(o=c.data.data)!=null&&o.packages&&(c.data.data.packages=c.data.data.packages.map(a=>ee(a)))}catch{c={data:{error:500,message:"Connection problem"}}}return c},se=s=>D(["packagesList",s],()=>ae(s),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),te=()=>"#6b7280",re=({packageName:s})=>({package_name:s}),F={packageName:"packageName",numberOfCases:"numberOfCases"},ne=()=>{var g,S;const{t:s}=y(),{state:{sortable:{sort:r,sortBy:t},pageable:{page:l,size:d},searchable:c},dispatch:o}=w();let a={page:l,size:d,sort:r,sortBy:t};const i=c.reduce((m,T)=>{const M=z(T);return{...m,...M}},{}),{data:n,isLoading:h,refetch:u}=se({...a,...i}),b=O.useMemo(()=>[{accessorFn:m=>m.packageName,id:F.packageName,header:()=>e.jsx("span",{children:s(`entities.${[F.packageName]}`)}),cell:m=>m.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:m=>m.numberOfCases,id:F.numberOfCases,header:()=>e.jsx("span",{children:s(`entities.${[F.numberOfCases]}`)}),cell:m=>m.getValue(),isSortable:!0}],[]);return h?e.jsx(e.Fragment,{children:"Loading..."}):e.jsx(V,{columns:b,data:(g=n==null?void 0:n.data.data)==null?void 0:g.packages,hasSearch:!0,sort:r,sortBy:t,totalNumber:(S=n==null?void 0:n.data.data)==null?void 0:S.meta.total_number,page:l,size:d,borderKeyword:"type",updateState:o,refetch:u,mapBorderColors:te})},oe=[{name:"ssnNumber",type:p.input,gridWidth:12,condition:!1}],ce=()=>{const{t:s}=y(),{state:{addSSNNumberForm:r},dispatch:t}=P(),l=(o,a,i)=>(n,h)=>{switch(a){case p.input:const{value:u}=n==null?void 0:n.target;let b=u;i?(b=u.replace(i,""),t({type:x.addSSNNumberForm,payload:{name:o,fieldValue:b}})):t({type:x.addSSNNumberForm,payload:{name:o,fieldValue:b}});break;case p.checkbox:t({type:x.addSSNNumberForm,payload:{name:o,fieldValue:h}});break;case p.datepicker:t({type:x.addSSNNumberForm,payload:{name:o,fieldValue:n}});break;case p.dynamicInputs:t({type:x.addSSNNumberForm,payload:{name:o,fieldValue:n}});break}},d=()=>console.log("Submitted"),c=o=>{const{name:a,type:i,gridClassName:n,formFieldClassName:h,gridWidth:u,size:b,subfieldName:g,format:S}=o;switch(i){case p.checkbox:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(Q,{control:e.jsx(q,{className:h,name:a,size:b??"small",checked:r[a],onChange:l(a,i)}),label:s(`entities.${a}`)})},a);case p.input:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(W,{fullWidth:!0,className:h,size:b??"small",label:s(`entities.${a}`),name:a,value:r[a],onChange:l(a,i,S)})},a);case p.datepicker:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(E,{dateAdapter:Y,children:e.jsx(I,{label:s(`entities.${a}`),value:r[a],className:h,slotProps:{textField:{size:"small",fullWidth:!0},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:l(a,i)})})},a);case p.dynamicInputs:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(G,{label:s(`entities.${a}`),inputProps:{label:s(`entities.${g}`),size:"small",fullWidth:!0},values:r[a],onValuesChange:l(a,i)})},a);default:return""}};return e.jsx(j,{children:e.jsx(_,{children:e.jsx("form",{onSubmit:d,children:e.jsx(N,{container:!0,spacing:2,children:oe.map(o=>c(o))})})})})},le=async s=>{let r;try{r=await B({method:"post",url:"api/ssn",data:s,withCredentials:!0})}catch{r={data:{error:500,message:"Connection problem"}}}return r},ie=(s,r)=>K(t=>le(t),{onSuccess:t=>(r({type:x.resetSSNNumberFormData}),t.data.error||s(),t.data.message),onError:t=>({error:t,message:"Connection problem"})}),de=s=>{const{open:r,onClose:t}=s,{t:l}=y(),d=L(),{state:{addSSNNumberForm:c},dispatch:o}=P(),{mutate:a,isLoading:i,isSuccess:n}=ie(t,o);return n&&d.invalidateQueries({queryKey:["ssnNumbersList"]}),e.jsx(j,{children:e.jsx(R,{open:r,header:l("entities.addNewSSNNumber"),children:e.jsx(ce,{}),onClose:t,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>a(U(c)),isLoading:i,hasCloseIconButton:!0})})},ue=[{name:"packageName",type:p.input,gridWidth:12,condition:!1}],me=()=>{const{t:s}=y(),{state:{addPackageForm:r},dispatch:t}=w(),l=(o,a,i)=>(n,h)=>{switch(a){case p.input:const{value:u}=n==null?void 0:n.target;let b=u;i?(b=u.replace(i,""),t({type:f.addPackageForm,payload:{name:o,fieldValue:b}})):t({type:f.addPackageForm,payload:{name:o,fieldValue:b}});break;case p.checkbox:t({type:f.addPackageForm,payload:{name:o,fieldValue:h}});break;case p.datepicker:t({type:f.addPackageForm,payload:{name:o,fieldValue:n}});break;case p.dynamicInputs:t({type:f.addPackageForm,payload:{name:o,fieldValue:n}});break}},d=()=>console.log("Submitted"),c=o=>{const{name:a,type:i,gridClassName:n,formFieldClassName:h,gridWidth:u,size:b,subfieldName:g,format:S}=o;switch(i){case p.checkbox:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(Q,{control:e.jsx(q,{className:h,name:a,size:b??"small",checked:r[a],onChange:l(a,i)}),label:s(`entities.${a}`)})},a);case p.input:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(W,{fullWidth:!0,className:h,size:b??"small",label:s(`entities.${a}`),name:a,value:r[a],onChange:l(a,i,S)})},a);case p.datepicker:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(E,{dateAdapter:Y,children:e.jsx(I,{label:s(`entities.${a}`),value:r[a],className:h,slotProps:{textField:{size:"small",fullWidth:!0},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:l(a,i)})})},a);case p.dynamicInputs:return e.jsx(N,{className:n,item:!0,xs:u||12,children:e.jsx(G,{label:s(`entities.${a}`),inputProps:{label:s(`entities.${g}`),size:"small",fullWidth:!0},values:r[a],onValuesChange:l(a,i)})},a);default:return""}};return e.jsx(j,{children:e.jsx(_,{children:e.jsx("form",{onSubmit:d,children:e.jsx(N,{container:!0,spacing:2,children:ue.map(o=>c(o))})})})})},pe=async s=>{let r;try{r=await B({method:"post",url:"api/packages",data:s,withCredentials:!0})}catch{r={data:{error:500,message:"Connection problem"}}}return r},be=(s,r)=>K(t=>pe(t),{onSuccess:t=>(r({type:f.resetPackageFormData}),t.data.error||s(),t.data.message),onError:t=>({error:t,message:"Connection problem"})}),he=s=>{const{open:r,onClose:t}=s,{t:l}=y(),d=L(),{state:{addPackageForm:c},dispatch:o}=w(),{mutate:a,isLoading:i,isSuccess:n}=be(t,o);return n&&d.invalidateQueries({queryKey:["packagesList"]}),e.jsx(j,{children:e.jsx(R,{open:r,header:l("entities.addNewPackage"),children:e.jsx(me,{}),onClose:t,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>a(re(c)),isLoading:i,hasCloseIconButton:!0})})},ke=s=>{const{t:r}=y(),{state:{addSSNNumberModalOpen:t},dispatch:l}=P(),{state:{addPackageModalOpen:d},dispatch:c}=w();return e.jsx(j,{children:e.jsxs(O.Suspense,{fallback:"Loading....",children:[e.jsxs(k,{className:"flex flex-col lg:flex-row gap-4",children:[e.jsxs(k,{className:"w-full",children:[e.jsx(k,{className:"my-2 flex justify-end",children:e.jsx(A,{onClick:()=>l({type:x.addSSNNumberModalOpen,payload:!t}),children:r("entities.addNewSSNNumber")})}),e.jsx(X,{})]}),e.jsxs(k,{className:"w-full",children:[e.jsx(k,{className:"my-2 flex justify-end",children:e.jsx(A,{onClick:()=>c({type:f.addPackageModalOpen,payload:!d}),children:r("entities.addNewPackage")})}),e.jsx(ne,{})]})]}),e.jsx(de,{open:t,onClose:()=>l({type:x.addSSNNumberModalOpen,payload:!1})}),e.jsx(he,{open:d,onClose:()=>c({type:f.addPackageModalOpen,payload:!1})})]})})};export{ke as SSNNumbersAndPackages};
