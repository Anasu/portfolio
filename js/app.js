/* EL PANEL DEL INVESTIGADOR */
const EXP=[
{id:'exp001',titulo:'E-MANTTO',cat:'Design System · Aeronáutica',ano:'2024',ico:'\u{2708}\u{FE0F}',niv:'CONFIDENCIAL',det:'Design system integral para el área de mantenimiento aeronáutico. Centralización de componentes y optimización de flujos de alta densidad operativa.',tech:'Figma, Design Tokens, AI (MCP), Gobernanza UX, Storybook',fch:'03/2024',st:'solved',arc:['/ds/tokens.json','/ds/components-library.fig','/ds/patterns-guidelines.pdf','/ds/ai-mcp-prompts.json'],impacto:[{lab:'TTM',val:'7→1 mes',desc:'+IA en fase 2'},{lab:'Adopción',val:'+90%',desc:'reutilización en células activas'},{lab:'CSAT',val:'>4.5/5',desc:'satisfacción equipo producto'},{lab:'Escala',val:'~10 prod.',desc:'ecosistema unificado'}],desafio:'El área de mantenimiento operaba con ~10 productos digitales fragmentados, cada uno resolviendo pantallas complejas (filtros, dashboards, formularios) de forma aislada. Esto generaba graves inconsistencias de flujo y UI, elevando el riesgo de error humano en operaciones críticas de seguridad aérea.',estrategia:[{tit:'Diseño para la Densidad',txt:'Traduje la identidad visual a contextos industriales sumamente densos, resguardando accesibilidad y consistencia.'},{tit:'Estandarización Sin Fricción',txt:'Guías de patrones UI/UX (dashboards/filtros avanzados) + plantillas con componentes intercambiables. Síntesis de soluciones existentes para minimizar resistencia al cambio.'},{tit:'Eficiencia con IA',txt:'Modelo MCP + arneses de IA para automatizar tareas operativas diarias del equipo de diseño.'}]},
{id:'exp002',titulo:'FLUJO',cat:'Fintech · Mobile Native',ano:'2023',ico:'\u{1F4B1}',niv:'CONFIDENCIAL',det:'Migración y evolución nativa de app fintech con 2M+ usuarios. Refactoring de arquitectura, rediseño de flujos críticos y optimización de performance.',tech:'React Native, TypeScript, GraphQL, AWS',fch:'08/2023',st:'solved',arc:['/app/flow-diagram.fig','/app/perf-report.pdf','/app/api/schema.json','/app/screens/mobile.fig']},
{id:'exp003',titulo:'PUENTE',cat:'EdTech · Inclusión Digital',ano:'2023',ico:'\u{1F393}\u{FE0F}',niv:'PÚBLICO',det:'Producto digital de educación tecnológica para comunidades en riesgo. Diseño centrado en accesibilidad, baja conectividad y contextos multilingües.',tech:'Vue.js, Node.js, Firebase, Figma',fch:'05/2023',st:'solved',arc:['/bridge/user-research.md','/bridge/accessibility-audit.pdf','/bridge/prototype-v2.fig','/bridge/analytics/dashboard.html']},
{id:'exp004',titulo:'NEXUS',cat:'Dirección Técnica · Creative Tech',ano:'2024',ico:'\u{1F4A1}',niv:'CONFIDENCIAL',det:'Dirección técnica y narrativa visual para proyecto de producto digital. Pipelines de producción, pipelines creativos y coordinación interdisciplinaria.',tech:'Unity, Three.js, Blender, Node.js',fch:'11/2024',st:'solved',arc:['/nexus/pipeline.md','/nexus/visual-bible.pdf','/nexus/tech-specs.json','/nexus/showreel.html']}
];
let _zc=100;

/* BOOT */
class Boot{
  async go(){
    const L=document.getElementById('boot-text'),B=document.getElementById('boot-bar');
    const msgs=['> BIOS v4.2... OK','> RAM: 65536K... OK','> CRYPT: AES-256','> CLEARANCE: NIVEL-\u03A9','> ARCHIVOS: 4 expedientes','> UI: escritorio listo...'];
    for(let i=0;i<msgs.length;i++){
      const l=document.createElement('div');L.appendChild(l);
      for(let j=0;j<msgs[i].length;j++){l.textContent=msgs[i].substring(0,j+1);await this.wait(3+Math.random()*5)}
      if(B)B.style.width=((i+1)/msgs.length*95)+'%';
      L.scrollTop=L.scrollHeight;await this.wait(30+Math.random()*40);
    }
    const f=document.createElement('div');f.innerHTML='> SISTEMA LISTO<span class="cur"></span>';L.appendChild(f);await this.wait(200);
    if(B)B.style.width='100%';
    // sincronizar display:none con la opacidad
    const self=this;
    document.getElementById('boot-screen').style.transition='opacity .3s';
    const bootEl=document.getElementById('boot-screen');
    setTimeout(()=>{bootEl.style.opacity='0'},50);
    window.addEventListener('transitionend',(function handler(ev){if(ev.propertyName==='opacity'){
      window.removeEventListener('transitionend',handler);
      bootEl.style.display='none';
      document.getElementById('desktop').classList.remove('hidden');
      self.renderFolders();
    }}),false);
  }
  wait(ms){return new Promise(r=>setTimeout(r,ms))}
  renderFolders(){
    const g=document.getElementById('grid');
    EXP.forEach(e=>{
      const cat=e.cat.split('·')[0].trim();
      const f=document.createElement('div');f.className='folder';f.dataset.id=e.id;
      f.innerHTML='<span class="ico">'+e.ico+'</span><span class="lbl">'+e.titulo+'</span><span class="cat">'+cat+'</span><span class="lbl-ab" style="display:none">&#x25CB; ABierto</span>';
        f.style.borderColor='#8a5cf0';
      f.addEventListener('click',ev=>{
        ev.stopPropagation();
        document.querySelectorAll('.folder').forEach(x=>x.classList.remove('sel'));
        f.classList.add('sel');
        Window.open(e);
      });g.appendChild(f);
    });
  }
}

/* WINDOW */
class Window{
  static open(exp){
    let w=document.querySelector('.win[data-id="'+exp.id+'"]');
    if(w){w.style.display='flex';return}
    w=document.createElement('div');w.className='win active';w.style.zIndex=++_zc;w.dataset.id=exp.id;
    // posicionamiento en cascada
    const tb=document.querySelector('.taskbar-top');
    const tbH=tb?tb.clientHeight:34;
    const winW=700,winH=400;
    if(!window._lastWinPos){
      // primera ventana: centrada
      window._lastWinPos={left:Math.max(20,(window.innerWidth-winW)/2),top:Math.max(20,Math.floor((window.innerHeight-winH-tbH)/2))};
    }else{
      // siguientes: 40px abajo y 40px derecha de la última
      window._lastWinPos.left=Math.max(20,window._lastWinPos.left+40);
      window._lastWinPos.top=Math.max(20,window._lastWinPos.top+40);
    }
    w.style.left=window._lastWinPos.left+'px';
    w.style.top=window._lastWinPos.top+'px';
    const tag=exp.st==='solved'?'ftag ok':'ftag op',tagL=exp.st==='solved'?'RESUELTOS':'ABIERTO';
    const tags=exp.tech.split(',').map(t=>'<span class="ftag">'+t.trim()+'</span>').join('');
    // sección impacto (si existe)
    let sec='';
    if(exp.impacto&&exp.impacto.length){
      sec+='<h4>RESUMEN DE IMPACTO</h4><div class="impact-grid">';
      exp.impacto.forEach(k=>{sec+='<div class="kpi-item"><div class="kpi-val">'+k.val+'</div><div class="kpi-lab">'+k.lab+'</div><div class="kpi-desc">'+k.desc+'</div></div>'});
      sec+='</div>';
    }
    // sección desafío (si existe)
    if(exp.desafio){sec+='<h4>EL DESAFÍO</h4><p class="section-text">'+exp.desafio+'</p>'}
    // sección estrategia (si existe)
    if(exp.estrategia&&exp.estrategia.length){
      sec+='<h4>ESTRATEGIA Y ACCIÓN</h4>';
      exp.estrategia.forEach(s=>{sec+='<div class="strategy-item"><div class="strategy-title">'+s.tit+'</div><div class="strategy-text">'+s.txt+'</div></div>'});
    }
    // archivos
    const files=exp.arc.map(f=>'<div class="frow">\u{1F4C4} '+f+'</div>').join('');
    // imágenes dummy
    const imgs=[];for(let i=0;i<4;i++)imgs.push('<div class="img-ph">IMG_'+(i+1)+'</div>');
    w.innerHTML='<div class="wtb"><span class="wti">\u{1F4DC} '+exp.titulo+'</span><div class="wb"><button class="cl">\u00D7</button></div></div><div class="wct"><h2>'+exp.titulo+'</h2><div class="meta"><span>CATEGOR\u00CDA:</span> '+exp.cat+'<span>ANO:</span> '+exp.ano+'<span>NIVEL:</span> '+exp.niv+'<span class="'+tag+'">'+tagL+'</span>'+tags+'</div><p class="brief">'+exp.det+'</p>'+sec+(sec?'<h4>ARCHIVOS DEL SISTEMA</h4>':'')+'<div class="files">'+files+'</div><h4>ENTREGABLES</h4><div class="img-row">'+imgs.join('')+'</div></div>';
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
  document.getElementById('panel').innerHTML='<div class="ps"><h3>SISTEMA</h3><div class="ul"></div></div><div class="ps"><div class="pl">ESTADO</div><div class="pv green">\u{25CF} ONLINE</div></div><div class="ps"><div class="pl">EXPEDIENTES</div><div class="pv num">'+EXP.length+'</div></div><div class="ps"><div class="pl">ESTAD\u00CDSTICA</div><div style="margin-top:8px;display:flex;flex-direction:column;gap:5px;font-size:1rem"><div style="display:flex;justify-content:space-between"><span style="color:#576574">RESUELTOS</span><span style="color:#7036E7">'+EXP.filter(x=>x.st==='solved').length+'</span></div><div style="display:flex;justify-content:space-between"><span style="color:#576574">CLASIFICADOS</span><span style="color:#7036E7">'+Math.floor(EXP.length/2)+'</span></div><div style="display:flex;justify-content:space-between"><span style="color:#576574">UPTIME</span><span style="color:#7036E7" id="uptime">0s</span></div></div></div><div class="ps"><div class="pl">REGISTRO</div><div class="plog"><div>[SYS] boot_complete</div><div>[NET] secure_host</div><div>[AUTH] clearance=LEVEL-\u03A9</div><div>[FS] /expedientes mounted</div><div>[DB] pool ok</div><div>[MON] ONLINE</div><div>[USR] '+new Date().toLocaleTimeString()+' session</div></div></div>';
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
