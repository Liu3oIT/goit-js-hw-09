const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d=null;t.addEventListener("click",(()=>{t.disabled=!0,e.disabled=!1,d=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}),1e3)}));e.addEventListener("click",(()=>{e.disabled=!0,t.disabled=!1,clearInterval(d)}));
//# sourceMappingURL=01-color-switcher.fea2c483.js.map
