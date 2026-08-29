/* EL PANEL DEL INVESTIGADOR */
const EXP=[
{id:'exp001',titulo:'Espectro Digital',cat:'UI/UX Design',ano:'2024',ico:'\u{1F4DC}',niv:'CONFIDENCIAL',det:'Investigaci\u00F3n profunda de patrones de comportamiento del usuario, wireframing iterativo y prototipado de alta fidelidad para plataforma de pagos digitales.',tech:'Figma, Principle, React Native',fch:'14/03/2024',st:'solved',arc:['/wireframes/flow-main.pdf','/screens/mobile-v3.fig','/prototype/v1.html','/specs/color-system.md']},
{id:'exp002',titulo:'C\u00F3digo Fantasma',cat:'Desarrollo Frontend',ano:'2024',ico:'\u{1F5A5}',niv:'CONFIDENCIAL',det:'Reconstrucci\u00F3n desde cero de un sistema de dise\u00F1o componentizado sobre React con TypeScript. Se eliminaron 15k l\u00EDneas de c\u00F3digo legacy.',tech:'React 18, TypeScript, Storybook, Vite',fch:'22/06/2024',st:'solved',arc:['/src/comp-system/index.tsx','/docs/api.json','/tests/e2e/suite.spec.js']},
{id:'exp003',titulo:'La Firma del Archivo',cat:'Dise\u00F1o de Marca',ano:'2023',ico:'\u{1F589}',niv:'CONFIDENCIAL',det:'Branding desde cero para firma legal. Identidad completa, papeler\u00EDa, web y material impressible con est\u00E9tica cl\u00E1sica-moderna.',tech:'Illustrator, Photoshop, InDesign',fch:'08/11/2023',st:'solved',arc:['/brand/typography.pdf','/brand/color-palette.fig','/brand/logo-final.svg','/brand/moodboard.jpg']},
{id:'exp004',titulo:'El Reloj de Arena',cat:'Sistema Interactivo',ano:'2023',ico:'\u{1F570}',niv:'TOP SECRET',det:'App gamificada para terapia del lenguaje con interfaces visuales intuitivas y mecanismos de recompensa adaptativos.',tech:'Unity, Illustrator, Audacity',fch:'17/08/2023',st:'solved',arc:['/game/sprite-sheet.png','/audio/ambient.wav','/docs/ux-research.md']},
{id:'exp005',titulo:'El Archivo Silente',cat:'Desarrollo Fullstack',ano:'2024',ico:'\u{1F5A6}',niv:'CONFIDENCIAL',det:'Backend completo para gesti\u00F3n documental con OCR y b\u00FAsqueda avanzada. Panel administrativo con visualizaci\u00F3n de l\u00EDnea de tiempo.',tech:'Node.js, PostgreSQL, Vue 3, AWS S3',fch:'05/01/2024',st:'solved',arc:['/db/schema.sql','/docs/architecture.md','/admin/dashboard.vue','/api/routes.js']},
{id:'exp006',titulo:'El C\u00F3digo Roto',cat:'Consultor\u00EDa UX',ano:'2024',ico:'\u{1F9EA}',niv:'ARCHIVADO',det:'An\u00E1lisis heur\u00EDstico completo con testing A/B y mapa de calor. 127 p\u00E1ginas con plan de acci\u00F3n en 3 fases.',tech:'Figma, Hotjar, Maze, GA',fch:'29/04/2024',st:'solved',arc:['/audit/report-full.pdf','/hotspots/map.svg','/recommendations/phase1.md']}
];
let _zc=100;

/* BOOT */
class Boot{
  async go(){
    const L=document.getElementById('boot-text'),B=document.getElementById('boot-bar');
    const msgs=['> BIOS v4.2... OK','> RAM: 65536K... OK','> Cargando kernel...','> mount /expedientes... OK','> daemon PID=1337','> NET: handshake seguro','> CRYPT: AES-256','> CLEARANCE: NIVEL-\u03A9','> ARCHIVOS: 6 expedientes','> UI: escritorio listo...'];
    for(let i=0;i<msgs.length;i++){
      const l=document.createElement('div');L.appendChild(l);
      for(let j=0;j<msgs[i].length;j++){l.textContent=msgs[i].substring(0,j+1);await this.wait(10+Math.random()*15)}
      if(B)B.style.width=((i+1)/msgs.length*95)+'%';
      L.scrollTop=L.scrollHeight;await this.wait(120+Math.random()*100);
    }
    const f=document.createElement('div');f.innerHTML='> SISTEMA LISTO<span class="cur"></span>';L.appendChild(f);await this.wait(500);
    if(B)B.style.width='100%';await this.wait(600);
    document.getElementById('boot-screen').style.opacity='0';document.getElementById('boot-screen').style.transition='opacity .5s';await this.wait(500);
    document.getElementById('desktop').classList.remove('hidden');this.renderFolders();
  }
  wait(ms){return new Promise(r=>setTimeout(r,ms))}
  renderFolders(){
    const g=document.getElementById('grid');
    EXP.forEach(e=>{
      const f=document.createElement('div');f.className='folder';f.dataset.id=e.id;
      f.innerHTML='<span class="ico">'+e.ico+'</span><span class="lbl">'+e.titulo+'</span>';
      f.addEventListener('click',ev=>{ev.stopPropagation();document.querySelectorAll('.folder').forEach(x=>x.classList.remove('sel'));f.classList.add('sel')});
      f.addEventListener('dblclick',()=>Window.open(e));g.appendChild(f);
    });
  }
}

/* WINDOW */
class Window{
  static open(exp){
    let w=document.querySelector('.win[data-id="'+exp.id+'"]');
    if(w){w.style.display='flex';return}
    w=document.createElement('div');w.className='win active';w.style.zIndex=++_zc;w.dataset.id=exp.id;
    const tag=exp.st==='solved'?'ftag ok':'ftag op',tagL=exp.st==='solved'?'RESUELTOS':'ABIERTO';
    const imgs=[];for(let i=0;i<4;i++)imgs.push('<div class="img-ph">IMG_'+(i+1)+'</div>');
    const files=exp.arc.map(f=>'<div class="frow">\u{1F4C4} '+f+'</div>').join('');
    const tags=exp.tech.split(',').map(t=>'<span class="ftag">'+t.trim()+'</span>').join('');
    w.innerHTML='<div class="wtb"><span class="wti">\u{1F4DC} '+exp.titulo+'</span><div class="wb"><button class="cl">\u00D7</button></div></div><div class="wct"><h2>'+exp.titulo+'</h2><div class="meta"><span>CATEGOR\u00CDA:</span> '+exp.cat+'<span>ANO:</span> '+exp.ano+'<span>NIVEL:</span> '+exp.niv+'<span class="'+tag+'">'+tagL+'</span>'+tags+'</div><p class="brief">'+exp.det+'</p><h4>ARCHIVO</h4><div class="files">'+files+'</div><h4>ENTREGABLES</h4><div class="img-row">'+imgs.join('')+'</div></div>';
    document.getElementById('windows-container').appendChild(w);
    let drag=false,dx,dy;const tb=w.querySelector('.wtb');
    tb.addEventListener('mousedown',e=>{drag=true;dx=e.clientX-w.offsetLeft;dy=e.clientY-w.offsetTop;tb.classList.add('dg');w.style.zIndex=++_zc});
    document.addEventListener('mousemove',e=>{if(drag){w.style.left=(e.clientX-dx)+'px';w.style.top=(e.clientY-dy)+'px'}});
    document.addEventListener('mouseup',()=>{drag=false;tb.classList.remove('dg')});
    w.addEventListener('mousedown',()=>{w.style.zIndex=++_zc});
    w.querySelector('.cl').addEventListener('click',()=>w.remove());
  }
}

/* PANEL */
function renderPanel(){
  document.getElementById('panel').innerHTML='<div class="ps"><h3>SISTEMA</h3><div class="ul"></div></div><div class="ps"><div class="pl">ESTADO</div><div class="pv green">\u{25CF} ONLINE</div></div><div class="ps"><div class="pl">EXPEDIENTES</div><div class="pv num">'+EXP.length+'</div></div><div class="ps"><div class="pl">ESTAD\u00CDSTICA</div><div style="margin-top:8px;display:flex;flex-direction:column;gap:5px;font-size:.6rem"><div style="display:flex;justify-content:space-between"><span style="color:#576574">RESUELTOS</span><span style="color:#00ff88">'+EXP.filter(x=>x.st==='solved').length+'</span></div><div style="display:flex;justify-content:space-between"><span style="color:#576574">CLASIFICADOS</span><span style="color:#c9a84c">'+Math.floor(EXP.length/2)+'</span></div><div style="display:flex;justify-content:space-between"><span style="color:#576574">UPTIME</span><span style="color:#00ff88" id="uptime">0s</span></div></div></div><div class="ps"><div class="pl">REGISTRO</div><div class="plog"><div>[SYS] boot_complete</div><div>[NET] secure_host</div><div>[AUTH] clearance=LEVEL-\u03A9</div><div>[FS] /expedientes mounted</div><div>[DB] pool ok</div><div>[MON] ONLINE</div><div>[USR] '+new Date().toLocaleTimeString()+' session</div></div></div>';
  let s=0;setInterval(()=>{s++;const e=document.getElementById('uptime');if(e){const m=Math.floor(s/60);e.textContent=m+'m'+((s%60)<10?'0':'')+(s%60)}},1000);
}

/* TASKBAR */
function renderTaskbar(){
  const t=document.getElementById('taskbar-top');
  const up=()=>{const n=new Date(),f=v=>v.toString().padStart(2,'0');return f(n.getHours())+':'+f(n.getMinutes())+':'+f(n.getSeconds())+' '+n.toLocaleDateString('es-AR')};
  t.innerHTML='<span class="tbar-brand">\u{2318} SISTEMA v2.7b</span><span class="tbar-left">DETECTIVE // CLEARANCE: NIVEL-\u03A9</span><span class="tbar-right" id="clock">'+up()+'</span>';
  setInterval(()=>{const c=document.getElementById('clock');if(c)c.textContent=up()},1000);
}

/* CONSOLE */
function renderConsole(){
  const c=document.querySelector('.console-bar');
  c.innerHTML='<span class="cp">investigador@panel:~$</span><input id="cin" placeholder="_ comando..." spellcheck="false" autocomplete="off">';
  const inp=document.getElementById('cin');
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      const cmd=inp.value.trim().toLowerCase();inp.value='';if(!cmd)return;
      if(cmd==='help')alert('COMANDOS:\n  help - ayuda\n  ls - listar\n  open [id] - abrir\n  date - fecha\n  whoami - usuario');
      else if(cmd==='ls')EXP.forEach(x=>console.log('  '+x.ico+' '+x.titulo+' ['+x.id+']'));
      else if(cmd.startsWith('open ')){const id=cmd.split(' ')[1],exp=EXP.find(e=>e.id===id);if(exp){Window.open(exp);console.log('ABRIENDO: '+exp.titulo)}}
      else if(cmd==='date')console.log(new Date().toString());
      else if(cmd==='whoami')console.log('detective');
      else console.log('comando desconocido: '+cmd);
    }
  });
}

/* INIT */
document.addEventListener('DOMContentLoaded',()=>{renderTaskbar();renderPanel();renderConsole();new Boot().go()});
