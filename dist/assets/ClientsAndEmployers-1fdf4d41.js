import{a as g,a5 as w,r as O,j as e,a6 as k,x as p,E as F,a7 as f,y as L,a8 as j,B as E}from"./index-a59700e2.js";import{a as D,c as $,m as z,T as V,C as W,G as x,L as P,A as Y,b as I,F as Q,e as _,M as q}from"./AdapterMoment-1f717f9b.js";import{s as B,T as R,u as G,B as A}from"./setupAxios-41eb1db7.js";import{D as K}from"./DynamicInputs-fcabbf9d.js";const H=({case_count:a,client:s})=>({numberOfCases:a,client:s}),v=async a=>{var n;const{sortBy:s="created_at",sort:o="desc",page:r=1,size:c=25}=a;let i;try{i=await B({method:"get",url:"api/clients-list",params:{...a,sortBy:s===""?"created_at":$(s),sort:o===""?"asc":o,page:r,size:c},withCredentials:!0}),(n=i.data.data)!=null&&n.clients&&(i.data.data.clients=i.data.data.clients.map(t=>H(t)))}catch{i={data:{error:500,message:"Connection problem"}}}return i},J=a=>D(["clientsList",a],()=>v(a),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),U=()=>"#6b7280",X=({name:a})=>({name:a}),N={client:"client",numberOfCases:"numberOfCases"},Z=()=>{var b,C;const{t:a}=g(),{state:{sortable:{sort:s,sortBy:o},pageable:{page:r,size:c},searchable:i},dispatch:n}=w();let t={page:r,size:c,sort:s,sortBy:o};const d=i.reduce((m,T)=>{const M=z(T);return{...m,...M}},{}),{data:l,isLoading:h,refetch:u}=J({...t,...d}),y=O.useMemo(()=>[{accessorFn:m=>m.client,id:N.client,header:()=>e.jsx("span",{children:a(`entities.${[N.client]}`)}),cell:m=>m.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:m=>m.numberOfCases,id:N.numberOfCases,header:()=>e.jsx("span",{children:a(`entities.${[N.numberOfCases]}`)}),cell:m=>m.getValue(),isSortable:!0}],[]);return h?e.jsx(e.Fragment,{children:"Loading..."}):e.jsx(V,{columns:y,data:(b=l==null?void 0:l.data.data)==null?void 0:b.clients,hasSearch:!0,sort:s,sortBy:o,totalNumber:(C=l==null?void 0:l.data.data)==null?void 0:C.meta.total_number,page:r,size:c,borderKeyword:"type",updateState:n,refetch:u,mapBorderColors:U})},ee=({employees_count:a,employer:s})=>({numberOfEmployees:a,employer:s}),te=async a=>{var n;const{sortBy:s="created_at",sort:o="desc",page:r=1,size:c=25}=a;let i;try{i=await B({method:"get",url:"api/employers-list",params:{...a,sortBy:s===""?"created_at":$(s),sort:o===""?"asc":o,page:r,size:c},withCredentials:!0}),(n=i.data.data)!=null&&n.employers&&(i.data.data.employers=i.data.data.employers.map(t=>ee(t)))}catch{i={data:{error:500,message:"Connection problem"}}}return i},ae=a=>D(["employersList",a],()=>te(a),{keepPreviousData:!0,refetchOnMount:!1,refetchOnWindowFocus:!1}),se=()=>"#6b7280",re=({name:a})=>({name:a}),S={employer:"employer",numberOfEmployees:"numberOfEmployees"},oe=()=>{var b,C;const{t:a}=g(),{state:{sortable:{sort:s,sortBy:o},pageable:{page:r,size:c},searchable:i},dispatch:n}=k();let t={page:r,size:c,sort:s,sortBy:o};const d=i.reduce((m,T)=>{const M=z(T);return{...m,...M}},{}),{data:l,isLoading:h,refetch:u}=ae({...t,...d}),y=O.useMemo(()=>[{accessorFn:m=>m.employer,id:S.employer,header:()=>e.jsx("span",{children:a(`entities.${[S.employer]}`)}),cell:m=>m.getValue(),isSearchable:!0,isSortable:!0},{accessorFn:m=>m.numberOfEmployees,id:S.numberOfEmployees,header:()=>e.jsx("span",{children:a(`entities.${[S.numberOfEmployees]}`)}),cell:m=>m.getValue(),isSortable:!0}],[]);return h?e.jsx(e.Fragment,{children:"Loading..."}):e.jsx(V,{columns:y,data:(b=l==null?void 0:l.data.data)==null?void 0:b.employers,hasSearch:!0,sort:s,sortBy:o,totalNumber:(C=l==null?void 0:l.data.data)==null?void 0:C.meta.total_number,page:r,size:c,borderKeyword:"type",updateState:n,refetch:u,mapBorderColors:se})},le=[{name:"name",type:p.input,gridWidth:12,condition:!1}],ne=()=>{const{t:a}=g(),{state:{addClientForm:s},dispatch:o}=w(),r=(n,t,d)=>(l,h)=>{switch(t){case p.input:const{value:u}=l==null?void 0:l.target;let y=u;d?(y=u.replace(d,""),o({type:f.addClientForm,payload:{name:n,fieldValue:y}})):o({type:f.addClientForm,payload:{name:n,fieldValue:y}});break;case p.checkbox:o({type:f.addClientForm,payload:{name:n,fieldValue:h}});break;case p.datepicker:o({type:f.addClientForm,payload:{name:n,fieldValue:l}});break;case p.dynamicInputs:o({type:f.addClientForm,payload:{name:n,fieldValue:l}});break}},c=()=>console.log("Submitted"),i=n=>{const{name:t,type:d,gridClassName:l,formFieldClassName:h,gridWidth:u,size:y,subfieldName:b,format:C}=n;switch(d){case p.checkbox:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(Q,{control:e.jsx(_,{className:h,name:t,size:y??"small",checked:s[t],onChange:r(t,d)}),label:a(`entities.${t}`)})},t);case p.input:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(R,{fullWidth:!0,className:h,size:y??"small",label:a(`entities.${t}`),name:t,value:s[t],onChange:r(t,d,C)})},t);case p.datepicker:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(P,{dateAdapter:Y,children:e.jsx(I,{label:a(`entities.${t}`),value:s[t],className:h,slotProps:{textField:{size:"small",fullWidth:!0},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:r(t,d)})})},t);case p.dynamicInputs:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(K,{label:a(`entities.${t}`),inputProps:{label:a(`entities.${b}`),size:"small",fullWidth:!0},values:s[t],onValuesChange:r(t,d)})},t);default:return""}};return e.jsx(F,{children:e.jsx(W,{children:e.jsx("form",{onSubmit:c,children:e.jsx(x,{container:!0,spacing:2,children:le.map(n=>i(n))})})})})},ie=async a=>{let s;try{s=await B({method:"post",url:"api/clients",data:a,withCredentials:!0})}catch{s={data:{error:500,message:"Connection problem"}}}return s},de=(a,s)=>{const o=L();return G(r=>ie(r),{onSuccess:r=>(r.data.error||(s({type:f.resetClientFormData}),a(),o.invalidateQueries({queryKey:["clientsList"]})),r.data.message),onError:r=>({error:r,message:"Connection problem"})})},ce=a=>{const{open:s,onClose:o}=a,{t:r}=g(),{state:{addClientForm:c},dispatch:i}=w(),{mutate:n,isLoading:t}=de(o,i);return e.jsx(F,{children:e.jsx(q,{open:s,header:r("entities.addNewClient"),children:e.jsx(ne,{}),onClose:o,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>n(X(c)),isLoading:t,hasCloseIconButton:!0})})},ue=[{name:"name",type:p.input,gridWidth:12,condition:!1}],me=()=>{const{t:a}=g(),{state:{addEmployerForm:s},dispatch:o}=k(),r=(n,t,d)=>(l,h)=>{switch(t){case p.input:const{value:u}=l==null?void 0:l.target;let y=u;d?(y=u.replace(d,""),o({type:j.addEmployerForm,payload:{name:n,fieldValue:y}})):o({type:j.addEmployerForm,payload:{name:n,fieldValue:y}});break;case p.checkbox:o({type:j.addEmployerForm,payload:{name:n,fieldValue:h}});break;case p.datepicker:o({type:j.addEmployerForm,payload:{name:n,fieldValue:l}});break;case p.dynamicInputs:o({type:j.addEmployerForm,payload:{name:n,fieldValue:l}});break}},c=()=>console.log("Submitted"),i=n=>{const{name:t,type:d,gridClassName:l,formFieldClassName:h,gridWidth:u,size:y,subfieldName:b,format:C}=n;switch(d){case p.checkbox:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(Q,{control:e.jsx(_,{className:h,name:t,size:y??"small",checked:s[t],onChange:r(t,d)}),label:a(`entities.${t}`)})},t);case p.input:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(R,{fullWidth:!0,className:h,size:y??"small",label:a(`entities.${t}`),name:t,value:s[t],onChange:r(t,d,C)})},t);case p.datepicker:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(P,{dateAdapter:Y,children:e.jsx(I,{label:a(`entities.${t}`),value:s[t],className:h,slotProps:{textField:{size:"small",fullWidth:!0},actionBar:{actions:["clear"]}},format:"DD. MM. YYYY",onChange:r(t,d)})})},t);case p.dynamicInputs:return e.jsx(x,{className:l,item:!0,xs:u||12,children:e.jsx(K,{label:a(`entities.${t}`),inputProps:{label:a(`entities.${b}`),size:"small",fullWidth:!0},values:s[t],onValuesChange:r(t,d)})},t);default:return""}};return e.jsx(F,{children:e.jsx(W,{children:e.jsx("form",{onSubmit:c,children:e.jsx(x,{container:!0,spacing:2,children:ue.map(n=>i(n))})})})})},pe=async a=>{let s;try{s=await B({method:"post",url:"api/employers",data:a,withCredentials:!0})}catch{s={data:{error:500,message:"Connection problem"}}}return s},ye=(a,s)=>{const o=L();return G(r=>pe(r),{onSuccess:r=>(r.data.error||(s({type:j.resetEmployerFormData}),a(),o.invalidateQueries({queryKey:["employersList"]})),r.data.message),onError:r=>({error:r,message:"Connection problem"})})},he=a=>{const{open:s,onClose:o}=a,{t:r}=g(),{state:{addEmployerForm:c},dispatch:i}=k(),{mutate:n,isLoading:t}=ye(o,i);return e.jsx(F,{children:e.jsx(q,{open:s,header:r("entities.addNewEmployer"),children:e.jsx(me,{}),onClose:o,hasActionButton:!0,actionButtonText:"submit",hasCancelButton:!0,onSubmit:()=>n(re(c)),isLoading:t,hasCloseIconButton:!0})})},je=a=>{const{t:s}=g(),{state:{addClientModalOpen:o},dispatch:r}=w(),{state:{addEmployerModalOpen:c},dispatch:i}=k();return e.jsx(F,{children:e.jsxs(O.Suspense,{fallback:"Loading....",children:[e.jsxs(E,{className:"flex flex-col lg:flex-row gap-4",children:[e.jsxs(E,{className:"w-full",children:[e.jsx(E,{className:"my-2 flex justify-end",children:e.jsx(A,{onClick:()=>r({type:f.addClientModalOpen,payload:!o}),children:s("entities.addNewClient")})}),e.jsx(Z,{})]}),e.jsxs(E,{className:"w-full",children:[e.jsx(E,{className:"my-2 flex justify-end",children:e.jsx(A,{onClick:()=>i({type:j.addEmployerModalOpen,payload:!c}),children:s("entities.addNewEmployer")})}),e.jsx(oe,{})]})]}),e.jsx(ce,{open:o,onClose:()=>r({type:f.addClientModalOpen,payload:!1})}),e.jsx(he,{open:c,onClose:()=>i({type:j.addEmployerModalOpen,payload:!1})})]})})};export{je as ClientsAndEmployers};
