import{b as f,r as l,aT as P,j as e,ax as h,aU as j,aV as I,a3 as B,ay as E,aW as H,av as k,am as b,aX as v,o as y}from"./sanity-37d6e3fe.js";const C=f(y)`
  position: relative;
`;function T(s){const{children:o}=s,{collapsed:t}=I();return e.jsx(C,{hidden:t,height:"fill",overflow:"auto",children:o})}function U(s){const{actionHandlers:o,index:t,menuItems:n,menuItemGroups:r,title:i}=s,{features:a}=B();return!(n!=null&&n.length)&&!i?null:e.jsx(E,{actions:e.jsx(H,{menuItems:n,menuItemGroups:r,actionHandlers:o}),backButton:a.backButton&&t>0&&e.jsx(k,{as:b,"data-as":"a",icon:v,mode:"bleed",tooltipProps:{content:"Back"}}),title:i})}function V(s){const{index:o,pane:t,paneKey:n,...r}=s,{child:i,component:a,menuItems:u,menuItemGroups:d,type:R,...m}=t,[c,p]=l.useState(null),{title:x=""}=P(t);return e.jsxs(h,{id:n,minWidth:320,selected:r.isSelected,children:[e.jsx(U,{actionHandlers:c==null?void 0:c.actionHandlers,index:o,menuItems:u,menuItemGroups:d,title:x}),e.jsxs(T,{children:[j.isValidElementType(a)&&l.createElement(a,{...r,...m,ref:p,child:i,paneKey:n}),l.isValidElement(a)&&a]})]})}export{V as default};
