/* ===== CONFIGURAÇÃO (edite aqui) ===== */
const EVENTO = new Date('2026-12-11T19:30:00-03:00');
const PIX_CHAVE = '';          // ex.: '33999999999' ou e-mail/CNPJ. Vazio = visitante pede a chave pelo WhatsApp
const PIX_FAVORECIDO = '';     // ex.: 'Associação Santa Luzia'
const PRECO_COMBO = 20;
const DDD = '33';
const VENDEDORES = [['Ana','99104 6715'],['Patrícia','99989 2165'],['Edmara','99974 6341'],['Ivanece','99193 1353'],['Maria Alice','99909 1570'],['Núbia','99989 7248'],['Roberta','98800 0455'],['Socorro','99913 4887'],['Alessandra','98852 6622'],['Gleice','99983 8393']];
/* ===================================== */
const zapUrl=(num,msg)=>'https://wa.me/55'+DDD+num.replace(/\D/g,'')+'?text='+encodeURIComponent(msg);
const ESC=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const PAGINAS=[['index','Início','index.html'],['premios','Premiações','premios.html'],['causa','A causa','causa.html'],['local','Local','local.html'],['faq','Dúvidas','faq.html'],['pix','Pagar com Pix','pix.html']];
const pagina=document.body.dataset.page;
const nav=document.getElementById('nav');
if(nav)nav.innerHTML=`<nav class="navbar navbar-expand-lg sticky-top"><div class="container">
<a class="navbar-brand" href="index.html" aria-label="BinGuloso, página inicial"><span class="marca"><span class="g">B</span>inGuloso</span></a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="menu"><ul class="navbar-nav ms-auto">${PAGINAS.map(p=>`<li class="nav-item"><a class="nav-link${p[0]===pagina?' active':''}" href="${p[2]}"${p[0]===pagina?' aria-current="page"':''}>${p[1]}</a></li>`).join('')}</ul></div></div></nav>`;
const rodape=document.getElementById('rodape');
if(rodape)rodape.innerHTML=`<footer><div class="container text-center"><p class="marca mb-2">BinGuloso</p><p class="mb-1">Bingo Solidário do Vôlei Master em prol da <a href="https://santaluziavaladares.org/" target="_blank" rel="noopener">Associação Santa Luzia</a></p><p class="mb-1">11/12/2026, a partir das 19h30 · Quadras cobertas do <a href="https://clubefiladelfia.com.br/" target="_blank" rel="noopener">Clube Filadélfia</a></p><p class="small opacity-75 mb-0">#BingoSolidário #VôleiMaster #AjudeComAlegria</p></div></footer>
<a class="zap" id="zap" href="#" target="_blank" rel="noopener" aria-label="Comprar combo pelo WhatsApp"><i class="bi bi-whatsapp"></i></a>`;
/* WhatsApp: sorteia uma organizadora para distribuir os contatos */
const sorteada=VENDEDORES[Math.floor(Math.random()*VENDEDORES.length)];
const msgCompra='Olá! Quero comprar combos de cartelas do BinGuloso do Vôlei Master (11/12).';
document.querySelectorAll('.js-comprar,#zap').forEach(a=>a.href=zapUrl(sorteada[1],msgCompra));
const lista=document.getElementById('vendedores');
if(lista)lista.innerHTML=VENDEDORES.map(v=>`<div class="col-6"><a class="vend" href="${zapUrl(v[1],msgCompra)}" target="_blank" rel="noopener">${v[0]}<span><i class="bi bi-whatsapp"></i></span></a></div>`).join('');
/* Contagem regressiva */
const cd=document.getElementById('contagem');
if(cd){const f=document.getElementById('cd-fim');const t=()=>{let s=Math.floor((EVENTO-new Date())/1000);
if(s<=0){cd.classList.add('d-none');f&&f.classList.remove('d-none');return}
const v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];
cd.querySelectorAll('b').forEach((e,i)=>e.textContent=String(v[i]).padStart(2,'0'))};t();setInterval(t,1000)}
/* Pix */
const pixBox=document.getElementById('pix-chave');
if(pixBox){const tem=PIX_CHAVE.trim()!=='';
document.getElementById('pix-com').classList.toggle('d-none',!tem);document.getElementById('pix-sem').classList.toggle('d-none',tem);
if(tem){pixBox.textContent=PIX_CHAVE;document.getElementById('pix-fav').textContent=PIX_FAVORECIDO}
const copiar=document.getElementById('copiar');
copiar&&copiar.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(PIX_CHAVE);copiar.textContent='Chave copiada!'}catch(e){copiar.textContent='Copie a chave manualmente'}setTimeout(()=>copiar.innerHTML='<i class="bi bi-clipboard"></i> Copiar chave Pix',2500)});
const sel=document.getElementById('f-vend');sel.innerHTML=VENDEDORES.map((v,i)=>`<option value="${i}">${v[0]}</option>`).join('');
const qtd=document.getElementById('f-qtd'),tot=document.getElementById('f-total');
const calc=()=>tot.textContent='R$ '+(Math.max(1,+qtd.value||1)*PRECO_COMBO).toFixed(2).replace('.',',');qtd.addEventListener('input',calc);calc();
document.getElementById('form-pix').addEventListener('submit',e=>{e.preventDefault();
const n=document.getElementById('f-nome').value.trim(),q=Math.max(1,+qtd.value||1),v=VENDEDORES[+sel.value];
const msg=`Olá, ${v[0]}! Fiz o Pix de ${tot.textContent} (${q} combo${q>1?'s':''} de 5 cartelas) para o BinGuloso. Nome: ${n}. Segue o comprovante em anexo.`;
window.open(zapUrl(v[1],msg),'_blank','noopener')})}
