import{v as xe,G as V,K as P,a as L,F as $,r as W,J as i,j as t,B as Y,y as S,c as A,z as Q,A as G,C as H,H as Te}from"./index-0fc86f99.js";import{u as U,a as J,c as Ce,t as X,r as je,m as ie,T as Se,C as ce,G as D,L as Z,b as ee,e as ae,d as le,F as de,f as pe,M as ue,D as Fe,g as Ee}from"./ConfirmationDialog-9583af2c.js";import{s as B,T as R,u as I,a as O,B as K}from"./SnackbarNotification-fe22749b.js";import{C as me}from"./CircularProgress-9f706af9.js";import{A as ye}from"./Autocomplete-98c931ae.js";import{F as Ne,I as we,b as ke,E as De,a as re}from"./FileUpload-97b49c30.js";const ve=({id:s,first_name:e,last_name:o,name:a,amount:n,case_number:r,excerpt_number:p,payment_date:l,posting_method:y,type:j})=>({id:s,debtorsName:a?U(a):`${e?U(e):""} ${o?U(o):""}`,amount:n,caseNumber:r,excerptNumber:p,paymentDate:l,postingMethod:y,displayType:xe.t(`entities.${j}`),type:j}),Le=async s=>{var l;const{sortBy:e="created_at",sort:o="desc",page:a=1,size:n=25,filter:r="payment"}=s;let p;try{p=await B({method:"get",url:"api/transactions-list",params:{...s,sortBy:e===""?"created_at":Ce(e),sort:o===""?"asc":o,page:a,size:n,filter:r===V.all?"":r},withCredentials:!0}),(l=p.data.data)!=null&&l.transactions&&(p.data.data.transactions=p.data.data.transactions.map(y=>ve(y)))}catch{p={data:{error:500,message:"Connection problem"}}}return p},$e=s=>J(["transactionsList",s],()=>Le(s),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),Me=s=>{switch(s){case P.payment:return"#93c5fd";case P.fee:return"#fde047";case P.legal_fee:return"#f97316";case P.withdrawal:return"#22C55E";default:return"#6b7280"}},_=s=>{const{id:e,case_number:o,type:a,first_name:n,last_name:r,name:p}=s;let l="";return p&&(l=p),o&&(l=`${o} ${n?`- (${n} ${r})`:p?`- (${p})`:""}`),a&&(l=a),{id:e,name:l}},Oe=({amount:s,caseNumber:e,type:o,paymentDate:a,postingMethod:n})=>{let r="",p=null,l="";return typeof e!="string"&&(r=e.name.split(" ")[0]),a&&(p=X(a)),typeof o!="string"&&(l=o.name),{amount:Number(s),case_number:r,payment_date:p,posting_method:n||null,type:l}},Ae=({amount:s,case:{id:e,case_number:o,first_name:a,last_name:n,name:r},payment_date:p,posting_method:l,type:y})=>{const x=[{id:1,type:"fee"},{id:2,type:"legal_fee"},{id:3,type:"payment"},{id:4,type:"withdrawal"}].find(c=>c.type===y);return{amount:String(s),caseNumber:{id:e,name:`${o} ${a?`- (${a} ${n})`:r?`- (${r})`:""}`},type:x,paymentDate:p?je(p):null,postingMethod:l}},Be=({amount:s,caseNumber:e,paymentDate:o,postingMethod:a,type:n})=>{const r={};return s!==void 0&&(r.amount=Number(s)||null),e!==void 0&&(typeof e!="string"?r.case_id=e.id||null:e===""&&(r.case_id=null)),o!==void 0&&(r.payment_date=o?X(o):null),a!==void 0&&(r.posting_method=a||null),n!==void 0&&(typeof n!="string"?r.type=n.name||null:n===""&&(r.type=null)),r},v={debtorsName:"debtorsName",displayType:"type",amount:"amount",postingMethod:"postingMethod",paymentDate:"paymentDate",caseNumber:"caseNumber",excerptNumber:"excerptNumber"},Ve=()=>{var u,h,C;const{t:s}=L(),{state:{sortable:{sort:e,sortBy:o},pageable:{page:a,size:n},searchable:r,filterable:p,filterableDate:l},dispatch:y}=$();let j={page:a,size:n,sort:e,sortBy:o};const x=r.reduce((d,T)=>{const F=ie(T);return{...d,...F}},{}),{data:c,isLoading:m,refetch:f}=$e({...j,...x,filter:p,filterableDate:l?X(l):null}),g=d=>{const{id:T}=d.original;T&&(y({type:i.editTransactionId,payload:T}),y({type:i.editTransactionModalOpen,payload:!0}))};W.useEffect(()=>{var d;y({type:i.totalAmount,payload:(d=c==null?void 0:c.data.data)==null?void 0:d.total_amount})},[(u=c==null?void 0:c.data.data)==null?void 0:u.total_amount]);const b=W.useMemo(()=>[{accessorFn:d=>d.debtorsName,id:v.debtorsName,header:()=>t.jsx("span",{children:s(`entities.${[v.debtorsName]}`)}),cell:d=>d.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:d=>d.caseNumber,id:v.caseNumber,header:()=>t.jsx("span",{children:s(`entities.${[v.caseNumber]}`)}),cell:d=>d.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:d=>d.amount,id:v.amount,header:()=>t.jsx("span",{children:s(`entities.${[v.amount]}`)}),cell:d=>d.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:d=>d.displayType,id:v.displayType,header:()=>t.jsx("span",{children:s(`entities.${[v.displayType]}`)}),cell:d=>d.getValue(),isSortable:!0},{accessorFn:d=>d.paymentDate,id:v.paymentDate,header:()=>t.jsx("span",{children:s(`entities.${[v.paymentDate]}`)}),cell:d=>d.getValue(),isSortable:!0}],[]);return m?t.jsx(Y,{className:"flex justify-center items-center h-[80vh]",children:t.jsx(me,{})}):t.jsx(Se,{columns:b,data:(h=c==null?void 0:c.data.data)==null?void 0:h.transactions,hasSearch:!0,sort:e,sortBy:o,totalNumber:(C=c==null?void 0:c.data.data)==null?void 0:C.meta.total_number,page:a,size:n,borderKeyword:"type",updateState:y,refetch:f,mapBorderColors:Me,onRowClick:g})},he=({caseNumberWithNameOptions:s,transactionTypeOptions:e})=>[{name:"caseNumber",required:!0,type:S.autocomplete,gridWidth:6,options:s},{name:"type",required:!0,type:S.autocomplete,gridWidth:6,options:e},{name:"amount",required:!0,type:S.input,gridWidth:6,condition:!1,format:/^[\d 0-9.]{0,24}$/},{name:"paymentDate",required:!0,type:S.datepicker,gridWidth:6,condition:!1}],We=async s=>{let e;try{e=await B({method:"get",url:"api/filter-case-numbers",params:{...s},withCredentials:!0})}catch{e={data:{error:500,message:"Connection problem"}}}return e},fe=s=>J(["caseNumbersWithNames",s],()=>We(s),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1,select(e){return e.data.data}}),qe=()=>{const{t:s}=L(),{state:{addTransactionForm:e,addTransactionAutocompleteValues:o},dispatch:a}=$(),{data:n,isFetching:r}=fe({search:o.caseNumber}),p=[{id:1,type:"fee"},{id:2,type:"legal_fee"},{id:3,type:"payment"},{id:4,type:"withdrawal"}],l=(x,c,m)=>(f,g)=>{switch(c){case S.toggle:a({type:i.addTransactionForm,payload:{name:x,fieldValue:g}});break;case S.input:const{value:b}=f==null?void 0:f.target;let u=b;m?u.match(m)&&a({type:i.addTransactionForm,payload:{name:x,fieldValue:u}}):a({type:i.addTransactionForm,payload:{name:x,fieldValue:u}});break;case S.checkbox:a({type:i.addTransactionForm,payload:{name:x,fieldValue:g}});break;case S.datepicker:a({type:i.addTransactionForm,payload:{name:x,fieldValue:f}});break;case S.autocomplete:a({type:i.addTransactionForm,payload:{name:x,fieldValue:g?_(g):""}});break}},y=()=>console.log("Submitted"),j=x=>{const{name:c,type:m,gridClassName:f,formFieldClassName:g,gridWidth:b,options:u,size:h,format:C,required:d}=x;switch(m){case S.checkbox:return t.jsx(D,{className:f,item:!0,xs:b||12,children:t.jsx(de,{required:d,control:t.jsx(pe,{className:g,name:c,size:h??"small",checked:e[c],onChange:l(c,m)}),label:s(`entities.${c}`)})},c);case S.input:return t.jsx(D,{className:f,item:!0,xs:b||12,children:t.jsx(R,{required:d,fullWidth:!0,className:g,size:h??"small",label:s(`entities.${c}`),name:c,value:e[c],onChange:l(c,m,C)})},c);case S.autocomplete:return t.jsx(D,{className:f,item:!0,xs:b||12,children:t.jsx(ye,{fullWidth:!0,clearIcon:!1,className:g,options:r?[]:u||[],getOptionLabel:T=>c==="type"&&T?s(`entities.${_(T).name}`):_(T).name,size:h??"small",value:e[c],onChange:l(c,m),renderInput:T=>t.jsx(R,{...T,required:d,label:s(`entities.${c}`),onBlur:()=>a({type:i.addTransactionAutocompleteValues,payload:{inputName:c,inputValue:""}}),onChange:le(F=>a({type:i.addTransactionAutocompleteValues,payload:{inputName:c,inputValue:F.target.value}}),300)})})},c);case S.datepicker:return t.jsx(D,{className:f,item:!0,xs:b||12,children:t.jsx(Z,{dateAdapter:ee,children:t.jsx(ae,{localeText:{clearButtonLabel:s("clear")},label:s(`entities.${c}`),value:e[c],className:g,slotProps:{textField:{size:"small",fullWidth:!0,required:d},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:l(c,m)})})},c);default:return""}};return t.jsx(A,{children:t.jsx(ce,{children:t.jsx("form",{onSubmit:y,children:t.jsx(D,{container:!0,spacing:2,children:he({caseNumberWithNameOptions:n,transactionTypeOptions:p}).map(x=>j(x))})})})})},_e=async s=>{let e;return e=await B({method:"post",url:"api/transactions",data:s,withCredentials:!0}),e},ze=(s,e)=>{const o=Q();return I(a=>_e(a),{onSuccess:a=>(a.data.error||(e({type:i.resetTransactionFormData}),e({type:i.openSuccessSnackbar,payload:!0}),s(),o.invalidateQueries({queryKey:["transactionsList"]})),a.data.message),onError:a=>{var n,r;return console.error(a),e({type:i.openErrorSnackbar,payload:!0}),{error:a,message:((r=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:r.message)||"Error has occured"}}})},Ye=s=>{var C,d,T,F;const{open:e,onClose:o}=s,{t:a}=L(),{state:{addTransactionForm:n,openSuccessSnackbar:r,openErrorSnackbar:p,addTransactionModalOpen:l,editTransactionModalOpen:y,importTransactionsDialogOpen:j},dispatch:x}=$(),{mutate:c,isLoading:m,data:f,error:g,isSuccess:b,isError:u,reset:h}=ze(o,x);return W.useEffect(()=>{(l||y||j)&&b&&h()},[l,y,j]),t.jsxs(A,{children:[t.jsx(ue,{open:e,header:a("entities.addNewTransaction"),children:t.jsx(qe,{}),onClose:o,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>c(Oe(n)),isLoading:m,hasCloseIconButton:!0}),b&&(f!=null&&f.data.message)?t.jsx(O,{open:r,onClose:()=>x({type:i.openSuccessSnackbar,payload:!1}),severity:"success",content:f==null?void 0:f.data.message}):"",u&&((d=(C=g==null?void 0:g.response)==null?void 0:C.data)!=null&&d.message)?t.jsx(O,{open:p,onClose:()=>x({type:i.openErrorSnackbar,payload:!1}),severity:"error",content:(F=(T=g==null?void 0:g.response)==null?void 0:T.data)==null?void 0:F.message}):""]})},Ie=()=>{const{state:{filterable:s,pageable:e},dispatch:o}=$(),{t:a}=L(),n=[{id:1,label:a("all"),value:V.all},{id:2,label:a("entities.payments"),value:V.payment},{id:3,label:a("entities.fees"),value:V.fee},{id:4,label:a("entities.legal_fees"),value:V.legal_fee},{id:5,label:a("entities.withdrawals"),value:V.withdrawal}],r=p=>{o({type:G.filterable,payload:p}),o({type:G.pageable,payload:{...e,page:1}})};return t.jsx(A,{children:t.jsx(Ne,{label:a("entities.transactionType"),size:"small",options:n,value:s,onChange:r})})},Pe=async(s,e)=>{let o;return o=await B({method:"patch",url:`api/transaction/${s}`,data:e,withCredentials:!0}),o},Re=(s,e,o)=>{const a=Q();return I(n=>Pe(o,n),{onSuccess:n=>(n.data.error||(e({type:i.resetTransactionFormData}),e({type:i.openSuccessSnackbar,payload:!0}),s(),a.invalidateQueries({queryKey:["transactionsList"]}),a.invalidateQueries({queryKey:["transaction"]})),n.data.message),onError:n=>{var r,p,l,y;return console.error(n),(p=(r=n==null?void 0:n.response)==null?void 0:r.data)!=null&&p.message&&e({type:i.openErrorSnackbar,payload:!0}),{error:n,message:((y=(l=n==null?void 0:n.response)==null?void 0:l.data)==null?void 0:y.message)||"Error has occured"}}})},Qe=async s=>{let e;if(s){try{e=await B({method:"get",url:`api/transaction/${s}`,withCredentials:!0})}catch{e={data:{error:500,message:"errors.serverError"}}}return e}return{data:{error:400,message:"errors.notFound"}}},Ue=s=>J(["transaction",s],()=>Qe(s),{keepPreviousData:!1,refetchOnMount:!0,refetchOnWindowFocus:!1,select(e){if(e.data.data)return Ae(e.data.data)}}),Ke=()=>{const{t:s}=L(),{role:e}=H(),{state:{editTransactionForm:o,editTransactionId:a,editTransactionAutocompleteValues:n},dispatch:r}=$(),{data:p,isFetching:l}=fe({search:n.caseNumber}),y=[{id:1,type:"fee"},{id:2,type:"legal_fee"},{id:3,type:"payment"},{id:4,type:"withdrawal"}],{data:j,isLoading:x,isSuccess:c}=Ue(a);W.useEffect(()=>{c&&(j!=null&&j.caseNumber)&&r({type:i.setTransactionFormData,payload:j})},[j==null?void 0:j.caseNumber]);const m=(b,u,h)=>(C,d)=>{switch(u){case S.input:const{value:T}=C==null?void 0:C.target;let F=T;h?F.match(h)&&r({type:i.editTransactionForm,payload:{editName:b,fieldEditValue:F}}):r({type:i.editTransactionForm,payload:{editName:b,fieldEditValue:F}});break;case S.checkbox:r({type:i.editTransactionForm,payload:{editName:b,fieldEditValue:d}});break;case S.datepicker:r({type:i.editTransactionForm,payload:{editName:b,fieldEditValue:C}});break;case S.autocomplete:r({type:i.editTransactionForm,payload:{editName:b,fieldEditValue:d?_(d):""}});break;case S.dynamicInputs:r({type:i.editTransactionForm,payload:{editName:b,fieldEditValue:C}});break}},f=()=>console.log("Submitted"),g=b=>{const{name:u,type:h,gridClassName:C,formFieldClassName:d,gridWidth:T,size:F,subfieldName:M,format:w,options:E,required:N}=b;switch(h){case S.checkbox:return t.jsx(D,{className:C,item:!0,xs:T||12,children:t.jsx(de,{required:N,control:t.jsx(pe,{disabled:(e==null?void 0:e.toLowerCase())==="visitor",className:d,name:u,size:F??"small",checked:o[u],onChange:m(u,h)}),label:s(`entities.${u}`)})},u);case S.input:return t.jsx(D,{className:C,item:!0,xs:T||12,children:t.jsx(R,{disabled:(e==null?void 0:e.toLowerCase())==="visitor",required:N,fullWidth:!0,className:d,size:F??"small",label:s(`entities.${u}`),name:u,value:o[u],onChange:m(u,h,w)})},u);case S.autocomplete:return t.jsx(D,{className:C,item:!0,xs:T||12,children:t.jsx(ye,{disabled:(e==null?void 0:e.toLowerCase())==="visitor",fullWidth:!0,clearIcon:!1,className:d,options:l?[]:E||[],getOptionLabel:k=>u==="type"&&k?s(`entities.${_(k).name}`):_(k).name,size:F??"small",value:o[u],onChange:m(u,h),renderInput:k=>t.jsx(R,{...k,required:N,label:s(`entities.${u}`),onBlur:()=>r({type:i.editTransactionAutocompleteValues,payload:{inputName:u,inputValue:""}}),onChange:le(z=>r({type:i.editTransactionAutocompleteValues,payload:{inputName:u,inputValue:z.target.value}}),300)})})},u);case S.datepicker:return t.jsx(D,{className:C,item:!0,xs:T||12,children:t.jsx(Z,{dateAdapter:ee,children:t.jsx(ae,{disabled:(e==null?void 0:e.toLowerCase())==="visitor",localeText:{clearButtonLabel:s("clear")},label:s(`entities.${u}`),value:o[u],className:d,slotProps:{textField:{size:"small",fullWidth:!0,required:N},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:m(u,h)})})},u);case S.dynamicInputs:return t.jsx(D,{className:C,item:!0,xs:T||12,children:t.jsx(Fe,{limit:u==="phoneNumbers"?4:2,label:s(`entities.${u}`),inputProps:{label:s(`entities.${M}`),size:"small",fullWidth:!0},values:o[u],onValuesChange:m(u,h)})},u);default:return""}};return x?t.jsx(Y,{className:"flex justify-center items-center h-[300px]",children:t.jsx(me,{})}):t.jsx(A,{children:t.jsx(ce,{children:t.jsx("form",{onSubmit:f,children:t.jsx(D,{container:!0,spacing:2,children:he({caseNumberWithNameOptions:p,transactionTypeOptions:y}).map(b=>g(b))})})})})},Ge=async s=>{let e;return e=await B({method:"delete",url:`api/transaction/${s}`,withCredentials:!0}),e},He=(s,e,o)=>{const a=Q();return I(()=>Ge(o),{onSuccess:n=>(n.data.error||(e({type:i.resetTransactionFormData}),e({type:i.openSuccessSnackbar,payload:!0}),s(),a.invalidateQueries({queryKey:["transactionsList"]})),n.data.message),onError:n=>{var r,p,l,y;return console.error(n),(p=(r=n==null?void 0:n.response)==null?void 0:r.data)!=null&&p.message&&e({type:i.openErrorSnackbar,payload:!0}),{error:n,message:((y=(l=n==null?void 0:n.response)==null?void 0:l.data)==null?void 0:y.message)||"Error has occured"}}})},Je=s=>{var te,se,ne,oe;const{open:e,onClose:o}=s,{t:a}=L(),{role:n}=H(),{state:{editedTransactionFormData:r,editTransactionId:p,confirmationDialogOpen:l,openSuccessSnackbar:y,openErrorSnackbar:j,addTransactionModalOpen:x,editTransactionModalOpen:c,importTransactionsDialogOpen:m},dispatch:f}=$(),g=()=>{f({type:i.confirmationDialogOpen,payload:!1}),o()},{mutate:b,isLoading:u,data:h,error:C,isSuccess:d,isError:T,reset:F}=Re(o,f,p),{mutate:M,isLoading:w,data:E,error:N,isSuccess:k,isError:z,reset:be}=He(g,f,p);W.useEffect(()=>{(x||c||m)&&(d&&F(),k&&be())},[x,c,m]);const ge=T||z,q=C||N;return t.jsxs(A,{children:[t.jsx(ue,{open:e,header:(n==null?void 0:n.toLowerCase())!=="visitor"?a("entities.editTransaction"):a("entities.viewTransaction"),children:t.jsx(Ke,{}),onClose:o,hasActionButton:(n==null?void 0:n.toLowerCase())!=="visitor",actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>b(Be(r)),isLoading:u,hasCloseIconButton:!0,extraButtonText:"delete",hasExtraButton:(n==null?void 0:n.toLowerCase())!=="visitor",onExtraButtonClick:()=>f({type:i.confirmationDialogOpen,payload:!l})}),t.jsx(Ee,{title:"entities.deleteTransaction",isLoading:w,open:l,onClose:()=>g(),onSubmit:()=>M()}),d&&(h!=null&&h.data.message)?t.jsx(O,{open:y,onClose:()=>f({type:i.openSuccessSnackbar,payload:!1}),severity:"success",content:h==null?void 0:h.data.message}):"",k&&(E!=null&&E.data.message)?t.jsx(O,{open:y,onClose:()=>f({type:i.openSuccessSnackbar,payload:!1}),severity:"success",content:E==null?void 0:E.data.message}):"",ge&&((se=(te=q==null?void 0:q.response)==null?void 0:te.data)!=null&&se.message)?t.jsx(O,{open:j,onClose:()=>f({type:i.openErrorSnackbar,payload:!1}),severity:"error",content:(oe=(ne=q==null?void 0:q.response)==null?void 0:ne.data)==null?void 0:oe.message}):""]})},Xe=async s=>{let e;const o=new FormData;return o.append("file",s),e=await B({method:"post",url:"api/import-transactions-list",data:o,withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}}),e},Ze=(s,e)=>{const o=Q();return I(a=>Xe(a),{onSuccess:a=>(a.data.error||(e({type:i.openSuccessSnackbar,payload:!0}),e({type:i.resetTransactionFormData}),o.invalidateQueries({queryKey:["transactionsList"]}),setTimeout(()=>{s()},1500)),a.data.message),onError:a=>{var n,r,p,l;return console.error(a),(r=(n=a==null?void 0:a.response)==null?void 0:n.data)!=null&&r.message&&e({type:i.openErrorSnackbar,payload:!0}),{error:a,message:((l=(p=a==null?void 0:a.response)==null?void 0:p.data)==null?void 0:l.message)||"Error has occured"}}})},ea=s=>{var b,u,h,C,d,T,F,M;const{open:e,onClose:o}=s,{t:a}=L(),{state:{transactionsFileForUpload:n,openSuccessSnackbar:r,openErrorSnackbar:p},dispatch:l}=$(),y=w=>typeof w=="string"?w:w.map(E=>{const[N,k,z]=E.split("->");return`${a(N)} -> ${k} -> ${a(z)}`}).join(" "),{isLoading:j,mutateAsync:x,data:c,error:m,isError:f,isSuccess:g}=Ze(o,l);return t.jsxs(A,{children:[t.jsx(we,{title:"entities.importTransactions",open:e,onClose:o,uploadComponent:t.jsx(ke,{onFileUpload:w=>l({type:i.transactionsFileForUpload,payload:w}),onFileDelete:()=>l({type:i.resetTransactionFormData})}),isLoading:j,file:n,onSubmitFile:()=>n&&x(n)}),g&&(c!=null&&c.data.message)?t.jsx(O,{open:r,onClose:()=>l({type:i.openSuccessSnackbar,payload:!1}),severity:"success",content:c==null?void 0:c.data.message}):"",f&&((u=(b=m==null?void 0:m.response)==null?void 0:b.data)!=null&&u.message)?t.jsx(O,{open:p,onClose:()=>l({type:i.openErrorSnackbar,payload:!1}),severity:"error",content:y((C=(h=m==null?void 0:m.response)==null?void 0:h.data)==null?void 0:C.message),autoHideDuration:typeof((T=(d=m==null?void 0:m.response)==null?void 0:d.data)==null?void 0:T.message)!="string"?((M=(F=m==null?void 0:m.response)==null?void 0:F.data)==null?void 0:M.message.length)*3e3:3e3}):""]})},aa=()=>{const{state:{filterableDate:s,pageable:e},dispatch:o}=$(),{t:a}=L(),n=r=>{o({type:i.filterableDate,payload:r}),o({type:G.pageable,payload:{...e,page:1}})};return t.jsx(A,{children:t.jsx(Z,{dateAdapter:ee,children:t.jsx(ae,{localeText:{clearButtonLabel:a("clear")},label:a("entities.transactionsYoungerThan"),value:s,slotProps:{textField:{size:"small",fullWidth:!0},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:n})})})},ta=async s=>{const{filter:e="active"}=s;let o;if(o=await B({method:"post",url:"api/export-transactions-list",data:{...s,filter:e===V.all?"":e},withCredentials:!0}),!o.data.error){const a=o.data.data;if(a)if(typeof a=="object"&&a.type==="Buffer"&&Array.isArray(a.data)){const n=new Uint8Array(a.data);return new Blob([n])}else return new Blob([a])}},sa=s=>I(e=>ta(e),{onError:e=>{var o,a,n,r;return console.error(e),(a=(o=e==null?void 0:e.response)==null?void 0:o.data)!=null&&a.message&&s({type:i.openErrorSnackbar,payload:!0}),{error:e,message:((r=(n=e==null?void 0:e.response)==null?void 0:n.data)==null?void 0:r.message)||"Error has occured"}}}),na=s=>{var T,F,M,w;const{open:e,onClose:o}=s,{t:a}=L(),{state:{searchable:n,filterable:r,filterableDate:p,downloadFile:l,exportFileType:y,openSuccessSnackbar:j,openErrorSnackbar:x,totalAmount:c},dispatch:m}=$(),f=n.reduce((E,N)=>{const k=ie(N);return{...E,...k}},{}),{data:g,isLoading:b,mutateAsync:u,error:h,isSuccess:C,isError:d}=sa(m);return W.useEffect(()=>{if(!b&&g){const E=window.URL.createObjectURL(g),N=document.createElement("a");N.href=E,N.download=`${a("entities.transactions")} - ${Te().format("YYYY.MM.DD HH-mm")}${y==="excel"?".xlsx":".csv"}`,document.body.appendChild(N),N.click(),window.URL.revokeObjectURL(E),C&&(m({type:i.openSuccessSnackbar,payload:!0}),setTimeout(()=>{o()},1500))}},[b,g]),t.jsxs(A,{children:[t.jsx(De,{title:"entities.exportTransactions",open:e,onClose:o,exportCSVButton:t.jsx(re,{text:"exportCSV",isLoading:b,disabled:!c,onClick:async()=>{m({type:i.exportFileType,payload:"csv"}),m({type:i.downloadFile,payload:!0}),await u({...f,filter:r,filterableDate:p,fileType:"csv",downloadFile:l})}}),exportExcelButton:t.jsx(re,{text:"exportExcel",isLoading:b,disabled:!c,onClick:async()=>{m({type:i.exportFileType,payload:"excel"}),m({type:i.downloadFile,payload:!0}),await u({...f,filter:r,filterableDate:p,fileType:"excel",downloadFile:l})}})}),C&&g?t.jsx(O,{open:j,onClose:()=>m({type:i.openSuccessSnackbar,payload:!1}),severity:"success",content:"messages.fileExportSuccess"}):"",d&&((F=(T=h==null?void 0:h.response)==null?void 0:T.data)!=null&&F.message)?t.jsx(O,{open:x,onClose:()=>m({type:i.openErrorSnackbar,payload:!1}),severity:"error",content:(w=(M=h==null?void 0:h.response)==null?void 0:M.data)==null?void 0:w.message}):""]})},pa=s=>{const{t:e}=L(),{role:o}=H(),{state:{addTransactionModalOpen:a,editTransactionModalOpen:n,totalAmount:r,importTransactionsDialogOpen:p,exportTransactionsDialogOpen:l},dispatch:y}=$(),j=()=>{y({type:i.addTransactionModalOpen,payload:!1}),y({type:i.resetTransactionFormData})},x=()=>{y({type:i.editTransactionModalOpen,payload:!1}),y({type:i.resetTransactionFormData})},c=()=>{y({type:i.importTransactionsDialogOpen,payload:!1}),y({type:i.resetTransactionFormData})},m=()=>{y({type:i.exportTransactionsDialogOpen,payload:!1}),y({type:i.resetTransactionFormData})};return t.jsx(A,{children:t.jsxs(W.Suspense,{fallback:"Loading....",children:[t.jsxs(Y,{className:"my-2 flex justify-between items-baseline",children:[t.jsxs(t.Fragment,{children:[t.jsxs(Y,{className:"grid grid-flow-col gap-2",children:[t.jsx(Ie,{}),t.jsx(aa,{})]}),r?t.jsxs("span",{className:"text-sm",children:[e("entities.totalAmount"),": ",r]}):""]}),(o==null?void 0:o.toLowerCase())!=="visitor"?t.jsxs(Y,{children:[t.jsx(K,{color:"success",onClick:()=>y({type:i.importTransactionsDialogOpen,payload:!p}),children:e("entities.importTransactions")}),t.jsx(K,{color:"info",onClick:()=>y({type:i.exportTransactionsDialogOpen,payload:!l}),children:e("entities.exportTransactions")}),t.jsx(K,{onClick:()=>y({type:i.addTransactionModalOpen,payload:!a}),children:e("entities.addNewTransaction")})]}):""]}),t.jsx(Ve,{}),t.jsx(Ye,{open:a,onClose:j}),t.jsx(Je,{open:n,onClose:x}),p?t.jsx(ea,{open:p,onClose:c}):"",l?t.jsx(na,{open:l,onClose:m}):""]})})};export{pa as Transactions};
