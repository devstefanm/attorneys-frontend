import{a as A,O as T,r as M,j as a,B as W,P as c,y,c as $,z,F as ue,J as de}from"./index-0fc86f99.js";import{u as Y,a as G,c as pe,m as me,T as xe,C as K,G as N,D as H,L as J,b as U,e as X,d as Z,F as ee,f as te,M as ae,g as ye}from"./ConfirmationDialog-9583af2c.js";import{s as L,T as v,u as q,a as w,B as he}from"./SnackbarNotification-fe22749b.js";import{C as se}from"./CircularProgress-9f706af9.js";import{u as oe}from"./useGetCitiesNamesQuery-5d3f83ca.js";import{A as re}from"./Autocomplete-98c931ae.js";const fe=({id:t,case_count:s,city:l,display_phone_numbers:o,first_name:e,last_name:r,phone_numbers:u,email:p})=>({id:t,numberOfCases:s,city:l,email:p,displayPhoneNumbers:o,name:`${Y(e)} ${Y(r)}`,phoneNumbers:u}),Ee=async t=>{var u;const{sortBy:s="created_at",sort:l="desc",page:o=1,size:e=25}=t;let r;try{r=await L({method:"get",url:"api/executors-list",params:{...t,sortBy:s===""?"created_at":pe(s),sort:l===""?"asc":l,page:o,size:e},withCredentials:!0}),(u=r.data.data)!=null&&u.executors&&(r.data.data.executors=r.data.data.executors.map(p=>fe(p)))}catch{r={data:{error:500,message:"Connection problem"}}}return r},be=t=>G(["executorsList",t],()=>Ee(t),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),ge=()=>"#6b7280",V=t=>{const{id:s,first_name:l,last_name:o,city:e,email:r,name:u}=t;let p="";return u&&(p=u),l&&(p=`${l} ${o??""}`),e&&(p=e),r&&(p=r),{id:s,name:p}},je=({city:t,email:s,firstName:l,lastName:o,phoneNumbers:e})=>{let r=null;typeof t!="string"&&(r=t.id);const u=e.filter(p=>p.length>5);return{city_id:r,email:s,first_name:l,last_name:o,phone_numbers:u}},Ce=({city:t,email:s,first_name:l,last_name:o,phone_numbers:e})=>({city:t!=null&&t.id?{id:t.id,name:t.name}:"",email:s||"",firstName:l,lastName:o,phoneNumbers:e&&e.length>0?e:[""]}),Ne=({city:t,email:s,firstName:l,lastName:o,phoneNumbers:e})=>{const r={};return t!==void 0&&(typeof t!="string"?r.city_id=t.id||null:t===""&&(r.city_id=null)),s!==void 0&&(r.email=s||null),l!==void 0&&(r.first_name=l||null),o!==void 0&&(r.last_name=o||null),e!==void 0&&(e.length>0?r.phone_numbers=e==null?void 0:e.filter(u=>u.length>5):r.phone_numbers=[""]),r},F={name:"name",email:"email",city:"city",displayPhoneNumbers:"displayPhoneNumbers",phoneNumbers:"phoneNumbers",numberOfCases:"numberOfCases"},Se=()=>{var E,x;const{t}=A(),{state:{sortable:{sort:s,sortBy:l},pageable:{page:o,size:e},searchable:r},dispatch:u}=T();let p={page:o,size:e,sort:s,sortBy:l};const h=r.reduce((d,b)=>{const g=me(b);return{...d,...g}},{}),{data:n,isLoading:j,refetch:f}=be({...p,...h}),m=d=>{const{id:b}=d.original;b&&(u({type:c.editExecutorId,payload:b}),u({type:c.editExecutorModalOpen,payload:!0}))},i=M.useMemo(()=>[{accessorFn:d=>d.name,id:F.name,header:()=>a.jsx("span",{children:t(`entities.${[F.name]}`)}),cell:d=>d.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:d=>d.email,id:F.email,header:()=>a.jsx("span",{children:t(`entities.${[F.email]}`)}),cell:d=>d.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:d=>d.displayPhoneNumbers,id:F.displayPhoneNumbers,header:()=>a.jsx("span",{children:t(`entities.${[F.phoneNumbers]}`)}),cell:d=>d.getValue(),isSortable:!0},{accessorFn:d=>d.city,id:F.city,header:()=>a.jsx("span",{children:t(`entities.${[F.city]}`)}),cell:d=>d.getValue(),isSortable:!0},{accessorFn:d=>d.numberOfCases,id:F.numberOfCases,header:()=>a.jsx("span",{children:t(`entities.${[F.numberOfCases]}`)}),cell:d=>d.getValue(),isSortable:!0}],[]);return j?a.jsx(W,{className:"flex justify-center items-center h-[80vh]",children:a.jsx(se,{})}):a.jsx(xe,{columns:i,data:(E=n==null?void 0:n.data.data)==null?void 0:E.executors,hasSearch:!0,sort:s,sortBy:l,totalNumber:(x=n==null?void 0:n.data.data)==null?void 0:x.meta.total_number,page:o,size:e,borderKeyword:"type",updateState:u,refetch:f,mapBorderColors:ge,onRowClick:m})},ne=({citiesOptions:t})=>[{name:"firstName",required:!0,type:y.input,gridWidth:6,condition:!1},{name:"lastName",required:!0,type:y.input,gridWidth:6,condition:!1},{name:"email",type:y.input,gridWidth:6},{name:"city",type:y.autocomplete,gridWidth:6,options:t},{name:"phoneNumbers",subfieldName:"phoneNumber",type:y.dynamicInputs,gridWidth:12}],Fe=()=>{const{t}=A(),{state:{addExecutorForm:s,addExecutorAutocompleteValues:l},dispatch:o}=T(),{data:e}=oe({search:l.city}),r=(h,n,j)=>(f,m)=>{switch(n){case y.input:const{value:i}=f==null?void 0:f.target;let E=i;j?E.match(j)&&o({type:c.addExecutorForm,payload:{name:h,fieldValue:E}}):o({type:c.addExecutorForm,payload:{name:h,fieldValue:E}});break;case y.checkbox:o({type:c.addExecutorForm,payload:{name:h,fieldValue:m}});break;case y.datepicker:o({type:c.addExecutorForm,payload:{name:h,fieldValue:f}});break;case y.dynamicInputs:o({type:c.addExecutorForm,payload:{name:h,fieldValue:f}});break;case y.autocomplete:o({type:c.addExecutorForm,payload:{name:h,fieldValue:m?V(m):""}});break;case y.dynamicAutocompletes:o({type:c.addExecutorForm,payload:{name:h,fieldValue:f.map(x=>V(x))}});break}},u=()=>console.log("Submitted"),p=h=>{const{name:n,type:j,gridClassName:f,formFieldClassName:m,gridWidth:i,options:E,size:x,subfieldName:d,format:b,required:g}=h;switch(j){case y.checkbox:return a.jsx(N,{className:f,item:!0,xs:i||12,children:a.jsx(ee,{required:g,control:a.jsx(te,{className:m,name:n,size:x??"small",checked:s[n],onChange:r(n,j)}),label:t(`entities.${n}`)})},n);case y.input:return a.jsx(N,{className:f,item:!0,xs:i||12,children:a.jsx(v,{required:g,fullWidth:!0,className:m,size:x??"small",label:t(`entities.${n}`),name:n,value:s[n],onChange:r(n,j,b)})},n);case y.autocomplete:return a.jsx(N,{className:f,item:!0,xs:i||12,children:a.jsx(re,{fullWidth:!0,clearIcon:!1,className:m,options:E??[],getOptionLabel:C=>V(C).name,size:x??"small",value:s[n],onChange:r(n,j),renderInput:C=>a.jsx(v,{...C,required:g,label:t(`entities.${n}`),onBlur:()=>o({type:c.addExecutorAutocompleteValues,payload:{inputName:n,inputValue:""}}),onChange:Z(k=>o({type:c.addExecutorAutocompleteValues,payload:{inputName:n,inputValue:k.target.value}}),300)})})},n);case y.datepicker:return a.jsx(N,{className:f,item:!0,xs:i||12,children:a.jsx(J,{dateAdapter:U,children:a.jsx(X,{localeText:{clearButtonLabel:t("clear")},label:t(`entities.${n}`),value:s[n],className:m,slotProps:{textField:{size:"small",fullWidth:!0,required:g},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:r(n,j)})})},n);case y.dynamicInputs:return a.jsx(N,{className:f,item:!0,xs:i||12,children:a.jsx(H,{limit:n==="phoneNumbers"?4:2,label:t(`entities.${n}`),inputProps:{label:t(`entities.${d}`),size:"small",fullWidth:!0},values:s[n],onValuesChange:r(n,j)})},n);default:return""}};return a.jsx($,{children:a.jsx(K,{children:a.jsx("form",{onSubmit:u,children:a.jsx(N,{container:!0,spacing:2,children:ne({citiesOptions:e}).map(h=>p(h))})})})})},ke=async t=>{let s;return s=await L({method:"post",url:"api/executors",data:t,withCredentials:!0}),s},Oe=(t,s)=>{const l=z();return q(o=>ke(o),{onSuccess:o=>(o.data.error||(s({type:c.resetExecutorFormData}),s({type:c.openSuccessSnackbar,payload:!0}),t(),l.invalidateQueries({queryKey:["executorsList"]})),o.data.message),onError:o=>{var e,r;return console.error(o),s({type:c.openErrorSnackbar,payload:!0}),{error:o,message:((r=(e=o==null?void 0:o.response)==null?void 0:e.data)==null?void 0:r.message)||"Error has occured"}}})},Ve=t=>{var b,g,C,k;const{open:s,onClose:l}=t,{t:o}=A(),{state:{addExecutorForm:e,openSuccessSnackbar:r,openErrorSnackbar:u,addExecutorModalOpen:p,editExecutorModalOpen:h},dispatch:n}=T(),{mutate:j,isLoading:f,data:m,error:i,isSuccess:E,isError:x,reset:d}=Oe(l,n);return M.useEffect(()=>{(p||h)&&E&&d()},[p,h]),a.jsxs($,{children:[a.jsx(ae,{open:s,header:o("entities.addNewExecutor"),children:a.jsx(Fe,{}),onClose:l,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>j(je(e)),isLoading:f,hasCloseIconButton:!0}),E&&(m!=null&&m.data.message)?a.jsx(w,{open:r,onClose:()=>n({type:c.openSuccessSnackbar,payload:!1}),severity:"success",content:m==null?void 0:m.data.message}):"",x&&((g=(b=i==null?void 0:i.response)==null?void 0:b.data)!=null&&g.message)?a.jsx(w,{open:u,onClose:()=>n({type:c.openErrorSnackbar,payload:!1}),severity:"error",content:(k=(C=i==null?void 0:i.response)==null?void 0:C.data)==null?void 0:k.message}):""]})},Me=async(t,s)=>{let l;return l=await L({method:"patch",url:`api/executor/${t}`,data:s,withCredentials:!0}),l},Ae=(t,s,l)=>{const o=z();return q(e=>Me(l,e),{onSuccess:e=>(e.data.error||(s({type:c.resetExecutorFormData}),s({type:c.openSuccessSnackbar,payload:!0}),t(),o.invalidateQueries({queryKey:["executorsList"]}),o.invalidateQueries({queryKey:["executor"]})),e.data.message),onError:e=>{var r,u,p,h;return console.error(e),(u=(r=e==null?void 0:e.response)==null?void 0:r.data)!=null&&u.message&&s({type:c.openErrorSnackbar,payload:!0}),{error:e,message:((h=(p=e==null?void 0:e.response)==null?void 0:p.data)==null?void 0:h.message)||"Error has occured"}}})},Te=async t=>{let s;if(t){try{s=await L({method:"get",url:`api/executor/${t}`,withCredentials:!0})}catch{s={data:{error:500,message:"errors.serverError"}}}return s}return{data:{error:400,message:"errors.notFound"}}},Be=t=>G(["executor",t],()=>Te(t),{keepPreviousData:!1,refetchOnMount:!0,refetchOnWindowFocus:!1,select(s){if(s.data.data)return Ce(s.data.data)}}),we=()=>{const{t}=A(),{state:{editExecutorForm:s,editExecutorId:l,editExecutorAutocompleteValues:o},dispatch:e}=T(),{data:r}=oe({search:o.city}),{data:u,isLoading:p,isSuccess:h}=Be(l);M.useEffect(()=>{h&&(u!=null&&u.firstName)&&e({type:c.setExecutorFormData,payload:u})},[u==null?void 0:u.firstName]);const n=(m,i,E)=>(x,d)=>{switch(i){case y.input:const{value:b}=x==null?void 0:x.target;let g=b;E?g.match(E)&&e({type:c.editExecutorForm,payload:{editName:m,fieldEditValue:g}}):e({type:c.editExecutorForm,payload:{editName:m,fieldEditValue:g}});break;case y.checkbox:e({type:c.editExecutorForm,payload:{editName:m,fieldEditValue:d}});break;case y.datepicker:e({type:c.editExecutorForm,payload:{editName:m,fieldEditValue:x}});break;case y.dynamicInputs:e({type:c.editExecutorForm,payload:{editName:m,fieldEditValue:x}});break;case y.autocomplete:e({type:c.editExecutorForm,payload:{editName:m,fieldEditValue:d?V(d):""}});break;case y.dynamicAutocompletes:e({type:c.addExecutorForm,payload:{editName:m,fieldEditValue:x.map(C=>V(C))}});break}},j=()=>console.log("Submitted"),f=m=>{const{name:i,type:E,gridClassName:x,formFieldClassName:d,gridWidth:b,size:g,subfieldName:C,format:k,options:P,required:S}=m;switch(E){case y.checkbox:return a.jsx(N,{className:x,item:!0,xs:b||12,children:a.jsx(ee,{required:S,control:a.jsx(te,{className:d,name:i,size:g??"small",checked:s[i],onChange:n(i,E)}),label:t(`entities.${i}`)})},i);case y.input:return a.jsx(N,{className:x,item:!0,xs:b||12,children:a.jsx(v,{required:S,fullWidth:!0,className:d,size:g??"small",label:t(`entities.${i}`),name:i,value:s[i],onChange:n(i,E,k)})},i);case y.autocomplete:return a.jsx(N,{className:x,item:!0,xs:b||12,children:a.jsx(re,{fullWidth:!0,clearIcon:!1,className:d,options:P??[],getOptionLabel:B=>V(B).name,size:g??"small",value:s[i],onChange:n(i,E),renderInput:B=>a.jsx(v,{...B,required:S,label:t(`entities.${i}`),onBlur:()=>e({type:c.editExecutorAutocompleteValues,payload:{inputName:i,inputValue:""}}),onChange:Z(D=>e({type:c.editExecutorAutocompleteValues,payload:{inputName:i,inputValue:D.target.value}}),300)})})},i);case y.datepicker:return a.jsx(N,{className:x,item:!0,xs:b||12,children:a.jsx(J,{dateAdapter:U,children:a.jsx(X,{label:t(`entities.${i}`),value:s[i],className:d,slotProps:{textField:{size:"small",fullWidth:!0,required:S},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:n(i,E)})})},i);case y.dynamicInputs:return a.jsx(N,{className:x,item:!0,xs:b||12,children:a.jsx(H,{limit:i==="phoneNumbers"?4:2,label:t(`entities.${i}`),inputProps:{label:t(`entities.${C}`),size:"small",fullWidth:!0},values:s[i],onValuesChange:n(i,E)})},i);default:return""}};return p?a.jsx(W,{className:"flex justify-center items-center h-[300px]",children:a.jsx(se,{})}):a.jsx($,{children:a.jsx(K,{children:a.jsx("form",{onSubmit:j,children:a.jsx(N,{container:!0,spacing:2,children:ne({citiesOptions:r}).map(m=>f(m))})})})})},$e=async t=>{let s;return s=await L({method:"delete",url:`api/executor/${t}`,withCredentials:!0}),s},Le=(t,s,l)=>{const o=z();return q(()=>$e(l),{onSuccess:e=>(e.data.error||(s({type:c.resetExecutorFormData}),s({type:c.openSuccessSnackbar,payload:!0}),t(),o.invalidateQueries({queryKey:["executorsList"]})),e.data.message),onError:e=>{var r,u,p,h;return console.error(e),(u=(r=e==null?void 0:e.response)==null?void 0:r.data)!=null&&u.message&&s({type:c.openErrorSnackbar,payload:!0}),{error:e,message:((h=(p=e==null?void 0:e.response)==null?void 0:p.data)==null?void 0:h.message)||"Error has occured"}}})},De=t=>{var I,Q,R,_;const{open:s,onClose:l}=t,{t:o}=A(),{state:{editedExecutorFormData:e,editExecutorId:r,confirmationDialogOpen:u,openSuccessSnackbar:p,openErrorSnackbar:h,addExecutorModalOpen:n,editExecutorModalOpen:j},dispatch:f}=T(),m=()=>{f({type:c.confirmationDialogOpen,payload:!1}),l()},{mutate:i,isLoading:E,data:x,error:d,isSuccess:b,isError:g,reset:C}=Ae(l,f,r),{mutate:k,isLoading:P,data:S,error:B,isSuccess:D,isError:ie,reset:ce}=Le(m,f,r);M.useEffect(()=>{(n||j)&&(b&&C(),D&&ce())},[n,j]);const le=g||ie,O=d||B;return a.jsxs($,{children:[a.jsx(ae,{open:s,header:o("entities.editExecutor"),children:a.jsx(we,{}),onClose:l,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>i(Ne(e)),isLoading:E,hasCloseIconButton:!0,extraButtonText:"delete",hasExtraButton:!0,onExtraButtonClick:()=>f({type:c.confirmationDialogOpen,payload:!u})}),a.jsx(ye,{title:"entities.deleteExecutor",isLoading:P,open:u,onClose:()=>m(),onSubmit:()=>k()}),b&&(x!=null&&x.data.message)?a.jsx(w,{open:p,onClose:()=>f({type:c.openSuccessSnackbar,payload:!1}),severity:"success",content:x==null?void 0:x.data.message}):"",D&&(S!=null&&S.data.message)?a.jsx(w,{open:p,onClose:()=>f({type:c.openSuccessSnackbar,payload:!1}),severity:"success",content:S==null?void 0:S.data.message}):"",le&&((Q=(I=O==null?void 0:O.response)==null?void 0:I.data)!=null&&Q.message)?a.jsx(w,{open:h,onClose:()=>f({type:c.openErrorSnackbar,payload:!1}),severity:"error",content:(_=(R=O==null?void 0:O.response)==null?void 0:R.data)==null?void 0:_.message}):""]})},Qe=t=>{const{t:s}=A(),{state:{addExecutorModalOpen:l,editExecutorModalOpen:o},dispatch:e}=T(),{dispatch:r}=ue(),u=()=>{e({type:c.addExecutorModalOpen,payload:!1}),e({type:c.resetExecutorFormData})},p=()=>{e({type:c.editExecutorModalOpen,payload:!1}),e({type:c.resetExecutorFormData})};return M.useEffect(()=>{r({type:de.resetTransactionStates})},[]),a.jsx($,{children:a.jsxs(M.Suspense,{fallback:"Loading....",children:[a.jsx(W,{className:"my-2 flex justify-end",children:a.jsx(he,{onClick:()=>e({type:c.addExecutorModalOpen,payload:!l}),children:s("entities.addNewExecutor")})}),a.jsx(Se,{}),a.jsx(Ve,{open:l,onClose:u}),a.jsx(De,{open:o,onClose:p})]})})};export{Qe as Executors};
