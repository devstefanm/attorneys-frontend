import{a as N,O as j,r as O,j as t,x as l,E as T,P as y,y as w,B as L}from"./index-a59700e2.js";import{u as k,a as M,c as P,m as W,T as D,C as z,G as E,L as _,A as I,b as Q,d as G,F as R,e as Y,M as q}from"./AdapterMoment-1f717f9b.js";import{s as V,T as B,u as v,B as K}from"./setupAxios-41eb1db7.js";import{D as H}from"./DynamicInputs-fcabbf9d.js";import{u as J}from"./useGetCitiesNamesQuery-13bbd935.js";import{A as U}from"./Autocomplete-63e30613.js";const X=({case_count:e,city:r,display_phone_numbers:i,first_name:s,last_name:u,phone_numbers:n,email:d})=>({numberOfCases:e,city:r,email:d,displayPhoneNumbers:i,name:`${k(s)} ${k(u)}`,phoneNumbers:n}),Z=async e=>{var d;const{sortBy:r="created_at",sort:i="desc",page:s=1,size:u=25}=e;let n;try{n=await V({method:"get",url:"api/executors-list",params:{...e,sortBy:r===""?"created_at":P(r),sort:i===""?"asc":i,page:s,size:u},withCredentials:!0}),(d=n.data.data)!=null&&d.executors&&(n.data.data.executors=n.data.data.executors.map(c=>X(c)))}catch{n={data:{error:500,message:"Connection problem"}}}return n},ee=e=>M(["executorsList",e],()=>Z(e),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),te=()=>"#6b7280",A=e=>{const{id:r,first_name:i,last_name:s,city:u,email:n,name:d}=e;let c="";return d&&(c=d),i&&(c=`${i} ${s??""}`),u&&(c=u),n&&(c=n),{id:r,name:c}},ae=({city:e,email:r,firstName:i,lastName:s,phoneNumbers:u})=>{let n=null;typeof e!="string"&&(n=e.id);const d=u.filter(c=>c.length>5);return{city_id:n,email:r,first_name:i,last_name:s,phone_numbers:d}},f={name:"name",email:"email",city:"city",displayPhoneNumbers:"displayPhoneNumbers",phoneNumbers:"phoneNumbers",numberOfCases:"numberOfCases"},se=()=>{var h,g;const{t:e}=N(),{state:{sortable:{sort:r,sortBy:i},pageable:{page:s,size:u},searchable:n},dispatch:d}=j();let c={page:s,size:u,sort:r,sortBy:i};const p=n.reduce((o,C)=>{const F=W(C);return{...o,...F}},{}),{data:a,isLoading:x,refetch:m}=ee({...c,...p}),b=O.useMemo(()=>[{accessorFn:o=>o.name,id:f.name,header:()=>t.jsx("span",{children:e(`entities.${[f.name]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.email,id:f.email,header:()=>t.jsx("span",{children:e(`entities.${[f.email]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.displayPhoneNumbers,id:f.displayPhoneNumbers,header:()=>t.jsx("span",{children:e(`entities.${[f.phoneNumbers]}`)}),cell:o=>o.getValue(),isSortable:!0},{accessorFn:o=>o.city,id:f.city,header:()=>t.jsx("span",{children:e(`entities.${[f.city]}`)}),cell:o=>o.getValue(),isSortable:!0},{accessorFn:o=>o.numberOfCases,id:f.numberOfCases,header:()=>t.jsx("span",{children:e(`entities.${[f.numberOfCases]}`)}),cell:o=>o.getValue(),isSortable:!0}],[]);return x?t.jsx(t.Fragment,{children:"Loading..."}):t.jsx(D,{columns:b,data:(h=a==null?void 0:a.data.data)==null?void 0:h.executors,hasSearch:!0,sort:r,sortBy:i,totalNumber:(g=a==null?void 0:a.data.data)==null?void 0:g.meta.total_number,page:s,size:u,borderKeyword:"type",updateState:d,refetch:m,mapBorderColors:te})},re=({citiesOptions:e})=>[{name:"firstName",type:l.input,gridWidth:6,condition:!1},{name:"lastName",type:l.input,gridWidth:6,condition:!1},{name:"email",type:l.input,gridWidth:6},{name:"city",type:l.autocomplete,gridWidth:6,options:e},{name:"phoneNumbers",subfieldName:"phoneNumber",type:l.dynamicInputs,gridWidth:12}],oe=()=>{const{t:e}=N(),{state:{addExecutorForm:r,addExecutorAutocompleteValues:i},dispatch:s}=j(),{data:u}=J({search:i.city}),n=(p,a,x)=>(m,b)=>{switch(a){case l.input:const{value:h}=m==null?void 0:m.target;let g=h;x?(g=h.replace(x,""),s({type:y.addExecutorForm,payload:{name:p,fieldValue:g}})):s({type:y.addExecutorForm,payload:{name:p,fieldValue:g}});break;case l.checkbox:s({type:y.addExecutorForm,payload:{name:p,fieldValue:b}});break;case l.datepicker:s({type:y.addExecutorForm,payload:{name:p,fieldValue:m}});break;case l.dynamicInputs:s({type:y.addExecutorForm,payload:{name:p,fieldValue:m}});break;case l.autocomplete:s({type:y.addExecutorForm,payload:{name:p,fieldValue:b?A(b):""}});break;case l.dynamicAutocompletes:s({type:y.addExecutorForm,payload:{name:p,fieldValue:m.map(o=>A(o))}});break}},d=()=>console.log("Submitted"),c=p=>{const{name:a,type:x,gridClassName:m,formFieldClassName:b,gridWidth:h,options:g,size:o,subfieldName:C,format:F}=p;switch(x){case l.checkbox:return t.jsx(E,{className:m,item:!0,xs:h||12,children:t.jsx(R,{control:t.jsx(Y,{className:b,name:a,size:o??"small",checked:r[a],onChange:n(a,x)}),label:e(`entities.${a}`)})},a);case l.input:return t.jsx(E,{className:m,item:!0,xs:h||12,children:t.jsx(B,{fullWidth:!0,className:b,size:o??"small",label:e(`entities.${a}`),name:a,value:r[a],onChange:n(a,x,F)})},a);case l.autocomplete:return t.jsx(E,{className:m,item:!0,xs:h||12,children:t.jsx(U,{fullWidth:!0,className:b,options:g??[],getOptionLabel:S=>A(S).name,size:o??"small",value:r[a],onChange:n(a,x),renderInput:S=>t.jsx(B,{...S,label:e(`entities.${a}`),onChange:G($=>s({type:y.addExecutorAutocompleteValues,payload:{inputName:a,inputValue:$.target.value}}),300)})})},a);case l.datepicker:return t.jsx(E,{className:m,item:!0,xs:h||12,children:t.jsx(_,{dateAdapter:I,children:t.jsx(Q,{label:e(`entities.${a}`),value:r[a],className:b,slotProps:{textField:{size:"small",fullWidth:!0},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:n(a,x)})})},a);case l.dynamicInputs:return t.jsx(E,{className:m,item:!0,xs:h||12,children:t.jsx(H,{label:e(`entities.${a}`),inputProps:{label:e(`entities.${C}`),size:"small",fullWidth:!0},values:r[a],onValuesChange:n(a,x)})},a);default:return""}};return t.jsx(T,{children:t.jsx(z,{children:t.jsx("form",{onSubmit:d,children:t.jsx(E,{container:!0,spacing:2,children:re({citiesOptions:u}).map(p=>c(p))})})})})},ne=async e=>{let r;try{r=await V({method:"post",url:"api/executors",data:e,withCredentials:!0})}catch{r={data:{error:500,message:"Connection problem"}}}return r},ie=(e,r)=>{const i=w();return v(s=>ne(s),{onSuccess:s=>(s.data.error||(r({type:y.resetExecutorFormData}),e(),i.invalidateQueries({queryKey:["executorsList"]})),s.data.message),onError:s=>({error:s,message:"Connection problem"})})},ce=e=>{const{open:r,onClose:i}=e,{t:s}=N(),{state:{addExecutorForm:u},dispatch:n}=j(),{mutate:d,isLoading:c}=ie(i,n);return t.jsx(T,{children:t.jsx(q,{open:r,header:s("entities.addNewExecutor"),children:t.jsx(oe,{}),onClose:i,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>d(ae(u)),isLoading:c,hasCloseIconButton:!0})})},he=e=>{const{t:r}=N(),{state:{addExecutorModalOpen:i},dispatch:s}=j();return t.jsx(T,{children:t.jsxs(O.Suspense,{fallback:"Loading....",children:[t.jsx(L,{className:"my-2 flex justify-end",children:t.jsx(K,{onClick:()=>s({type:y.addExecutorModalOpen,payload:!i}),children:r("entities.addNewExecutor")})}),t.jsx(se,{}),t.jsx(ce,{open:i,onClose:()=>s({type:y.addExecutorModalOpen,payload:!1})})]})})};export{he as Executors};
