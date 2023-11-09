import{a as M,L as O,r as V,j as t,B as z,N as c,y as h,c as B,z as P,F as ce,J as ue}from"./index-0fc86f99.js";import{u as Y,a as G,c as pe,m as me,T as ye,C as K,G as C,D as H,L as J,b as U,e as X,d as Z,F as ee,f as ae,M as te,g as fe}from"./ConfirmationDialog-9583af2c.js";import{s as $,T as v,u as q,a as A,B as he}from"./SnackbarNotification-fe22749b.js";import{C as se}from"./CircularProgress-9f706af9.js";import{u as re}from"./useGetCitiesNamesQuery-5d3f83ca.js";import{A as ie}from"./Autocomplete-98c931ae.js";const we=({id:a,address:s,case_count:u,city:i,display_phone_numbers:e,email:d,first_name:p,last_name:n,office_name:m,phone_numbers:r})=>({id:a,address:s,numberOfCases:u,city:i,displayPhoneNumbers:e,email:d,name:`${Y(p)} ${n?Y(n):""}`,officeName:m,phoneNumbers:r}),be=async a=>{var p;const{sortBy:s="created_at",sort:u="desc",page:i=1,size:e=25}=a;let d;try{d=await $({method:"get",url:"api/lawyers-list",params:{...a,sortBy:s===""?"created_at":pe(s),sort:u===""?"asc":u,page:i,size:e},withCredentials:!0}),(p=d.data.data)!=null&&p.lawyers&&(d.data.data.lawyers=d.data.data.lawyers.map(n=>we(n)))}catch{d={data:{error:500,message:"Connection problem"}}}return d},xe=a=>G(["lawyersList",a],()=>be(a),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),ge=()=>"#6b7280",k=a=>{const{id:s,first_name:u,last_name:i,city:e,email:d,name:p}=a;let n="";return p&&(n=p),u&&(n=`${u} ${i??""}`),e&&(n=e),d&&(n=d),{id:s,name:n}},Le=({city:a,email:s,firstName:u,lastName:i,officeName:e,phoneNumbers:d,address:p})=>{let n=null;typeof a!="string"&&(n=a.id);const m=d.filter(r=>r.length>5);return{city_id:n,email:s,first_name:u,last_name:i,office_name:e,address:p,phone_numbers:m}},Ne=({city:a,email:s,first_name:u,last_name:i,phone_numbers:e,address:d,office_name:p})=>({city:a!=null&&a.id?{id:a.id,name:a.name}:"",email:s||"",firstName:u,lastName:i,address:d||"",officeName:p,phoneNumbers:e&&e.length>0?e:[""]}),je=({city:a,email:s,firstName:u,lastName:i,phoneNumbers:e,address:d,officeName:p})=>{const n={};return a!==void 0&&(typeof a!="string"?n.city_id=a.id||null:a===""&&(n.city_id=null)),s!==void 0&&(n.email=s||null),u!==void 0&&(n.first_name=u||null),i!==void 0&&(n.last_name=i||null),d!==void 0&&(n.address=d||null),p!==void 0&&(n.office_name=p||null),e!==void 0&&(e.length>0?n.phone_numbers=e==null?void 0:e.filter(m=>m.length>5):n.phone_numbers=[""]),n},N={name:"name",officeName:"officeName",email:"email",address:"address",city:"city",displayPhoneNumbers:"displayPhoneNumbers",phoneNumbers:"phoneNumbers",numberOfCases:"numberOfCases"},Ce=()=>{var b,f;const{t:a}=M(),{state:{sortable:{sort:s,sortBy:u},pageable:{page:i,size:e},searchable:d},dispatch:p}=O();let n={page:i,size:e,sort:s,sortBy:u};const m=d.reduce((o,x)=>{const g=me(x);return{...o,...g}},{}),{data:r,isLoading:L,refetch:w}=xe({...n,...m}),y=o=>{const{id:x}=o.original;x&&(p({type:c.editLawyerId,payload:x}),p({type:c.editLawyerModalOpen,payload:!0}))},l=V.useMemo(()=>[{accessorFn:o=>o.name,id:N.name,header:()=>t.jsx("span",{children:a(`entities.${[N.name]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.officeName,id:N.officeName,header:()=>t.jsx("span",{children:a(`entities.${[N.officeName]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.email,id:N.email,header:()=>t.jsx("span",{children:a(`entities.${[N.email]}`)}),cell:o=>o.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:o=>o.displayPhoneNumbers,id:N.displayPhoneNumbers,header:()=>t.jsx("span",{children:a(`entities.${[N.phoneNumbers]}`)}),cell:o=>o.getValue(),isSortable:!0},{accessorFn:o=>o.address,id:N.address,header:()=>t.jsx("span",{children:a(`entities.${[N.address]}`)}),cell:o=>o.getValue(),isSearchable:!1,isSortable:!0},{accessorFn:o=>o.city,id:N.city,header:()=>t.jsx("span",{children:a(`entities.${[N.city]}`)}),cell:o=>o.getValue(),isSortable:!0},{accessorFn:o=>o.numberOfCases,id:N.numberOfCases,header:()=>t.jsx("span",{children:a(`entities.${[N.numberOfCases]}`)}),cell:o=>o.getValue(),isSortable:!0}],[]);return L?t.jsx(z,{className:"flex justify-center items-center h-[80vh]",children:t.jsx(se,{})}):t.jsx(ye,{columns:l,data:(b=r==null?void 0:r.data.data)==null?void 0:b.lawyers,hasSearch:!0,sort:s,sortBy:u,totalNumber:(f=r==null?void 0:r.data.data)==null?void 0:f.meta.total_number,page:i,size:e,borderKeyword:"type",updateState:p,refetch:w,mapBorderColors:ge,onRowClick:y})},oe=({citiesOptions:a})=>[{name:"firstName",required:!0,type:h.input,gridWidth:6,condition:!1},{name:"lastName",type:h.input,gridWidth:6,condition:!1},{name:"officeName",type:h.input,gridWidth:6,condition:!1},{name:"email",type:h.input,gridWidth:6},{name:"address",type:h.input,gridWidth:6,condition:!1},{name:"city",type:h.autocomplete,gridWidth:6,options:a},{name:"phoneNumbers",subfieldName:"phoneNumber",type:h.dynamicInputs,gridWidth:12}],Se=()=>{const{t:a}=M(),{state:{addLawyerForm:s,addLawyerAutocompleteValues:u},dispatch:i}=O(),{data:e}=re({search:u.city}),d=(m,r,L)=>(w,y)=>{switch(r){case h.input:const{value:l}=w==null?void 0:w.target;let b=l;L?b.match(L)&&i({type:c.addLawyerForm,payload:{name:m,fieldValue:b}}):i({type:c.addLawyerForm,payload:{name:m,fieldValue:b}});break;case h.checkbox:i({type:c.addLawyerForm,payload:{name:m,fieldValue:y}});break;case h.datepicker:i({type:c.addLawyerForm,payload:{name:m,fieldValue:w}});break;case h.dynamicInputs:i({type:c.addLawyerForm,payload:{name:m,fieldValue:w}});break;case h.autocomplete:i({type:c.addLawyerForm,payload:{name:m,fieldValue:y?k(y):""}});break;case h.dynamicAutocompletes:i({type:c.addLawyerForm,payload:{name:m,fieldValue:w.map(f=>k(f))}});break}},p=()=>console.log("Submitted"),n=m=>{const{name:r,type:L,gridClassName:w,formFieldClassName:y,gridWidth:l,options:b,size:f,subfieldName:o,format:x,required:g}=m;switch(L){case h.checkbox:return t.jsx(C,{className:w,item:!0,xs:l||12,children:t.jsx(ee,{required:g,control:t.jsx(ae,{className:y,name:r,size:f??"small",checked:s[r],onChange:d(r,L)}),label:a(`entities.${r}`)})},r);case h.input:return t.jsx(C,{className:w,item:!0,xs:l||12,children:t.jsx(v,{required:g,fullWidth:!0,className:y,size:f??"small",label:a(`entities.${r}`),name:r,value:s[r],onChange:d(r,L,x)})},r);case h.autocomplete:return t.jsx(C,{className:w,item:!0,xs:l||12,children:t.jsx(ie,{fullWidth:!0,clearIcon:!1,className:y,options:b??[],getOptionLabel:j=>k(j).name,size:f??"small",value:s[r],onChange:d(r,L),renderInput:j=>t.jsx(v,{...j,required:g,label:a(`entities.${r}`),onBlur:()=>i({type:c.addLawyerAutocompleteValues,payload:{inputName:r,inputValue:""}}),onChange:Z(F=>i({type:c.addLawyerAutocompleteValues,payload:{inputName:r,inputValue:F.target.value}}),300)})})},r);case h.datepicker:return t.jsx(C,{className:w,item:!0,xs:l||12,children:t.jsx(J,{dateAdapter:U,children:t.jsx(X,{localeText:{clearButtonLabel:a("clear")},label:a(`entities.${r}`),value:s[r],className:y,slotProps:{textField:{size:"small",fullWidth:!0,required:g},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:d(r,L)})})},r);case h.dynamicInputs:return t.jsx(C,{className:w,item:!0,xs:l||12,children:t.jsx(H,{limit:r==="phoneNumbers"?4:2,label:a(`entities.${r}`),inputProps:{label:a(`entities.${o}`),size:"small",fullWidth:!0},values:s[r],onValuesChange:d(r,L)})},r);default:return""}};return t.jsx(B,{children:t.jsx(K,{children:t.jsx("form",{onSubmit:p,children:t.jsx(C,{container:!0,spacing:2,children:oe({citiesOptions:e}).map(m=>n(m))})})})})},Fe=async a=>{let s;return s=await $({method:"post",url:"api/lawyers",data:a,withCredentials:!0}),s},Ee=(a,s)=>{const u=P();return q(i=>Fe(i),{onSuccess:i=>(i.data.error||(s({type:c.resetLawyerFormData}),i.data.message&&s({type:c.openSuccessSnackbar,payload:!0}),a(),u.invalidateQueries({queryKey:["lawyersList"]})),i.data.message),onError:i=>{var e,d;return console.error(i),s({type:c.openErrorSnackbar,payload:!0}),{error:i,message:((d=(e=i==null?void 0:i.response)==null?void 0:e.data)==null?void 0:d.message)||"Error has occured"}}})},ke=a=>{var x,g,j,F;const{open:s,onClose:u}=a,{t:i}=M(),{state:{addLawyerForm:e,openSuccessSnackbar:d,openErrorSnackbar:p,addLawyerModalOpen:n,editLawyerModalOpen:m},dispatch:r}=O(),{mutate:L,isLoading:w,data:y,error:l,isSuccess:b,isError:f,reset:o}=Ee(u,r);return V.useEffect(()=>{(n||m)&&b&&o()},[n,m]),t.jsxs(B,{children:[t.jsx(te,{open:s,header:i("entities.addNewLawyer"),children:t.jsx(Se,{}),onClose:u,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>L(Le(e)),isLoading:w,hasCloseIconButton:!0}),b&&(y!=null&&y.data.message)?t.jsx(A,{open:d,onClose:()=>r({type:c.openSuccessSnackbar,payload:!1}),severity:"success",content:y==null?void 0:y.data.message}):"",f&&((g=(x=l==null?void 0:l.response)==null?void 0:x.data)!=null&&g.message)?t.jsx(A,{open:p,onClose:()=>r({type:c.openErrorSnackbar,payload:!1}),severity:"error",content:(F=(j=l==null?void 0:l.response)==null?void 0:j.data)==null?void 0:F.message}):""]})},Ve=async(a,s)=>{let u;return u=await $({method:"patch",url:`api/lawyer/${a}`,data:s,withCredentials:!0}),u},Me=(a,s,u)=>{const i=P();return q(e=>Ve(u,e),{onSuccess:e=>(e.data.error||(s({type:c.resetLawyerFormData}),s({type:c.openSuccessSnackbar,payload:!0}),a(),i.invalidateQueries({queryKey:["lawyersList"]}),i.invalidateQueries({queryKey:["lawyer"]})),e.data.message),onError:e=>{var d,p,n,m;return console.error(e),(p=(d=e==null?void 0:e.response)==null?void 0:d.data)!=null&&p.message&&s({type:c.openErrorSnackbar,payload:!0}),{error:e,message:((m=(n=e==null?void 0:e.response)==null?void 0:n.data)==null?void 0:m.message)||"Error has occured"}}})},Oe=async a=>{let s;if(a){try{s=await $({method:"get",url:`api/lawyer/${a}`,withCredentials:!0})}catch{s={data:{error:500,message:"errors.serverError"}}}return s}return{data:{error:400,message:"errors.notFound"}}},Te=a=>G(["lawyer",a],()=>Oe(a),{keepPreviousData:!1,refetchOnMount:!0,refetchOnWindowFocus:!1,select(s){if(s.data.data)return Ne(s.data.data)}}),Ae=()=>{const{t:a}=M(),{state:{editLawyerForm:s,editLawyerId:u,editLawyerAutocompleteValues:i},dispatch:e}=O(),{data:d}=re({search:i.city}),{data:p,isLoading:n,isSuccess:m}=Te(u);V.useEffect(()=>{m&&(p!=null&&p.firstName)&&e({type:c.setLawyerFormData,payload:p})},[p==null?void 0:p.firstName]);const r=(y,l,b)=>(f,o)=>{switch(l){case h.input:const{value:x}=f==null?void 0:f.target;let g=x;b?g.match(b)&&e({type:c.editLawyerForm,payload:{editName:y,fieldEditValue:g}}):e({type:c.editLawyerForm,payload:{editName:y,fieldEditValue:g}});break;case h.checkbox:e({type:c.editLawyerForm,payload:{editName:y,fieldEditValue:o}});break;case h.datepicker:e({type:c.editLawyerForm,payload:{editName:y,fieldEditValue:f}});break;case h.dynamicInputs:e({type:c.editLawyerForm,payload:{editName:y,fieldEditValue:f}});break;case h.autocomplete:e({type:c.editLawyerForm,payload:{editName:y,fieldEditValue:o?k(o):""}});break;case h.dynamicAutocompletes:e({type:c.addLawyerForm,payload:{editName:y,fieldEditValue:f.map(j=>k(j))}});break}},L=()=>console.log("Submitted"),w=y=>{const{name:l,type:b,gridClassName:f,formFieldClassName:o,gridWidth:x,size:g,subfieldName:j,format:F,options:W,required:S}=y;switch(b){case h.checkbox:return t.jsx(C,{className:f,item:!0,xs:x||12,children:t.jsx(ee,{required:S,control:t.jsx(ae,{className:o,name:l,size:g??"small",checked:s[l],onChange:r(l,b)}),label:a(`entities.${l}`)})},l);case h.input:return t.jsx(C,{className:f,item:!0,xs:x||12,children:t.jsx(v,{required:S,fullWidth:!0,className:o,size:g??"small",label:a(`entities.${l}`),name:l,value:s[l],onChange:r(l,b,F)})},l);case h.autocomplete:return t.jsx(C,{className:f,item:!0,xs:x||12,children:t.jsx(ie,{fullWidth:!0,clearIcon:!1,className:o,options:W??[],getOptionLabel:T=>k(T).name,size:g??"small",value:s[l],onChange:r(l,b),renderInput:T=>t.jsx(v,{...T,required:S,label:a(`entities.${l}`),onBlur:()=>e({type:c.editLawyerAutocompleteValues,payload:{inputName:l,inputValue:""}}),onChange:Z(D=>e({type:c.editLawyerAutocompleteValues,payload:{inputName:l,inputValue:D.target.value}}),300)})})},l);case h.datepicker:return t.jsx(C,{className:f,item:!0,xs:x||12,children:t.jsx(J,{dateAdapter:U,children:t.jsx(X,{localeText:{clearButtonLabel:a("clear")},label:a(`entities.${l}`),value:s[l],className:o,slotProps:{textField:{size:"small",fullWidth:!0,required:S},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:r(l,b)})})},l);case h.dynamicInputs:return t.jsx(C,{className:f,item:!0,xs:x||12,children:t.jsx(H,{label:a(`entities.${l}`),inputProps:{label:a(`entities.${j}`),size:"small",fullWidth:!0},values:s[l],onValuesChange:r(l,b)})},l);default:return""}};return n?t.jsx(z,{className:"flex justify-center items-center h-[300px]",children:t.jsx(se,{})}):t.jsx(B,{children:t.jsx(K,{children:t.jsx("form",{onSubmit:L,children:t.jsx(C,{container:!0,spacing:2,children:oe({citiesOptions:d}).map(y=>w(y))})})})})},Be=async a=>{let s;return s=await $({method:"delete",url:`api/lawyer/${a}`,withCredentials:!0}),s},$e=(a,s,u)=>{const i=P();return q(()=>Be(u),{onSuccess:e=>(e.data.error||(s({type:c.resetLawyerFormData}),s({type:c.openSuccessSnackbar,payload:!0}),a(),i.invalidateQueries({queryKey:["lawyersList"]})),e.data.message),onError:e=>{var d,p,n,m;return console.error(e),(p=(d=e==null?void 0:e.response)==null?void 0:d.data)!=null&&p.message&&s({type:c.openErrorSnackbar,payload:!0}),{error:e,message:((m=(n=e==null?void 0:e.response)==null?void 0:n.data)==null?void 0:m.message)||"Error has occured"}}})},De=a=>{var I,Q,R,_;const{open:s,onClose:u}=a,{t:i}=M(),{state:{editedLawyerFormData:e,editLawyerId:d,confirmationDialogOpen:p,openSuccessSnackbar:n,openErrorSnackbar:m,addLawyerModalOpen:r,editLawyerModalOpen:L},dispatch:w}=O(),y=()=>{w({type:c.confirmationDialogOpen,payload:!1}),u()},{mutate:l,isLoading:b,data:f,error:o,isSuccess:x,isError:g,reset:j}=Me(u,w,d),{mutate:F,isLoading:W,data:S,error:T,isSuccess:D,isError:ne,reset:le}=$e(y,w,d);V.useEffect(()=>{(r||L)&&(x&&j(),D&&le())},[r,L]);const de=g||ne,E=o||T;return t.jsxs(B,{children:[t.jsx(te,{open:s,header:i("entities.editLawyer"),children:t.jsx(Ae,{}),onClose:u,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>l(je(e)),isLoading:b,hasCloseIconButton:!0,extraButtonText:"delete",hasExtraButton:!0,onExtraButtonClick:()=>w({type:c.confirmationDialogOpen,payload:!p})}),t.jsx(fe,{title:"entities.deleteLawyer",isLoading:W,open:p,onClose:()=>y(),onSubmit:()=>F()}),x&&(f!=null&&f.data.message)?t.jsx(A,{open:n,onClose:()=>w({type:c.openSuccessSnackbar,payload:!1}),severity:"success",content:f==null?void 0:f.data.message}):"",D&&(S!=null&&S.data.message)?t.jsx(A,{open:n,onClose:()=>w({type:c.openSuccessSnackbar,payload:!1}),severity:"success",content:S==null?void 0:S.data.message}):"",de&&((Q=(I=E==null?void 0:E.response)==null?void 0:I.data)!=null&&Q.message)?t.jsx(A,{open:m,onClose:()=>w({type:c.openErrorSnackbar,payload:!1}),severity:"error",content:(_=(R=E==null?void 0:E.response)==null?void 0:R.data)==null?void 0:_.message}):""]})},Qe=a=>{const{t:s}=M(),{state:{addLawyerModalOpen:u,editLawyerModalOpen:i},dispatch:e}=O(),{dispatch:d}=ce(),p=()=>{e({type:c.addLawyerModalOpen,payload:!1}),e({type:c.resetLawyerFormData})},n=()=>{e({type:c.editLawyerModalOpen,payload:!1}),e({type:c.resetLawyerFormData})};return V.useEffect(()=>{d({type:ue.resetTransactionStates})},[]),t.jsx(B,{children:t.jsxs(V.Suspense,{fallback:"Loading....",children:[t.jsx(z,{className:"my-2 flex justify-end",children:t.jsx(he,{onClick:()=>e({type:c.addLawyerModalOpen,payload:!u}),children:s("entities.addNewLawyer")})}),t.jsx(Ce,{}),t.jsx(ke,{open:u,onClose:p}),t.jsx(De,{open:i,onClose:n})]})})};export{Qe as Lawyers};