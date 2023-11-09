import{r as b,Q as et,R as Ee,U as St,_ as c,d as mt,g as xt,s as E,e as Fe,k as It,m as rt,j as x,n as ge,o as Ot,V as tt,W as se,X as dt,Y as fe,I as Pt,Z as $t,f as ot,$ as vt,a0 as Lt}from"./index-0fc86f99.js";import{c as At,C as kt}from"./SnackbarNotification-fe22749b.js";import{l as Ct,n as Rt}from"./ConfirmationDialog-9583af2c.js";const Tt=o=>{const n=b.useRef({});return b.useEffect(()=>{n.current=o}),n.current},wt=Tt;function ft(o){return typeof o.normalize<"u"?o.normalize("NFD").replace(/[\u0300-\u036f]/g,""):o}function Dt(o={}){const{ignoreAccents:n=!0,ignoreCase:i=!0,limit:h,matchFrom:L="any",stringify:y,trim:O=!1}=o;return(f,{inputValue:_,getOptionLabel:z})=>{let A=O?_.trim():_;i&&(A=A.toLowerCase()),n&&(A=ft(A));const V=A?f.filter(oe=>{let F=(y||z)(oe);return i&&(F=F.toLowerCase()),n&&(F=ft(F)),L==="start"?F.indexOf(A)===0:F.indexOf(A)>-1}):f;return typeof h=="number"?V.slice(0,h):V}}function nt(o,n){for(let i=0;i<o.length;i+=1)if(n(o[i]))return i;return-1}const Mt=Dt(),gt=5,Nt=o=>{var n;return o.current!==null&&((n=o.current.parentElement)==null?void 0:n.contains(document.activeElement))};function Et(o){const{unstable_isActiveElementInListbox:n=Nt,unstable_classNamePrefix:i="Mui",autoComplete:h=!1,autoHighlight:L=!1,autoSelect:y=!1,blurOnSelect:O=!1,clearOnBlur:f=!o.freeSolo,clearOnEscape:_=!1,componentName:z="useAutocomplete",defaultValue:A=o.multiple?[]:null,disableClearable:V=!1,disableCloseOnSelect:oe=!1,disabled:F,disabledItemsFocusable:He=!1,disableListWrap:ze=!1,filterOptions:at=Mt,filterSelectedOptions:be=!1,freeSolo:Y=!1,getOptionDisabled:G,getOptionLabel:Ve=e=>{var t;return(t=e.label)!=null?t:e},groupBy:le,handleHomeEndKeys:je=!o.freeSolo,id:ne,includeInputInList:We=!1,inputValue:st,isOptionEqualToValue:Z=(e,t)=>e===t,multiple:d=!1,onChange:he,onClose:me,onHighlightChange:ve,onInputChange:U,onOpen:xe,open:Be,openOnFocus:lt=!1,options:it,readOnly:K=!1,selectOnFocus:_e=!o.freeSolo,value:Ie}=o,k=At(ne);let S=Ve;S=e=>{const t=Ve(e);return typeof t!="string"?String(t):t};const Oe=b.useRef(!1),Pe=b.useRef(!0),P=b.useRef(null),R=b.useRef(null),[ie,Ge]=b.useState(null),[w,pe]=b.useState(-1),Le=L?0:-1,v=b.useRef(Le),[s,Ae]=et({controlled:Ie,default:A,name:z}),[u,J]=et({controlled:st,default:"",name:z,state:"inputValue"}),[q,ke]=b.useState(!1),ue=b.useCallback((e,t)=>{if(!(d?s.length<t.length:t!==null)&&!f)return;let a;if(d)a="";else if(t==null)a="";else{const p=S(t);a=typeof p=="string"?p:""}u!==a&&(J(a),U&&U(e,a,"reset"))},[S,u,d,U,J,f,s]),[Q,Re]=et({controlled:Be,default:!1,name:z,state:"open"}),[Ue,Te]=b.useState(!0),we=!d&&s!=null&&u===S(s),T=Q&&!K,g=T?at(it.filter(e=>!(be&&(d?s:[s]).some(t=>t!==null&&Z(e,t)))),{inputValue:we&&Ue?"":u,getOptionLabel:S}):[],D=wt({filteredOptions:g,value:s,inputValue:u});b.useEffect(()=>{const e=s!==D.value;q&&!e||Y&&!e||ue(null,s)},[s,ue,q,D.value,Y]);const $e=Q&&g.length>0&&!K,ce=Ee(e=>{e===-1?P.current.focus():ie.querySelector(`[data-tag-index="${e}"]`).focus()});b.useEffect(()=>{d&&w>s.length-1&&(pe(-1),ce(-1))},[s,d,w,ce]);function Ke(e,t){if(!R.current||e===-1)return-1;let r=e;for(;;){if(t==="next"&&r===g.length||t==="previous"&&r===-1)return-1;const a=R.current.querySelector(`[data-option-index="${r}"]`),p=He?!1:!a||a.disabled||a.getAttribute("aria-disabled")==="true";if(a&&!a.hasAttribute("tabindex")||p)r+=t==="next"?1:-1;else return r}}const M=Ee(({event:e,index:t,reason:r="auto"})=>{if(v.current=t,t===-1?P.current.removeAttribute("aria-activedescendant"):P.current.setAttribute("aria-activedescendant",`${k}-option-${t}`),ve&&ve(e,t===-1?null:g[t],r),!R.current)return;const a=R.current.querySelector(`[role="option"].${i}-focused`);a&&(a.classList.remove(`${i}-focused`),a.classList.remove(`${i}-focusVisible`));let p=R.current;if(R.current.getAttribute("role")!=="listbox"&&(p=R.current.parentElement.querySelector('[role="listbox"]')),!p)return;if(t===-1){p.scrollTop=0;return}const C=R.current.querySelector(`[data-option-index="${t}"]`);if(C&&(C.classList.add(`${i}-focused`),r==="keyboard"&&C.classList.add(`${i}-focusVisible`),p.scrollHeight>p.clientHeight&&r!=="mouse"&&r!=="touch")){const m=C,B=p.clientHeight+p.scrollTop,ct=m.offsetTop+m.offsetHeight;ct>B?p.scrollTop=ct-p.clientHeight:m.offsetTop-m.offsetHeight*(le?1.3:0)<p.scrollTop&&(p.scrollTop=m.offsetTop-m.offsetHeight*(le?1.3:0))}}),N=Ee(({event:e,diff:t,direction:r="next",reason:a="auto"})=>{if(!T)return;const C=Ke((()=>{const m=g.length-1;if(t==="reset")return Le;if(t==="start")return 0;if(t==="end")return m;const B=v.current+t;return B<0?B===-1&&We?-1:ze&&v.current!==-1||Math.abs(t)>1?0:m:B>m?B===m+1&&We?-1:ze||Math.abs(t)>1?m:0:B})(),r);if(M({index:C,reason:a,event:e}),h&&t!=="reset")if(C===-1)P.current.value=u;else{const m=S(g[C]);P.current.value=m,m.toLowerCase().indexOf(u.toLowerCase())===0&&u.length>0&&P.current.setSelectionRange(u.length,m.length)}}),qe=()=>{const e=(t,r)=>{const a=t?S(t):"",p=r?S(r):"";return a===p};if(v.current!==-1&&D.filteredOptions&&D.filteredOptions.length!==g.length&&D.inputValue===u&&(d?s.length===D.value.length&&D.value.every((t,r)=>S(s[r])===S(t)):e(D.value,s))){const t=D.filteredOptions[v.current];if(t&&g.some(a=>S(a)===S(t)))return!0}return!1},ee=b.useCallback(()=>{if(!T||qe())return;const e=d?s[0]:s;if(g.length===0||e==null){N({diff:"reset"});return}if(R.current){if(e!=null){const t=g[v.current];if(d&&t&&nt(s,a=>Z(t,a))!==-1)return;const r=nt(g,a=>Z(a,e));r===-1?N({diff:"reset"}):M({index:r});return}if(v.current>=g.length-1){M({index:g.length-1});return}M({index:v.current})}},[g.length,d?!1:s,be,N,M,T,u,d]),Qe=Ee(e=>{St(R,e),e&&ee()});b.useEffect(()=>{ee()},[ee]);const X=e=>{Q||(Re(!0),Te(!0),xe&&xe(e))},j=(e,t)=>{Q&&(Re(!1),me&&me(e,t))},W=(e,t,r,a)=>{if(d){if(s.length===t.length&&s.every((p,C)=>p===t[C]))return}else if(s===t)return;he&&he(e,t,r,a),Ae(t)},te=b.useRef(!1),re=(e,t,r="selectOption",a="options")=>{let p=r,C=t;if(d){C=Array.isArray(s)?s.slice():[];const m=nt(C,B=>Z(t,B));m===-1?C.push(t):a!=="freeSolo"&&(C.splice(m,1),p="removeOption")}ue(e,C),W(e,C,p,{option:t}),!oe&&(!e||!e.ctrlKey&&!e.metaKey)&&j(e,p),(O===!0||O==="touch"&&te.current||O==="mouse"&&!te.current)&&P.current.blur()};function Xe(e,t){if(e===-1)return-1;let r=e;for(;;){if(t==="next"&&r===s.length||t==="previous"&&r===-1)return-1;const a=ie.querySelector(`[data-tag-index="${r}"]`);if(!a||!a.hasAttribute("tabindex")||a.disabled||a.getAttribute("aria-disabled")==="true")r+=t==="next"?1:-1;else return r}}const Ce=(e,t)=>{if(!d)return;u===""&&j(e,"toggleInput");let r=w;w===-1?u===""&&t==="previous"&&(r=s.length-1):(r+=t==="next"?1:-1,r<0&&(r=0),r===s.length&&(r=-1)),r=Xe(r,t),pe(r),ce(r)},De=e=>{Oe.current=!0,J(""),U&&U(e,"","clear"),W(e,d?[]:null,"clear")},Ye=e=>t=>{if(e.onKeyDown&&e.onKeyDown(t),!t.defaultMuiPrevented&&(w!==-1&&["ArrowLeft","ArrowRight"].indexOf(t.key)===-1&&(pe(-1),ce(-1)),t.which!==229))switch(t.key){case"Home":T&&je&&(t.preventDefault(),N({diff:"start",direction:"next",reason:"keyboard",event:t}));break;case"End":T&&je&&(t.preventDefault(),N({diff:"end",direction:"previous",reason:"keyboard",event:t}));break;case"PageUp":t.preventDefault(),N({diff:-gt,direction:"previous",reason:"keyboard",event:t}),X(t);break;case"PageDown":t.preventDefault(),N({diff:gt,direction:"next",reason:"keyboard",event:t}),X(t);break;case"ArrowDown":t.preventDefault(),N({diff:1,direction:"next",reason:"keyboard",event:t}),X(t);break;case"ArrowUp":t.preventDefault(),N({diff:-1,direction:"previous",reason:"keyboard",event:t}),X(t);break;case"ArrowLeft":Ce(t,"previous");break;case"ArrowRight":Ce(t,"next");break;case"Enter":if(v.current!==-1&&T){const r=g[v.current],a=G?G(r):!1;if(t.preventDefault(),a)return;re(t,r,"selectOption"),h&&P.current.setSelectionRange(P.current.value.length,P.current.value.length)}else Y&&u!==""&&we===!1&&(d&&t.preventDefault(),re(t,u,"createOption","freeSolo"));break;case"Escape":T?(t.preventDefault(),t.stopPropagation(),j(t,"escape")):_&&(u!==""||d&&s.length>0)&&(t.preventDefault(),t.stopPropagation(),De(t));break;case"Backspace":if(d&&!K&&u===""&&s.length>0){const r=w===-1?s.length-1:w,a=s.slice();a.splice(r,1),W(t,a,"removeOption",{option:s[r]})}break;case"Delete":if(d&&!K&&u===""&&s.length>0&&w!==-1){const r=w,a=s.slice();a.splice(r,1),W(t,a,"removeOption",{option:s[r]})}break}},Ze=e=>{ke(!0),lt&&!Oe.current&&X(e)},$=e=>{if(n(R)){P.current.focus();return}ke(!1),Pe.current=!0,Oe.current=!1,y&&v.current!==-1&&T?re(e,g[v.current],"blur"):y&&Y&&u!==""?re(e,u,"blur","freeSolo"):f&&ue(e,s),j(e,"blur")},I=e=>{const t=e.target.value;u!==t&&(J(t),Te(!1),U&&U(e,t,"input")),t===""?!V&&!d&&W(e,null,"clear"):X(e)},H=e=>{const t=Number(e.currentTarget.getAttribute("data-option-index"));v.current!==t&&M({event:e,index:t,reason:"mouse"})},pt=e=>{M({event:e,index:Number(e.currentTarget.getAttribute("data-option-index")),reason:"touch"}),te.current=!0},Je=e=>{const t=Number(e.currentTarget.getAttribute("data-option-index"));re(e,g[t],"selectOption"),te.current=!1},ut=e=>t=>{const r=s.slice();r.splice(e,1),W(t,r,"removeOption",{option:s[e]})},Me=e=>{Q?j(e,"toggleInput"):X(e)},Ne=e=>{e.currentTarget.contains(e.target)&&e.target.getAttribute("id")!==k&&e.preventDefault()},ye=e=>{e.currentTarget.contains(e.target)&&(P.current.focus(),_e&&Pe.current&&P.current.selectionEnd-P.current.selectionStart===0&&P.current.select(),Pe.current=!1)},Se=e=>{(u===""||!Q)&&Me(e)};let ae=Y&&u.length>0;ae=ae||(d?s.length>0:s!==null);let de=g;return le&&(de=g.reduce((e,t,r)=>{const a=le(t);return e.length>0&&e[e.length-1].group===a?e[e.length-1].options.push(t):e.push({key:r,index:r,group:a,options:[t]}),e},[])),F&&q&&$(),{getRootProps:(e={})=>c({"aria-owns":$e?`${k}-listbox`:null},e,{onKeyDown:Ye(e),onMouseDown:Ne,onClick:ye}),getInputLabelProps:()=>({id:`${k}-label`,htmlFor:k}),getInputProps:()=>({id:k,value:u,onBlur:$,onFocus:Ze,onChange:I,onMouseDown:Se,"aria-activedescendant":T?"":null,"aria-autocomplete":h?"both":"list","aria-controls":$e?`${k}-listbox`:void 0,"aria-expanded":$e,autoComplete:"off",ref:P,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:F}),getClearProps:()=>({tabIndex:-1,onClick:De}),getPopupIndicatorProps:()=>({tabIndex:-1,onClick:Me}),getTagProps:({index:e})=>c({key:e,"data-tag-index":e,tabIndex:-1},!K&&{onDelete:ut(e)}),getListboxProps:()=>({role:"listbox",id:`${k}-listbox`,"aria-labelledby":`${k}-label`,ref:Qe,onMouseDown:e=>{e.preventDefault()}}),getOptionProps:({index:e,option:t})=>{const r=(d?s:[s]).some(p=>p!=null&&Z(t,p)),a=G?G(t):!1;return{key:S(t),tabIndex:-1,role:"option",id:`${k}-option-${e}`,onMouseMove:H,onClick:Je,onTouchStart:pt,"data-option-index":e,"aria-disabled":a,"aria-selected":r}},id:k,inputValue:u,value:s,dirty:ae,expanded:T&&ie,popupOpen:T,focused:q||w!==-1,anchorEl:ie,setAnchorEl:Ge,focusedTag:w,groupedOptions:de}}function Ft(o){return mt("MuiListSubheader",o)}xt("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const Ht=["className","color","component","disableGutters","disableSticky","inset"],zt=o=>{const{classes:n,color:i,disableGutters:h,inset:L,disableSticky:y}=o,O={root:["root",i!=="default"&&`color${Fe(i)}`,!h&&"gutters",L&&"inset",!y&&"sticky"]};return Ot(O,Ft,n)},Vt=E("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(o,n)=>{const{ownerState:i}=o;return[n.root,i.color!=="default"&&n[`color${Fe(i.color)}`],!i.disableGutters&&n.gutters,i.inset&&n.inset,!i.disableSticky&&n.sticky]}})(({theme:o,ownerState:n})=>c({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(o.vars||o).palette.text.secondary,fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(14)},n.color==="primary"&&{color:(o.vars||o).palette.primary.main},n.color==="inherit"&&{color:"inherit"},!n.disableGutters&&{paddingLeft:16,paddingRight:16},n.inset&&{paddingLeft:72},!n.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(o.vars||o).palette.background.paper})),yt=b.forwardRef(function(n,i){const h=It({props:n,name:"MuiListSubheader"}),{className:L,color:y="default",component:O="li",disableGutters:f=!1,disableSticky:_=!1,inset:z=!1}=h,A=rt(h,Ht),V=c({},h,{color:y,component:O,disableGutters:f,disableSticky:_,inset:z}),oe=zt(V);return x.jsx(Vt,c({as:O,className:ge(oe.root,L),ref:i,ownerState:V},A))});yt.muiSkipListHighlight=!0;const jt=yt;function Wt(o){return mt("MuiAutocomplete",o)}const Bt=xt("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]),l=Bt;var bt,ht;const _t=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],Gt=["ref"],Ut=o=>{const{classes:n,disablePortal:i,expanded:h,focused:L,fullWidth:y,hasClearIcon:O,hasPopupIcon:f,inputFocused:_,popupOpen:z,size:A}=o,V={root:["root",h&&"expanded",L&&"focused",y&&"fullWidth",O&&"hasClearIcon",f&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",_&&"inputFocused"],tag:["tag",`tagSize${Fe(A)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",z&&"popupIndicatorOpen"],popper:["popper",i&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return Ot(V,Wt,n)},Kt=E("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(o,n)=>{const{ownerState:i}=o,{fullWidth:h,hasClearIcon:L,hasPopupIcon:y,inputFocused:O,size:f}=i;return[{[`& .${l.tag}`]:n.tag},{[`& .${l.tag}`]:n[`tagSize${Fe(f)}`]},{[`& .${l.inputRoot}`]:n.inputRoot},{[`& .${l.input}`]:n.input},{[`& .${l.input}`]:O&&n.inputFocused},n.root,h&&n.fullWidth,y&&n.hasPopupIcon,L&&n.hasClearIcon]}})(({ownerState:o})=>c({[`&.${l.focused} .${l.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${l.clearIndicator}`]:{visibility:"visible"}}},o.fullWidth&&{width:"100%"},{[`& .${l.tag}`]:c({margin:3,maxWidth:"calc(100% - 6px)"},o.size==="small"&&{margin:2,maxWidth:"calc(100% - 4px)"}),[`& .${l.inputRoot}`]:{flexWrap:"wrap",[`.${l.hasPopupIcon}&, .${l.hasClearIcon}&`]:{paddingRight:26+4},[`.${l.hasPopupIcon}.${l.hasClearIcon}&`]:{paddingRight:52+4},[`& .${l.input}`]:{width:0,minWidth:30}},[`& .${tt.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${tt.root}.${se.sizeSmall}`]:{[`& .${tt.input}`]:{padding:"2px 4px 3px 0"}},[`& .${dt.root}`]:{padding:9,[`.${l.hasPopupIcon}&, .${l.hasClearIcon}&`]:{paddingRight:26+4+9},[`.${l.hasPopupIcon}.${l.hasClearIcon}&`]:{paddingRight:52+4+9},[`& .${l.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${l.endAdornment}`]:{right:9}},[`& .${dt.root}.${se.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${l.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${fe.root}`]:{paddingTop:19,paddingLeft:8,[`.${l.hasPopupIcon}&, .${l.hasClearIcon}&`]:{paddingRight:26+4+9},[`.${l.hasPopupIcon}.${l.hasClearIcon}&`]:{paddingRight:52+4+9},[`& .${fe.input}`]:{padding:"7px 4px"},[`& .${l.endAdornment}`]:{right:9}},[`& .${fe.root}.${se.sizeSmall}`]:{paddingBottom:1,[`& .${fe.input}`]:{padding:"2.5px 4px"}},[`& .${se.hiddenLabel}`]:{paddingTop:8},[`& .${fe.root}.${se.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${l.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${fe.root}.${se.hiddenLabel}.${se.sizeSmall}`]:{[`& .${l.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${l.input}`]:c({flexGrow:1,textOverflow:"ellipsis",opacity:0},o.inputFocused&&{opacity:1})})),qt=E("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(o,n)=>n.endAdornment})({position:"absolute",right:0,top:"calc(50% - 14px)"}),Qt=E(Pt,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(o,n)=>n.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),Xt=E(Pt,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:o},n)=>c({},n.popupIndicator,o.popupOpen&&n.popupIndicatorOpen)})(({ownerState:o})=>c({padding:2,marginRight:-2},o.popupOpen&&{transform:"rotate(180deg)"})),Yt=E(Ct,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(o,n)=>{const{ownerState:i}=o;return[{[`& .${l.option}`]:n.option},n.popper,i.disablePortal&&n.popperDisablePortal]}})(({theme:o,ownerState:n})=>c({zIndex:(o.vars||o).zIndex.modal},n.disablePortal&&{position:"absolute"})),Zt=E($t,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(o,n)=>n.paper})(({theme:o})=>c({},o.typography.body1,{overflow:"auto"})),Jt=E("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(o,n)=>n.loading})(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"})),eo=E("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(o,n)=>n.noOptions})(({theme:o})=>({color:(o.vars||o).palette.text.secondary,padding:"14px 16px"})),to=E("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(o,n)=>n.listbox})(({theme:o})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${l.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[o.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${l.focused}`]:{backgroundColor:(o.vars||o).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(o.vars||o).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${l.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:ot(o.palette.primary.main,o.palette.action.selectedOpacity),[`&.${l.focused}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:ot(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(o.vars||o).palette.action.selected}},[`&.${l.focusVisible}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.focusOpacity}))`:ot(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.focusOpacity)}}}})),oo=E(jt,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(o,n)=>n.groupLabel})(({theme:o})=>({backgroundColor:(o.vars||o).palette.background.paper,top:-8})),no=E("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(o,n)=>n.groupUl})({padding:0,[`& .${l.option}`]:{paddingLeft:24}}),ro=b.forwardRef(function(n,i){var h,L,y,O;const f=It({props:n,name:"MuiAutocomplete"}),{autoComplete:_=!1,autoHighlight:z=!1,autoSelect:A=!1,blurOnSelect:V=!1,ChipProps:oe,className:F,clearIcon:He=bt||(bt=x.jsx(kt,{fontSize:"small"})),clearOnBlur:ze=!f.freeSolo,clearOnEscape:at=!1,clearText:be="Clear",closeText:Y="Close",componentsProps:G={},defaultValue:Ve=f.multiple?[]:null,disableClearable:le=!1,disableCloseOnSelect:je=!1,disabled:ne=!1,disabledItemsFocusable:We=!1,disableListWrap:st=!1,disablePortal:Z=!1,filterSelectedOptions:d=!1,forcePopupIcon:he="auto",freeSolo:me=!1,fullWidth:ve=!1,getLimitTagsText:U=e=>`+${e}`,getOptionLabel:xe=e=>{var t;return(t=e.label)!=null?t:e},groupBy:Be,handleHomeEndKeys:lt=!f.freeSolo,includeInputInList:it=!1,limitTags:K=-1,ListboxComponent:_e="ul",ListboxProps:Ie,loading:k=!1,loadingText:S="Loading…",multiple:Oe=!1,noOptionsText:Pe="No options",openOnFocus:P=!1,openText:R="Open",PaperComponent:ie=$t,PopperComponent:Ge=Ct,popupIcon:w=ht||(ht=x.jsx(vt,{})),readOnly:pe=!1,renderGroup:Le,renderInput:v,renderOption:s,renderTags:Ae,selectOnFocus:u=!f.freeSolo,size:J="medium",slotProps:q={}}=f,ke=rt(f,_t),{getRootProps:ue,getInputProps:Q,getInputLabelProps:Re,getPopupIndicatorProps:Ue,getClearProps:Te,getTagProps:we,getListboxProps:T,getOptionProps:g,value:D,dirty:$e,expanded:ce,id:Ke,popupOpen:M,focused:N,focusedTag:qe,anchorEl:ee,setAnchorEl:Qe,inputValue:X,groupedOptions:j}=Et(c({},f,{componentName:"Autocomplete"})),W=!le&&!ne&&$e&&!pe,te=(!me||he===!0)&&he!==!1,{onMouseDown:re}=Q(),{ref:Xe}=Ie??{},Ce=T(),{ref:De}=Ce,Ye=rt(Ce,Gt),Ze=Lt(De,Xe),$=c({},f,{disablePortal:Z,expanded:ce,focused:N,fullWidth:ve,hasClearIcon:W,hasPopupIcon:te,inputFocused:qe===-1,popupOpen:M,size:J}),I=Ut($);let H;if(Oe&&D.length>0){const e=t=>c({className:I.tag,disabled:ne},we(t));Ae?H=Ae(D,e,$):H=D.map((t,r)=>x.jsx(Rt,c({label:xe(t),size:J},e({index:r}),oe)))}if(K>-1&&Array.isArray(H)){const e=H.length-K;!N&&e>0&&(H=H.splice(0,K),H.push(x.jsx("span",{className:I.tag,children:U(e)},H.length)))}const Je=Le||(e=>x.jsxs("li",{children:[x.jsx(oo,{className:I.groupLabel,ownerState:$,component:"div",children:e.group}),x.jsx(no,{className:I.groupUl,ownerState:$,children:e.children})]},e.key)),Me=s||((e,t)=>x.jsx("li",c({},e,{children:xe(t)}))),Ne=(e,t)=>{const r=g({option:e,index:t});return Me(c({},r,{className:I.option}),e,{selected:r["aria-selected"],index:t,inputValue:X},$)},ye=(h=q.clearIndicator)!=null?h:G.clearIndicator,Se=(L=q.paper)!=null?L:G.paper,ae=(y=q.popper)!=null?y:G.popper,de=(O=q.popupIndicator)!=null?O:G.popupIndicator;return x.jsxs(b.Fragment,{children:[x.jsx(Kt,c({ref:i,className:ge(I.root,F),ownerState:$},ue(ke),{children:v({id:Ke,disabled:ne,fullWidth:!0,size:J==="small"?"small":void 0,InputLabelProps:Re(),InputProps:c({ref:Qe,className:I.inputRoot,startAdornment:H,onClick:e=>{e.target===e.currentTarget&&re(e)}},(W||te)&&{endAdornment:x.jsxs(qt,{className:I.endAdornment,ownerState:$,children:[W?x.jsx(Qt,c({},Te(),{"aria-label":be,title:be,ownerState:$},ye,{className:ge(I.clearIndicator,ye==null?void 0:ye.className),children:He})):null,te?x.jsx(Xt,c({},Ue(),{disabled:ne,"aria-label":M?Y:R,title:M?Y:R,ownerState:$},de,{className:ge(I.popupIndicator,de==null?void 0:de.className),children:w})):null]})}),inputProps:c({className:I.input,disabled:ne,readOnly:pe},Q())})})),ee?x.jsx(Yt,c({as:Ge,disablePortal:Z,style:{width:ee?ee.clientWidth:null},ownerState:$,role:"presentation",anchorEl:ee,open:M},ae,{className:ge(I.popper,ae==null?void 0:ae.className),children:x.jsxs(Zt,c({ownerState:$,as:ie},Se,{className:ge(I.paper,Se==null?void 0:Se.className),children:[k&&j.length===0?x.jsx(Jt,{className:I.loading,ownerState:$,children:S}):null,j.length===0&&!me&&!k?x.jsx(eo,{className:I.noOptions,ownerState:$,role:"presentation",onMouseDown:e=>{e.preventDefault()},children:Pe}):null,j.length>0?x.jsx(to,c({as:_e,className:I.listbox,ownerState:$},Ye,Ie,{ref:Ze,children:j.map((e,t)=>Be?Je({key:e.key,group:e.group,children:e.options.map((r,a)=>Ne(r,e.index+a))}):Ne(e,t))})):null]}))})):null]})}),io=ro;export{io as A};
