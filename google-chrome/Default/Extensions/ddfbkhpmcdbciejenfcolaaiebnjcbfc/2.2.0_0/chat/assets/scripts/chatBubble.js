!function(){function e(){showChatPendo=!1;let e=document.getElementById("pendoChatContainer");e&&e.remove()}chrome.runtime.sendMessage({config:"chat_status"},(t=>{t?(function(){let e=document.getElementById("bubbleId");if(e){let t=document.getElementById("msgCountId");t||(t=document.createElement("div"),t.id="msgCountId",t.style.height="24px",t.style.width="24px",t.style.borderRadius="50%",t.style.backgroundColor="#DF2935",t.style.position="absolute",t.style.zIndex=Number.MAX_SAFE_INTEGER,t.style.top="-6.67%",t.style.left="66.67%",t.style.alignItems="center",t.style.justifyContent="center",t.style.display="flex",t.style.color="white",t.style.fontSize="12px",t.style.fontWeight="bold",e.appendChild(t)),msgCount?(t.innerText=msgCount>9?"9+":msgCount.toString(),t.style.visibility="visible"):t.style.visibility="hidden",imageLeft&&(e.style.left=imageLeft+"px"),imageTop&&(e.style.top=imageTop+"px")}else{let t=0,n=0,l=0,o=0,s=!1;e=document.createElement("div"),e.id="bubbleId",e.style.height="60px",e.style.width="60px",e.style.position="fixed",e.style.right=0,e.style.bottom=0,e.style.zIndex=Number.MAX_SAFE_INTEGER-1;let i=document.createElement("img");i.style.width="60px",i.style.height="60px",i.style.borderRadius="50%",i.style.boxShadow="0 10px 20px 5px rgba(0, 0, 0, 0.1)",i.src=chrome.runtime.getURL("/chat/assets/imgs/bubble.svg"),e.appendChild(i),e.addEventListener("click",(function(){showChatPendo||(s?s=!1:chrome.runtime.sendMessage({type:"SHOW_CHAT_UI"}))})),function(i){function d(e){if(showChatPendo)return;(e=e||window.event).preventDefault(),t=l-e.clientX,n=o-e.clientY,l=e.clientX,o=e.clientY;const d=i.offsetTop-n,a=i.offsetLeft-t;d<0||d+60>window.innerHeight||a<0||a+60>window.innerWidth||(i.style.top=d+"px",i.style.left=a+"px",s=!0)}function a(){document.onmouseup=null,document.onmousemove=null,chrome.runtime.sendMessage({type:"UPDATE_CHAT_BUBBLE_POSITION",imageLeft:e.offsetLeft-n,imageTop:e.offsetTop-n})}e.onmousedown=function(e){(e=e||window.event).preventDefault(),l=e.clientX,o=e.clientY,document.onmouseup=a,document.onmousemove=d}}(e),document.body.appendChild(e)}}(),chrome.storage.sync.get(["haveShownFakePendo1"],(function(t){t.haveShownFakePendo1?e():(showChatPendo=!0,function(){let e=document.getElementById("pendoChatContainer");if(!e){e=document.createElement("div"),e.style.all="revert",e.style.zIndex=Number.MAX_SAFE_INTEGER-1,e.id="pendoChatContainer",e.style.position="fixed",e.style.bottom="70px",e.style.right="8px",e.style.width="330px",e.style.height="406px",e.style.padding="32px 40px",e.style.background="#FFFFFF",e.style.borderRadius="3px",e.style.boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)",e.style.textAlign="center";let t=document.createElement("div");t.id="pendoChatWrapper",t.style.all="revert",t.style.position="relative",t.style.height="380px",t.style.width="330px";let n=document.createElement("div");n.style.all="revert",n.id="pendoChatHeader",n.style.display="flex";let l=function(){e.remove(),chrome.storage.sync.set({haveShownFakePendo1:!0}),chrome.runtime.sendMessage({type:"CLOSE_FAKE_PENDO"})},o=document.createElement("img");o.style.all="revert",o.id="pendoChatClose",o.style.marginLeft="auto",o.style.height="12px",o.style.width="12px",o.style.cursor="pointer",o.addEventListener("click",l),o.src=chrome.runtime.getURL("/chat/assets/imgs/closePendo.svg"),n.appendChild(o),t.append(n);let s=document.createElement("div");s.style.all="revert",s.id="pendoChatContents",s.style.height="405px";let i=document.createElement("div");i.style.all="revert",i.style.textAlign="center",i.style.height="24px",i.style.width="330px";let d=document.createElement("img");d.style.all="revert",d.id="pendoChatBeta",d.src=chrome.runtime.getURL("/chat/assets/imgs/beta.svg"),i.appendChild(d),s.appendChild(i);let a=document.createElement("div");a.style.all="revert",a.id="pendoChatSubtitle",a.innerText="Your school has turned on teacher chat",a.style.lineHeight="30px",a.style.fontFamily="Roboto, Open Sans",a.style.fontWeight="500",a.style.fontSize="24px",a.style.textAlign="center",a.style.color="#000000",s.appendChild(a);let r=document.createElement("div");r.style.all="revert",r.id="pendoChatDescription",r.style.lineHeight="22px",r.style.fontSize="14px",r.style.textAlign="center",r.style.fontFamily="Roboto, Open Sans",r.style.width="336px",r.innerText="Click the chat button to directly message your teacher.",s.appendChild(r),s.style.all="revert",s.style.color="#000000";let p=document.createElement("img");p.style.all="revert",p.src=chrome.runtime.getURL("/chat/assets/imgs/pendo.png"),p.id="pendoChatImage",p.style.height="181px",p.style.width="336px",p.style.padding="16px 0",p.style.width="100%",p.style.objectFit="cover",s.appendChild(p);let y=document.createElement("div");y.style.all="revert",y.id="pendoChatLinks",y.style.height="18px",y.style.width="330px",y.style.fontSize="12px",y.style.display="flex",y.style.justifyContent="space-between";let c=document.createElement("a");c.style.all="revert",c.style.innerHeight="22px",c.style.margin="0 10px",c.style.color="#0075DB",c.style.fontWeight="bold",c.style.fontFamily="Roboto, Open Sans",c.style.fontSize="14px",c.href="https://dyzz9obi78pm5.cloudfront.net/app/image/id/60ffc732498ccce8297b23c8/n/cw-chat-students-using-classwize-chat.pdf",c.target="_blank",c.style.textDecoration="none",c.innerText="Learn more (Students)";let h=document.createElement("a");h.style.all="revert",h.innerText="Learn more (Parents)",h.style.innerHeight="22px",h.style.margin="0 10px",h.style.color="#0075DB",h.style.fontWeight="bold",h.style.fontFamily="Roboto, Open Sans",h.style.fontSize="14px",h.href="https://dyzz9obi78pm5.cloudfront.net/app/image/id/60ffc735a3abd3de297b23c6/n/cw-chat-parents-faq.pdf",h.target="_blank",h.style.textDecoration="none",y.appendChild(c),y.appendChild(h),s.appendChild(y);let m=document.createElement("div");m.style.all="revert";let u=document.createElement("button");u.style.all="revert",u.id="pendoChatDismissButton",u.style.marginTop="16px",u.innerText="SEND A MESSAGE",u.style.background="#0075DB",u.style.borderRadius="5px",u.style.color="#FFFFFF",u.style.border="0px",u.style.height="50px",u.style.width="330px",u.addEventListener("click",l),m.appendChild(u),s.appendChild(m),t.appendChild(s);let g=document.createElement("div");g.style.all="revert",g.style.height="15px",g.style.width="15px",g.style.transform="rotate(45deg)",g.style.backgroundColor="#FFFFFF",g.style.boxShadow="10px 0 8px -8px rgb(0 0 0 / 25%)",g.style.position="absolute",g.style.bottom="-8px",g.style.right="16px",e.appendChild(t),e.appendChild(g),document.body.appendChild(e),chrome.runtime.sendMessage({type:"SHOW_FAKE_PENDO_1"})}}())}))):(function(){chrome.runtime.sendMessage({type:"CLOSE_CHAT_UI"});let e=document.getElementById("bubbleId");e&&e.parentNode.removeChild(e)}(),e())}))}();