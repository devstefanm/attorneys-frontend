import{a as F,a1 as D,r as w,j as e,B as T,a2 as N,a3 as $,a4 as y,y as S,c as L,z as A,F as he,J as be}from"./index-0fc86f99.js";import{a as Q,c as ie,m as le,T as de,C as _,G as k,D as K,L as G,b as H,e as J,F as U,f as X,M as Z,g as ue}from"./ConfirmationDialog-9583af2c.js";import{s as O,T as ee,u as z,a as M,B as ce}from"./SnackbarNotification-fe22749b.js";import{C as ae}from"./CircularProgress-9f706af9.js";const ge=({id:a,ssn:t,case_count:c})=>({id:a,ssn:t,numberOfCases:c}),Se=async a=>{var i;const{sortBy:t="created_at",sort:c="desc",page:o=1,size:s=25}=a;let d;try{d=await O({method:"get",url:"api/ssn-list",params:{...a,sortBy:t===""?"created_at":ie(t),sort:c===""?"asc":c,page:o,size:s},withCredentials:!0}),(i=d.data.data)!=null&&i.ssn_numbers&&(d.data.data.ssn_numbers=d.data.data.ssn_numbers.map(r=>ge(r)))}catch{d={data:{error:500,message:"Connection problem"}}}return d},Ne=a=>Q(["ssnNumbersList",a],()=>Se(a),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),ye=()=>"#6b7280",fe=({ssnNumber:a})=>({ssn:a}),xe=({ssn:a})=>({ssnNumber:a}),ke=({ssnNumber:a})=>a!==void 0?{ssn:a||null}:{ssn:null},Y={ssn:"ssn",numberOfCases:"numberOfCases"},je=()=>{var f,b;const{t:a}=F(),{state:{sortable:{sort:t,sortBy:c},pageable:{page:o,size:s},searchable:d},dispatch:i}=D();let r={page:o,size:s,sort:t,sortBy:c};const m=d.reduce((g,x)=>{const j=le(x);return{...g,...j}},{}),{data:u,isLoading:p,refetch:n}=Ne({...r,...m}),l=g=>{const{id:x}=g.original;x&&(i({type:N.editSSNNumberId,payload:x}),i({type:N.editSSNNumberModalOpen,payload:!0}))},h=w.useMemo(()=>[{accessorFn:g=>g.ssn,id:Y.ssn,header:()=>e.jsx("span",{children:a(`entities.${[Y.ssn]}`)}),cell:g=>g.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:g=>g.numberOfCases,id:Y.numberOfCases,header:()=>e.jsx("span",{children:a(`entities.${[Y.numberOfCases]}`)}),cell:g=>g.getValue(),isSortable:!0}],[]);return p?e.jsx(T,{className:"flex justify-center items-center h-[80vh]",children:e.jsx(ae,{})}):e.jsx(de,{columns:h,data:(f=u==null?void 0:u.data.data)==null?void 0:f.ssn_numbers,hasSearch:!0,sort:t,sortBy:c,totalNumber:(b=u==null?void 0:u.data.data)==null?void 0:b.meta.total_number,page:o,size:s,borderKeyword:"type",updateState:i,refetch:n,mapBorderColors:ye,onRowClick:l})},Ce=({id:a,case_count:t,package_name:c})=>({id:a,numberOfCases:t,packageName:c}),Ee=async a=>{var i;const{sortBy:t="created_at",sort:c="desc",page:o=1,size:s=25}=a;let d;try{d=await O({method:"get",url:"api/packages-list",params:{...a,sortBy:t===""?"created_at":ie(t),sort:c===""?"asc":c,page:o,size:s},withCredentials:!0}),(i=d.data.data)!=null&&i.packages&&(d.data.data.packages=d.data.data.packages.map(r=>Ce(r)))}catch{d={data:{error:500,message:"Connection problem"}}}return d},Pe=a=>Q(["packagesList",a],()=>Ee(a),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),Fe=()=>"#6b7280",Me=({packageName:a})=>({package_name:a}),we=({package_name:a})=>({packageName:a}),Oe=({packageName:a})=>a!==void 0?{package_name:a||null}:{package_name:null},I={packageName:"packageName",numberOfCases:"numberOfCases"},Be=()=>{var f,b;const{t:a}=F(),{state:{sortable:{sort:t,sortBy:c},pageable:{page:o,size:s},searchable:d},dispatch:i}=$();let r={page:o,size:s,sort:t,sortBy:c};const m=d.reduce((g,x)=>{const j=le(x);return{...g,...j}},{}),{data:u,isLoading:p,refetch:n}=Pe({...r,...m}),l=g=>{const{id:x}=g.original;x&&(i({type:y.editPackageId,payload:x}),i({type:y.editPackageModalOpen,payload:!0}))},h=w.useMemo(()=>[{accessorFn:g=>g.packageName,id:I.packageName,header:()=>e.jsx("span",{children:a(`entities.${[I.packageName]}`)}),cell:g=>g.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:g=>g.numberOfCases,id:I.numberOfCases,header:()=>e.jsx("span",{children:a(`entities.${[I.numberOfCases]}`)}),cell:g=>g.getValue(),isSortable:!0}],[]);return p?e.jsx(T,{className:"flex justify-center items-center h-[80vh]",children:e.jsx(ae,{})}):e.jsx(de,{columns:h,data:(f=u==null?void 0:u.data.data)==null?void 0:f.packages,hasSearch:!0,sort:t,sortBy:c,totalNumber:(b=u==null?void 0:u.data.data)==null?void 0:b.meta.total_number,page:o,size:s,borderKeyword:"type",updateState:i,refetch:n,mapBorderColors:Fe,onRowClick:l})},me=[{name:"ssnNumber",required:!0,type:S.input,gridWidth:12,condition:!1}],Te=()=>{const{t:a}=F(),{state:{addSSNNumberForm:t},dispatch:c}=D(),o=(i,r,m)=>(u,p)=>{switch(r){case S.input:const{value:n}=u==null?void 0:u.target;let l=n;m?l.match(m)&&c({type:N.addSSNNumberForm,payload:{name:i,fieldValue:l}}):c({type:N.addSSNNumberForm,payload:{name:i,fieldValue:l}});break;case S.checkbox:c({type:N.addSSNNumberForm,payload:{name:i,fieldValue:p}});break;case S.datepicker:c({type:N.addSSNNumberForm,payload:{name:i,fieldValue:u}});break;case S.dynamicInputs:c({type:N.addSSNNumberForm,payload:{name:i,fieldValue:u}});break}},s=()=>console.log("Submitted"),d=i=>{const{name:r,type:m,gridClassName:u,formFieldClassName:p,gridWidth:n,size:l,subfieldName:h,format:f,required:b}=i;switch(m){case S.checkbox:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(U,{required:b,control:e.jsx(X,{className:p,name:r,size:l??"small",checked:t[r],onChange:o(r,m)}),label:a(`entities.${r}`)})},r);case S.input:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(ee,{required:b,fullWidth:!0,className:p,size:l??"small",label:a(`entities.${r}`),name:r,value:t[r],onChange:o(r,m,f)})},r);case S.datepicker:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(G,{dateAdapter:H,children:e.jsx(J,{localeText:{clearButtonLabel:a("clear")},label:a(`entities.${r}`),value:t[r],className:p,slotProps:{textField:{size:"small",fullWidth:!0,required:b},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:o(r,m)})})},r);case S.dynamicInputs:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(K,{limit:r==="phoneNumbers"?4:2,label:a(`entities.${r}`),inputProps:{label:a(`entities.${h}`),size:"small",fullWidth:!0},values:t[r],onValuesChange:o(r,m)})},r);default:return""}};return e.jsx(L,{children:e.jsx(_,{children:e.jsx("form",{onSubmit:s,children:e.jsx(k,{container:!0,spacing:2,children:me.map(i=>d(i))})})})})},Le=async a=>{let t;return t=await O({method:"post",url:"api/ssn",data:a,withCredentials:!0}),t},De=(a,t)=>{const c=A();return z(o=>Le(o),{onSuccess:o=>(o.data.error||(t({type:N.resetSSNNumberFormData}),t({type:N.openSuccessSnackbar,payload:!0}),a(),c.invalidateQueries({queryKey:["ssnNumbersList"]})),o.data.message),onError:o=>{var s,d;return console.error(o),t({type:N.openErrorSnackbar,payload:!0}),{error:o,message:((d=(s=o==null?void 0:o.response)==null?void 0:s.data)==null?void 0:d.message)||"Error has occured"}}})},$e=a=>{var x,j,C,B;const{open:t,onClose:c}=a,{t:o}=F(),{state:{addSSNNumberForm:s,openSuccessSnackbar:d,openErrorSnackbar:i,addSSNNumberModalOpen:r,editSSNNumberModalOpen:m},dispatch:u}=D(),{mutate:p,isLoading:n,data:l,error:h,isSuccess:f,isError:b,reset:g}=De(c,u);return w.useEffect(()=>{(r||m)&&f&&g()},[r,m]),e.jsxs(L,{children:[e.jsx(Z,{open:t,header:o("entities.addNewSSNNumber"),children:e.jsx(Te,{}),onClose:c,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>p(fe(s)),isLoading:n,hasCloseIconButton:!0}),f&&(l!=null&&l.data.message)?e.jsx(M,{open:d,onClose:()=>u({type:N.openSuccessSnackbar,payload:!1}),severity:"success",content:l==null?void 0:l.data.message}):"",b&&((j=(x=h==null?void 0:h.response)==null?void 0:x.data)!=null&&j.message)?e.jsx(M,{open:i,onClose:()=>u({type:N.openErrorSnackbar,payload:!1}),severity:"error",content:(B=(C=h==null?void 0:h.response)==null?void 0:C.data)==null?void 0:B.message}):""]})},pe=[{name:"packageName",required:!0,type:S.input,gridWidth:12,condition:!1}],Ae=()=>{const{t:a}=F(),{state:{addPackageForm:t},dispatch:c}=$(),o=(i,r,m)=>(u,p)=>{switch(r){case S.input:const{value:n}=u==null?void 0:u.target;let l=n;m?l.match(m)&&c({type:y.addPackageForm,payload:{name:i,fieldValue:l}}):c({type:y.addPackageForm,payload:{name:i,fieldValue:l}});break;case S.checkbox:c({type:y.addPackageForm,payload:{name:i,fieldValue:p}});break;case S.datepicker:c({type:y.addPackageForm,payload:{name:i,fieldValue:u}});break;case S.dynamicInputs:c({type:y.addPackageForm,payload:{name:i,fieldValue:u}});break}},s=()=>console.log("Submitted"),d=i=>{const{name:r,type:m,gridClassName:u,formFieldClassName:p,gridWidth:n,size:l,subfieldName:h,format:f,required:b}=i;switch(m){case S.checkbox:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(U,{required:b,control:e.jsx(X,{className:p,name:r,size:l??"small",checked:t[r],onChange:o(r,m)}),label:a(`entities.${r}`)})},r);case S.input:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(ee,{required:b,fullWidth:!0,className:p,size:l??"small",label:a(`entities.${r}`),name:r,value:t[r],onChange:o(r,m,f)})},r);case S.datepicker:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(G,{dateAdapter:H,children:e.jsx(J,{localeText:{clearButtonLabel:a("clear")},label:a(`entities.${r}`),value:t[r],className:p,slotProps:{textField:{size:"small",fullWidth:!0,required:b},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:o(r,m)})})},r);case S.dynamicInputs:return e.jsx(k,{className:u,item:!0,xs:n||12,children:e.jsx(K,{limit:r==="phoneNumbers"?4:2,label:a(`entities.${r}`),inputProps:{label:a(`entities.${h}`),size:"small",fullWidth:!0},values:t[r],onValuesChange:o(r,m)})},r);default:return""}};return e.jsx(L,{children:e.jsx(_,{children:e.jsx("form",{onSubmit:s,children:e.jsx(k,{container:!0,spacing:2,children:pe.map(i=>d(i))})})})})},ze=async a=>{let t;return t=await O({method:"post",url:"api/packages",data:a,withCredentials:!0}),t},qe=(a,t)=>{const c=A();return z(o=>ze(o),{onSuccess:o=>(o.data.error||(t({type:y.resetPackageFormData}),t({type:y.openSuccessSnackbar,payload:!0}),a(),c.invalidateQueries({queryKey:["packagesList"]})),o.data.message),onError:o=>{var s,d;return console.error(o),t({type:y.openErrorSnackbar,payload:!0}),{error:o,message:((d=(s=o==null?void 0:o.response)==null?void 0:s.data)==null?void 0:d.message)||"Error has occured"}}})},Ve=a=>{var x,j,C,B;const{open:t,onClose:c}=a,{t:o}=F(),{state:{addPackageForm:s,openSuccessSnackbar:d,openErrorSnackbar:i,addPackageModalOpen:r,editPackageModalOpen:m},dispatch:u}=$(),{mutate:p,isLoading:n,data:l,error:h,isSuccess:f,isError:b,reset:g}=qe(c,u);return w.useEffect(()=>{(r||m)&&f&&g()},[r,m]),e.jsxs(L,{children:[e.jsx(Z,{open:t,header:o("entities.addNewPackage"),children:e.jsx(Ae,{}),onClose:c,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>p(Me(s)),isLoading:n,hasCloseIconButton:!0}),f&&(l!=null&&l.data.message)?e.jsx(M,{open:d,onClose:()=>u({type:y.openSuccessSnackbar,payload:!1}),severity:"success",content:l==null?void 0:l.data.message}):"",b&&((j=(x=h==null?void 0:h.response)==null?void 0:x.data)!=null&&j.message)?e.jsx(M,{open:i,onClose:()=>u({type:y.openErrorSnackbar,payload:!1}),severity:"error",content:(B=(C=h==null?void 0:h.response)==null?void 0:C.data)==null?void 0:B.message}):""]})},We=async(a,t)=>{let c;return c=await O({method:"patch",url:`api/package/${a}`,data:t,withCredentials:!0}),c},ve=(a,t,c)=>{const o=A();return z(s=>We(c,s),{onSuccess:s=>(s.data.error||(t({type:y.resetPackageFormData}),t({type:y.openSuccessSnackbar,payload:!0}),a(),o.invalidateQueries({queryKey:["packagesList"]}),o.invalidateQueries({queryKey:["package"]})),s.data.message),onError:s=>{var d,i,r,m;return console.error(s),(i=(d=s==null?void 0:s.response)==null?void 0:d.data)!=null&&i.message&&t({type:y.openErrorSnackbar,payload:!0}),{error:s,message:((m=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:m.message)||"Error has occured"}}})},Re=async a=>{let t;if(a){try{t=await O({method:"get",url:`api/package/${a}`,withCredentials:!0})}catch{t={data:{error:500,message:"errors.serverError"}}}return t}return{data:{error:400,message:"errors.notFound"}}},Ye=a=>Q(["package",a],()=>Re(a),{keepPreviousData:!1,refetchOnMount:!0,refetchOnWindowFocus:!1,select(t){if(t.data.data)return we(t.data.data)}}),Ie=()=>{const{t:a}=F(),{state:{editPackageForm:t,editPackageId:c},dispatch:o}=$(),{data:s,isLoading:d,isSuccess:i}=Ye(c);w.useEffect(()=>{i&&(s!=null&&s.packageName)&&o({type:y.setPackageFormData,payload:s})},[s==null?void 0:s.packageName]);const r=(p,n,l)=>(h,f)=>{switch(n){case S.input:const{value:b}=h==null?void 0:h.target;let g=b;l?g.match(l)&&o({type:y.editPackageForm,payload:{editName:p,fieldEditValue:g}}):o({type:y.editPackageForm,payload:{editName:p,fieldEditValue:g}});break;case S.checkbox:o({type:y.editPackageForm,payload:{editName:p,fieldEditValue:f}});break;case S.datepicker:o({type:y.editPackageForm,payload:{editName:p,fieldEditValue:h}});break;case S.dynamicInputs:o({type:y.editPackageForm,payload:{editName:p,fieldEditValue:h}});break}},m=()=>console.log("Submitted"),u=p=>{const{name:n,type:l,gridClassName:h,formFieldClassName:f,gridWidth:b,size:g,subfieldName:x,format:j,required:C}=p;switch(l){case S.checkbox:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(U,{required:C,control:e.jsx(X,{className:f,name:n,size:g??"small",checked:t[n],onChange:r(n,l)}),label:a(`entities.${n}`)})},n);case S.input:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(ee,{required:C,fullWidth:!0,className:f,size:g??"small",label:a(`entities.${n}`),name:n,value:t[n],onChange:r(n,l,j)})},n);case S.datepicker:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(G,{dateAdapter:H,children:e.jsx(J,{localeText:{clearButtonLabel:a("clear")},label:a(`entities.${n}`),value:t[n],className:f,slotProps:{textField:{size:"small",fullWidth:!0,required:C},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:r(n,l)})})},n);case S.dynamicInputs:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(K,{limit:n==="phoneNumbers"?4:2,label:a(`entities.${n}`),inputProps:{label:a(`entities.${x}`),size:"small",fullWidth:!0},values:t[n],onValuesChange:r(n,l)})},n);default:return""}};return d?e.jsx(T,{className:"flex justify-center items-center h-[300px]",children:e.jsx(ae,{})}):e.jsx(L,{children:e.jsx(_,{children:e.jsx("form",{onSubmit:m,children:e.jsx(k,{container:!0,spacing:2,children:pe.map(p=>u(p))})})})})},Qe=async a=>{let t;return t=await O({method:"delete",url:`api/package/${a}`,withCredentials:!0}),t},_e=(a,t,c)=>{const o=A();return z(()=>Qe(c),{onSuccess:s=>(s.data.error||(t({type:y.resetPackageFormData}),t({type:y.openSuccessSnackbar,payload:!0}),a(),o.invalidateQueries({queryKey:["packagesList"]})),s.data.message),onError:s=>{var d,i,r,m;return console.error(s),(i=(d=s==null?void 0:s.response)==null?void 0:d.data)!=null&&i.message&&t({type:y.openErrorSnackbar,payload:!0}),{error:s,message:((m=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:m.message)||"Error has occured"}}})},Ke=a=>{var V,W,v,R;const{open:t,onClose:c}=a,{t:o}=F(),{state:{editedPackageFormData:s,editPackageId:d,confirmationDialogOpen:i,openSuccessSnackbar:r,openErrorSnackbar:m,addPackageModalOpen:u,editPackageModalOpen:p},dispatch:n}=$(),l=()=>{n({type:y.confirmationDialogOpen,payload:!1}),c()},{mutate:h,isLoading:f,data:b,error:g,isSuccess:x,isError:j,reset:C}=ve(c,n,d),{mutate:B,isLoading:se,data:E,error:te,isSuccess:q,isError:re,reset:ne}=_e(l,n,d);w.useEffect(()=>{(u||p)&&(x&&C(),q&&ne())},[u,p]);const oe=j||re,P=g||te;return e.jsxs(L,{children:[e.jsx(Z,{open:t,header:o("entities.editPackage"),children:e.jsx(Ie,{}),onClose:c,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>h(Oe(s)),isLoading:f,hasCloseIconButton:!0,extraButtonText:"delete",hasExtraButton:!0,onExtraButtonClick:()=>n({type:y.confirmationDialogOpen,payload:!i})}),e.jsx(ue,{title:"entities.deletePackage",isLoading:se,open:i,onClose:()=>l(),onSubmit:()=>B()}),x&&(b!=null&&b.data.message)?e.jsx(M,{open:r,onClose:()=>n({type:y.openSuccessSnackbar,payload:!1}),severity:"success",content:b==null?void 0:b.data.message}):"",q&&(E!=null&&E.data.message)?e.jsx(M,{open:r,onClose:()=>n({type:y.openSuccessSnackbar,payload:!1}),severity:"success",content:E==null?void 0:E.data.message}):"",oe&&((W=(V=P==null?void 0:P.response)==null?void 0:V.data)!=null&&W.message)?e.jsx(M,{open:m,onClose:()=>n({type:y.openErrorSnackbar,payload:!1}),severity:"error",content:(R=(v=P==null?void 0:P.response)==null?void 0:v.data)==null?void 0:R.message}):""]})},Ge=async(a,t)=>{let c;return c=await O({method:"patch",url:`api/ssn/${a}`,data:t,withCredentials:!0}),c},He=(a,t,c)=>{const o=A();return z(s=>Ge(c,s),{onSuccess:s=>(s.data.error||(t({type:N.resetSSNNumberFormData}),t({type:N.openSuccessSnackbar,payload:!0}),a(),o.invalidateQueries({queryKey:["ssnNumbersList"]}),o.invalidateQueries({queryKey:["ssnNumber"]})),s.data.message),onError:s=>{var d,i,r,m;return console.error(s),(i=(d=s==null?void 0:s.response)==null?void 0:d.data)!=null&&i.message&&t({type:N.openErrorSnackbar,payload:!0}),{error:s,message:((m=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:m.message)||"Error has occured"}}})},Je=async a=>{let t;if(a){try{t=await O({method:"get",url:`api/ssn/${a}`,withCredentials:!0})}catch{t={data:{error:500,message:"errors.serverError"}}}return t}return{data:{error:400,message:"errors.notFound"}}},Ue=a=>Q(["ssnNumber",a],()=>Je(a),{keepPreviousData:!1,refetchOnMount:!0,refetchOnWindowFocus:!1,select(t){if(t.data.data)return xe(t.data.data)}}),Xe=()=>{const{t:a}=F(),{state:{editSSNNumberForm:t,editSSNNumberId:c},dispatch:o}=D(),{data:s,isLoading:d,isSuccess:i}=Ue(c);w.useEffect(()=>{i&&(s!=null&&s.ssnNumber)&&o({type:N.setSSNNumberFormData,payload:s})},[s==null?void 0:s.ssnNumber]);const r=(p,n,l)=>(h,f)=>{switch(n){case S.input:const{value:b}=h==null?void 0:h.target;let g=b;l?g.match(l)&&o({type:N.editSSNNumberForm,payload:{editName:p,fieldEditValue:g}}):o({type:N.editSSNNumberForm,payload:{editName:p,fieldEditValue:g}});break;case S.checkbox:o({type:N.editSSNNumberForm,payload:{editName:p,fieldEditValue:f}});break;case S.datepicker:o({type:N.editSSNNumberForm,payload:{editName:p,fieldEditValue:h}});break;case S.dynamicInputs:o({type:N.editSSNNumberForm,payload:{editName:p,fieldEditValue:h}});break}},m=()=>console.log("Submitted"),u=p=>{const{name:n,type:l,gridClassName:h,formFieldClassName:f,gridWidth:b,size:g,subfieldName:x,format:j,required:C}=p;switch(l){case S.checkbox:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(U,{required:C,control:e.jsx(X,{className:f,name:n,size:g??"small",checked:t[n],onChange:r(n,l)}),label:a(`entities.${n}`)})},n);case S.input:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(ee,{required:C,fullWidth:!0,className:f,size:g??"small",label:a(`entities.${n}`),name:n,value:t[n],onChange:r(n,l,j)})},n);case S.datepicker:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(G,{dateAdapter:H,children:e.jsx(J,{localeText:{clearButtonLabel:a("clear")},label:a(`entities.${n}`),value:t[n],className:f,slotProps:{textField:{size:"small",fullWidth:!0,required:C},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:r(n,l)})})},n);case S.dynamicInputs:return e.jsx(k,{className:h,item:!0,xs:b||12,children:e.jsx(K,{limit:n==="phoneNumbers"?4:2,label:a(`entities.${n}`),inputProps:{label:a(`entities.${x}`),size:"small",fullWidth:!0},values:t[n],onValuesChange:r(n,l)})},n);default:return""}};return d?e.jsx(T,{className:"flex justify-center items-center h-[300px]",children:e.jsx(ae,{})}):e.jsx(L,{children:e.jsx(_,{children:e.jsx("form",{onSubmit:m,children:e.jsx(k,{container:!0,spacing:2,children:me.map(p=>u(p))})})})})},Ze=async a=>{let t;return t=await O({method:"delete",url:`api/ssn/${a}`,withCredentials:!0}),t},ea=(a,t,c)=>{const o=A();return z(()=>Ze(c),{onSuccess:s=>(s.data.error||(t({type:N.resetSSNNumberFormData}),t({type:N.openSuccessSnackbar,payload:!0}),a(),o.invalidateQueries({queryKey:["ssnNumbersList"]})),s.data.message),onError:s=>{var d,i,r,m;return console.error(s),(i=(d=s==null?void 0:s.response)==null?void 0:d.data)!=null&&i.message&&t({type:N.openErrorSnackbar,payload:!0}),{error:s,message:((m=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:m.message)||"Error has occured"}}})},aa=a=>{var V,W,v,R;const{open:t,onClose:c}=a,{t:o}=F(),{state:{editedSSNNumberFormData:s,editSSNNumberId:d,confirmationDialogOpen:i,openSuccessSnackbar:r,openErrorSnackbar:m,addSSNNumberModalOpen:u,editSSNNumberModalOpen:p},dispatch:n}=D(),l=()=>{n({type:N.confirmationDialogOpen,payload:!1}),c()},{mutate:h,isLoading:f,data:b,error:g,isSuccess:x,isError:j,reset:C}=He(c,n,d),{mutate:B,isLoading:se,data:E,error:te,isSuccess:q,isError:re,reset:ne}=ea(l,n,d);w.useEffect(()=>{(u||p)&&(x&&C(),q&&ne())},[u,p]);const oe=j||re,P=g||te;return e.jsxs(L,{children:[e.jsx(Z,{open:t,header:o("entities.editSSNNumber"),children:e.jsx(Xe,{}),onClose:c,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>h(ke(s)),isLoading:f,hasCloseIconButton:!0,extraButtonText:"delete",hasExtraButton:!0,onExtraButtonClick:()=>n({type:N.confirmationDialogOpen,payload:!i})}),e.jsx(ue,{title:"entities.deleteSSNNumber",isLoading:se,open:i,onClose:()=>l(),onSubmit:()=>B()}),x&&(b!=null&&b.data.message)?e.jsx(M,{open:r,onClose:()=>n({type:N.openSuccessSnackbar,payload:!1}),severity:"success",content:b==null?void 0:b.data.message}):"",q&&(E!=null&&E.data.message)?e.jsx(M,{open:r,onClose:()=>n({type:N.openSuccessSnackbar,payload:!1}),severity:"success",content:E==null?void 0:E.data.message}):"",oe&&((W=(V=P==null?void 0:P.response)==null?void 0:V.data)!=null&&W.message)?e.jsx(M,{open:m,onClose:()=>n({type:N.openErrorSnackbar,payload:!1}),severity:"error",content:(R=(v=P==null?void 0:P.response)==null?void 0:v.data)==null?void 0:R.message}):""]})},oa=a=>{const{t}=F(),{state:{addSSNNumberModalOpen:c,editSSNNumberModalOpen:o},dispatch:s}=D(),{state:{addPackageModalOpen:d,editPackageModalOpen:i},dispatch:r}=$(),{dispatch:m}=he(),u=()=>{s({type:N.addSSNNumberModalOpen,payload:!1}),s({type:N.resetSSNNumberFormData})},p=()=>{s({type:N.editSSNNumberModalOpen,payload:!1}),s({type:N.resetSSNNumberFormData})},n=()=>{r({type:y.addPackageModalOpen,payload:!1}),r({type:y.resetPackageFormData})},l=()=>{r({type:y.editPackageModalOpen,payload:!1}),r({type:y.resetPackageFormData})};return w.useEffect(()=>{m({type:be.resetTransactionStates})},[]),e.jsx(L,{children:e.jsxs(w.Suspense,{fallback:"Loading....",children:[e.jsxs(T,{className:"flex flex-col lg:flex-row gap-4",children:[e.jsxs(T,{className:"w-full",children:[e.jsx(T,{className:"my-2 flex justify-end",children:e.jsx(ce,{onClick:()=>s({type:N.addSSNNumberModalOpen,payload:!c}),children:t("entities.addNewSSNNumber")})}),e.jsx(je,{})]}),e.jsxs(T,{className:"w-full",children:[e.jsx(T,{className:"my-2 flex justify-end",children:e.jsx(ce,{onClick:()=>r({type:y.addPackageModalOpen,payload:!d}),children:t("entities.addNewPackage")})}),e.jsx(Be,{})]})]}),e.jsx($e,{open:c,onClose:u}),e.jsx(aa,{open:o,onClose:p}),e.jsx(Ve,{open:d,onClose:n}),e.jsx(Ke,{open:i,onClose:l})]})})};export{oa as SSNNumbersAndPackages};