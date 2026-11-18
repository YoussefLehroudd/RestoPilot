'use strict';
const $=(s)=>document.querySelector(s);
const icons=(n)=>`<i data-lucide="${n}"></i>`;
const E=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const img=(s)=>/^https:\/\//.test(String(s||''))?E(s):'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85';
const pics=[
'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=85',
'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85',
'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85',
'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85',
'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=85',
'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=85',
'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=85',
'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=85'];
const today=(off=0)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+off);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const fmt=(d)=>{const a=new Date((d||today())+'T12:00:00');return Number.isNaN(a.getTime())?'—':a.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})};
const initial=n=>String(n||'Guest').split(' ').slice(0,2).map(x=>x[0]).join('').toUpperCase();
const seed=()=>({
 version:3,
 settings:{name:'Atelier Bistro',location:'Casablanca, Morocco',currency:'MAD',phone:'+212 522 000 000',email:'hello@atelierbistro.demo',theme:'light'},
 menu:[
  ['Truffle Tagliatelle','Pasta',145,'Handmade pasta, black truffle cream and parmesan.',0,128],
  ['Margherita Classica','Pizza',95,'San Marzano tomatoes, fresh mozzarella and basil.',1,112],
  ['The Signature Burger','Burgers',119,'Premium beef, aged cheddar and house sauce.',2,96],
  ['Garden Harvest Bowl','Healthy',109,'Seasonal vegetables, greens and fresh grains.',3,84],
  ['Salmon Buddha Bowl','Healthy',155,'Grilled salmon, avocado, rice and sesame.',4,73],
  ['Chocolate Indulgence','Desserts',69,'Chocolate mousse and sweet seasonal berries.',5,66],
  ['Grilled Ribeye Steak','Mains',229,'Flame grilled steak, roasted herbs and jus.',6,52],
  ['Brunch Royale','Breakfast',89,'Eggs, sourdough and seasonal garnish.',7,41]
 ].map((x,i)=>({id:i+1,name:x[0],category:x[1],price:x[2],description:x[3],image:pics[x[4]],sold:x[5],available:i!==7})),
 orders:[
 ['Sofia Martin','Truffle Tagliatelle',145,'new','Dine in',0],
 ['Yassine El Amrani','Margherita Classica',190,'preparing','Dine in',0],
 ['Lina Bennani','The Signature Burger',238,'ready','Takeaway',0],
 ['Adam Mansouri','Salmon Buddha Bowl',155,'paid','Delivery',0],
 ['Emma Wilson','Garden Harvest Bowl',109,'paid','Dine in',-1],
 ['Omar Haddad','Truffle Tagliatelle',290,'paid','Dine in',-1],
 ['Noah Thomas','Margherita Classica',190,'paid','Takeaway',-2],
 ['Sara Idrissi','Grilled Ribeye Steak',229,'paid','Dine in',-2],
 ['Jules Bernard','Chocolate Indulgence',138,'paid','Delivery',-3],
 ['Imane Amrani','The Signature Burger',119,'paid','Takeaway',-3],
 ['Lucas Moreau','Salmon Buddha Bowl',310,'paid','Dine in',-4],
 ['Nora Belkacem','Brunch Royale',178,'paid','Dine in',-5],
 ['Ahmed Said','Margherita Classica',95,'paid','Takeaway',-6]
 ].map((x,i)=>({id:1048-i,customer:x[0],item:x[1],amount:x[2],status:x[3],channel:x[4],date:today(x[5]),table:x[4]==='Dine in'?'T-04':'—'})),
 tables:Array.from({length:16},(_,i)=>({id:i+1,name:`T-${String(i+1).padStart(2,'0')}`,seats:i%4===0?6:i%3===0?2:4,zone:i<8?'Main Dining':i<12?'Terrace':'Private Lounge',status:['available','occupied','reserved','available'][i%4]})),
 reservations:[
  ['Sarah & Friends',0,'19:30',4,'T-03','confirmed'],
  ['Mohamed Rami',0,'20:00',2,'T-07','confirmed'],
  ['Nadia Karim',1,'18:30',6,'T-09','confirmed'],
  ['Ben Thompson',1,'21:00',3,'T-12','pending'],
  ['Imane Amrani',2,'19:00',4,'T-04','confirmed']
 ].map((x,i)=>({id:i+1,customer:x[0],date:today(x[1]),time:x[2],guests:x[3],table:x[4],status:x[5]})),
 inventory:[
  ['Fresh Tomatoes','Produce',26,'kg',10],['Mozzarella Cheese','Dairy',4,'kg',8],
  ['Pasta Flour','Dry Goods',36,'kg',12],['Atlantic Salmon','Seafood',3,'kg',7],
  ['Premium Beef','Meat',22,'kg',9],['Fresh Basil','Produce',2,'kg',4],
  ['Olive Oil','Dry Goods',18,'L',6],['Arborio Rice','Dry Goods',30,'kg',10]
 ].map((x,i)=>({id:i+1,name:x[0],category:x[1],quantity:x[2],unit:x[3],min:x[4]})),
 customers:[
  ['Sofia Martin','sofia@example.com',12,'VIP'],['Yassine El Amrani','yassine@example.com',8,'Regular'],
  ['Lina Bennani','lina@example.com',17,'VIP'],['Adam Mansouri','adam@example.com',5,'Regular'],
  ['Emma Wilson','emma@example.com',3,'New'],['Omar Haddad','omar@example.com',11,'VIP']
 ].map((x,i)=>({id:i+1,name:x[0],email:x[1],phone:`+212 600 100 10${i+1}`,visits:x[2],segment:x[3]})),
 staff:[
  ['Amine Zahraoui','Restaurant Manager','Morning','active'],['Sara El Fassi','Head Chef','Evening','active'],
  ['Younes Rahmani','Waiter','Morning','active'],['Leila Amrani','Host','Evening','active'],
  ['Karim Saidi','Sous Chef','Evening','inactive']
 ].map((x,i)=>({id:i+1,name:x[0],role:x[1],shift:x[2],email:`team${i+1}@atelier.demo`,status:x[3]}))
});
let db;try{db=JSON.parse(localStorage.getItem('restopilot-v3'));if(!db||db.version!==3)db=seed()}catch{db=seed()}
const save=()=>{try{localStorage.setItem('restopilot-v3',JSON.stringify(db))}catch{}};
const money=n=>Number(n||0).toLocaleString('en-US',{maximumFractionDigits:2})+' '+E(db.settings.currency);
const nav=[
 ['WORKSPACE',[['overview','layout-dashboard','Overview'],['orders','shopping-bag','Orders'],['tables','armchair','Table Management'],['reservations','calendar-days','Reservations'],['menu','book-open','Menu Management']]],
 ['MANAGEMENT',[['inventory','package','Inventory'],['customers','users','Customers'],['staff','users-round','Team & Staff']]],
 ['INSIGHTS',[['analytics','chart-no-axes-combined','Analytics'],['settings','settings','Settings']]],
 ['SHOWCASE',[['guest','external-link','Customer menu preview']]]
];
const names={overview:'Overview',orders:'Orders',tables:'Table Management',reservations:'Reservations',menu:'Menu Management',inventory:'Inventory',customers:'Customers',staff:'Team & Staff',analytics:'Analytics',settings:'Settings'};
const statuses={orders:['new','preparing','ready','paid'],tables:['available','occupied','reserved'],reservations:['pending','confirmed','completed','cancelled'],staff:['active','inactive']};
let page='overview',query='',filter='all',range=7,guestCat='All',cartCount=0,editState=null,charts=[];
const refresh=()=>{if(window.lucide?.createIcons)window.lucide.createIcons()};
function toast(t){const x=document.createElement('div');x.className='toast';x.innerHTML=icons('check-circle-2')+'<span>'+E(t)+'</span>';$('#toastRoot')?.append(x);refresh();setTimeout(()=>x.remove(),3200)}
function btn(text,act,cls='btn',extra=''){return `<button class="${cls}" data-action="${act}" ${extra}>${text}</button>`}
function add(k,t='Add new'){return btn(icons('plus')+t,'add','btn',`data-kind="${k}"`)}
function exp(k){return btn(icons('download')+' Export CSV','export','btn btn-light',`data-kind="${k}"`)}
function head(title,description,actions=''){return `<div class="heading-row"><div><div class="page-eyebrow">RESTAURANT CONTROL CENTER</div><h1 class="page-title">${title}</h1><p class="page-subtitle">${description}</p></div><div class="heading-actions">${actions}</div></div>`}
function panelHead(title,description='',right=''){return `<div class="panel-heading"><div><h3>${title}</h3>${description?`<p>${description}</p>`:''}</div>${right}</div>`}
function jump(p,label='View all'){return `<button class="panel-link" data-page="${p}">${label} ${icons('arrow-right')}</button>`}
function stat(title,value,note,icon,i){return `<article class="stat-card"><div class="stat-upper"><span class="stat-icon ${['t-orange','t-green','t-blue','t-purple'][i%4]}">${icons(icon)}</span><span class="stat-trend neutral">DEMO DATA</span></div><p class="stat-label">${title}</p><div class="stat-value">${value}</div><div class="stat-note">${note}</div></article>`}
function stats(arr){return `<div class="stats-grid">${arr.map((x,i)=>stat(...x,i)).join('')}</div>`}
function badge(value,cls=value){return `<span class="badge ${E(String(cls).toLowerCase())}">${E(value)}</span>`}
const avatarOverrides={'Alex Laurent':68,'Sofia Martin':32,'Yassine El Amrani':12,'Lina Bennani':47,'Adam Mansouri':15,'Emma Wilson':44,'Omar Haddad':14,'Noah Thomas':13,'Sara Idrissi':45,'Jules Bernard':11,'Imane Amrani':48,'Lucas Moreau':33,'Nora Belkacem':46,'Ahmed Said':18,'Amine Zahraoui':16,'Sara El Fassi':49,'Younes Rahmani':21,'Leila Amrani':38,'Karim Saidi':22};
function avatarUrl(name){let n=avatarOverrides[name];if(!n){let hash=0;for(const ch of String(name))hash=((hash<<5)-hash+ch.charCodeAt(0))|0;n=1+(Math.abs(hash)%70)}return 'https://i.pravatar.cc/120?img='+n}
function avatar(name){return `<span class="mini-avatar avatar-frame"><img class="avatar-image" alt="${E(name)}" loading="lazy" referrerpolicy="no-referrer" src="${avatarUrl(name)}" onerror="this.style.display='none'"><span class="avatar-initials">${E(initial(name))}</span></span>`}
function person(name){return `<span class="table-cell-flex">${avatar(name)}<span class="strong">${E(name)}</span></span>`}
function image(src,cl){return `<img class="${cl}" src="${img(src)}" loading="lazy" alt="Dish photo" onerror="this.onerror=null;this.src='${pics[4]}'">`}
function actionCells(kind,id){return `<div class="row-actions"><button data-action="edit" data-kind="${kind}" data-id="${id}" class="small-icon" aria-label="Edit">${icons('pencil')}</button><button data-action="delete" data-kind="${kind}" data-id="${id}" class="small-icon" aria-label="Delete">${icons('trash-2')}</button></div>`}
function statusSelect(kind,item){return `<select class="status-select" data-status="${kind}" data-id="${item.id}">${statuses[kind].map(x=>`<option value="${x}" ${x===item.status?'selected':''}>${E(x.charAt(0).toUpperCase()+x.slice(1))}</option>`).join('')}</select>`}
function cells(a){return `<tr>${a.map(v=>`<td>${v}</td>`).join('')}</tr>`}
function table(headers,rows){return `<div class="table-scroll"><table class="data-table"><thead><tr>${headers.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.length?rows.join(''):`<tr><td colspan="${headers.length}"><div class="empty">${icons('search-x')}<h3>No matching records</h3><p>Try another search or add a new record.</p></div></td></tr>`}</tbody></table></div>`}
const paid=()=>db.orders.filter(x=>x.status==='paid');
const revenue=()=>paid().reduce((a,x)=>a+Number(x.amount),0);
const low=()=>db.inventory.filter(x=>x.quantity<=x.min);
const rowsOrders=a=>a.map(o=>cells([`<span class="strong">#RP-${o.id}</span>`,person(o.customer),E(o.item),`<span class="strong nowrap">${money(o.amount)}</span>`,badge(o.status),`<time class="table-date" datetime="${E(o.date)}">${fmt(o.date)}</time>`,statusSelect('orders',o),actionCells('orders',o.id)]));
function duration(){return `<div class="chart-controls"><button data-range="7" class="${range===7?'active':''}">7 days</button><button data-range="30" class="${range===30?'active':''}">30 days</button></div>`}
function graph(){
 if(!window.Chart)return;
 const entries=Array.from({length:range},(_,i)=>{const d=today(i-range+1);return {d,v:paid().filter(o=>o.date===d).reduce((a,o)=>a+o.amount,0)}});
 const axes={x:{grid:{display:false},ticks:{color:'#98a5b4',font:{size:10},maxTicksLimit:8}},y:{beginAtZero:true,grid:{color:db.settings.theme==='dark'?'#344156':'#eef1f5'},ticks:{color:'#98a5b4',font:{size:10}}}};
 const node=$('#revenueChart');if(node)charts.push(new Chart(node,{type:'line',data:{labels:entries.map(x=>fmt(x.d).slice(0,6)),datasets:[{data:entries.map(x=>x.v),label:'Paid revenue',borderColor:'#fa7550',backgroundColor:'#fa75501b',fill:true,tension:.4,borderWidth:3,pointRadius:3,pointBackgroundColor:'#fff',pointBorderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:axes}}));
 const c=$('#channelsChart');if(c){const chans=['Dine in','Takeaway','Delivery'];charts.push(new Chart(c,{type:'doughnut',data:{labels:chans,datasets:[{data:chans.map(n=>db.orders.filter(x=>x.channel===n).length),backgroundColor:['#fa7550','#718de9','#59bfa1'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'72%',plugins:{legend:{position:'bottom',labels:{color:'#98a5b4',usePointStyle:true,boxWidth:8}}}}}))}
}
function popular(){return [...db.menu].sort((a,b)=>b.sold-a.sold).slice(0,4).map((m,i)=>`<div class="dish-row"><span class="rank-num">0${i+1}</span>${image(m.image,'dish-thumb')}<div class="dish-info"><strong>${E(m.name)}</strong><small>${E(m.category)} · ${m.sold} demo sales</small></div><span class="dish-price">${money(m.price)}</span></div>`).join('')}
function overview(){return head(`Good ${new Date().getHours()<12?'morning':new Date().getHours()<18?'afternoon':'evening'}, Alex 👋`,'Here is what is happening at your restaurant today.',exp('orders')+add('orders','New order'))+
 `<section class="hero"><div class="hero-text"><div class="hero-pill">${icons('sparkles')} THE RESTOPILOT EXPERIENCE</div><h2>A better way to run<br><em>every great service.</em></h2><p>From the first reservation to the last order, keep every detail beautifully organized.</p>${btn(icons('eye')+' Explore guest experience '+icons('arrow-up-right'),'guest')}</div><div class="hero-art">${image(pics[3],'hero-food')}</div></section>`+
 stats([['Revenue from paid orders',money(revenue()),'Recorded in this demo','wallet'],['Total orders',db.orders.length,`${db.orders.filter(o=>o.date===today()).length} dated today`,'shopping-bag'],['Reserved tables',db.tables.filter(x=>x.status==='reserved').length,'Upcoming arrivals','armchair'],['Low stock items',low().length,'Ingredients to restock','package-search']])+
 `<div class="content-grid"><section class="panel">${panelHead('Revenue overview','Revenue based on paid demo orders',duration())}<div class="chart-holder"><canvas id="revenueChart"></canvas></div></section><section class="panel">${panelHead('Most loved dishes','Your customers keep coming back for these',jump('menu'))}<div class="dish-list">${popular()}</div></section></div>`+
 `<div class="content-grid section-spacer"><section class="panel">${panelHead('Recent orders','Manage and track the latest incoming orders',jump('orders'))}${table(['ORDER','CUSTOMER','DISH','AMOUNT','STATUS','DATE','UPDATE',''],rowsOrders(db.orders.slice(0,5)))}</section><section class="panel">${panelHead('Quick actions','Everything you need in a tap')}<div class="quick-steps"><button class="quick-action" data-action="add" data-kind="orders">${icons('shopping-bag')}New order</button><button class="quick-action" data-action="add" data-kind="reservations">${icons('calendar-plus')}Reservation</button><button class="quick-action" data-action="add" data-kind="menu">${icons('utensils')}Add dish</button></div><div class="insight-banner section-spacer">${icons('lightbulb')}<p><strong>Heads up!</strong> ${low().length} ingredients need attention. <button class="small-link" data-page="inventory">Check stock</button></p></div></section></div>`}
function controls(placeholder,values=[]){return `<div class="page-controls"><div class="filters"><div class="input-wrap">${icons('search')}<input type="search" id="listSearch" value="${E(query)}" placeholder="${placeholder}" aria-label="Search records"></div>${values.length?`<select id="listFilter" class="select"><option value="all">All filters</option>${values.map(v=>`<option value="${E(v)}" ${filter===v?'selected':''}>${E(v)}</option>`).join('')}</select>`:''}</div><span class="record-count" id="resultCount"></span></div>`}
function orderPage(){return head('Orders','Your kitchen, your orders, all under control.',exp('orders')+add('orders','Create order'))+
 stats([['All orders',db.orders.length,'Total demo orders','shopping-bag'],['Active orders',db.orders.filter(o=>o.status!=='paid').length,'In progress','clock-3'],['Paid orders',paid().length,'Processed orders','check-check'],['Total order value',money(db.orders.reduce((a,o)=>a+o.amount,0)),'All orders','receipt-text']])+
 controls('Search customer, dish, order ID...',['new','preparing','ready','paid'])+
 `<section class="panel">${panelHead('Order management','Track, edit and complete orders')}<div id="results">${orderResults()}</div></section>`}
function orderResults(){return table(['ORDER ID','CUSTOMER','DISH','AMOUNT','STATUS','DATE','UPDATE',''],rowsOrders(list('orders',['id','customer','item','channel']).sort((a,b)=>b.id-a.id)))}
function tablesPage(){const state=['available','occupied','reserved'];return head('Table Management','Visualize your restaurant floor at a glance.',add('tables','Add table'))+
 stats([['Total tables',db.tables.length,'Across all areas','layout-grid'],['Available',db.tables.filter(x=>x.status==='available').length,'Open for guests','check-circle-2'],['Occupied',db.tables.filter(x=>x.status==='occupied').length,'Currently seated','utensils'],['Reserved',db.tables.filter(x=>x.status==='reserved').length,'Upcoming guests','calendar-check']])+
 `<section class="panel section-spacer">${panelHead('Floor plan','Click a table to change its status',`<div class="table-legend"><span><i class="dot"></i>Available</span><span><i class="dot occupied"></i>Occupied</span><span><i class="dot reserved"></i>Reserved</span></div>`)}${[...new Set(db.tables.map(x=>x.zone))].map(zone=>`<div class="zone-title section-spacer">${icons('armchair')}${E(zone)}</div><div class="table-grid">${db.tables.filter(x=>x.zone===zone).map(t=>`<button class="table-tile ${t.status}" data-action="cycle" data-id="${t.id}"><span class="table-icon">${icons('armchair')}</span><strong>${E(t.name)}</strong><small>${t.seats} seats</small><div style="margin-top:9px">${badge(t.status)}</div></button>`).join('')}</div>`).join('')}</section>`}
function menuCards(a){return a.map(m=>`<article class="menu-card"><div class="menu-cover">${image(m.image,'menu-image')}${badge(m.available?'Available':'Unavailable',m.available?'available':'inactive')}</div><div class="menu-body"><div class="menu-cat">${E(m.category)}</div><h3>${E(m.name)}</h3><p>${E(m.description)}</p><div class="menu-meta"><strong>${money(m.price)}</strong>${actionCells('menu',m.id)}</div></div></article>`).join('')}
function menuPage(){const cat=[...new Set(db.menu.map(m=>m.category))];return head('Menu Management','Make your menu as memorable as your food.',btn(icons('eye')+' Guest preview','guest','btn btn-light')+add('menu','Add dish'))+
 stats([['Menu items',db.menu.length,'Dishes on the menu','book-open'],['Available',db.menu.filter(m=>m.available).length,'Ready to order','check-circle'],['Categories',cat.length,'Food groupings','layers'],['Average price',money(db.menu.reduce((a,m)=>a+m.price,0)/(db.menu.length||1)),'Across all dishes','badge-dollar-sign']])+
 controls('Search dishes and ingredients...',cat)+`<div class="menu-grid" id="results">${menuCards(list('menu',['name','category','description']))}</div>`}
function reservationRows(){return list('reservations',['customer','date','time','table']).sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)).map(r=>cells([person(r.customer),`<time class="table-date" datetime="${E(r.date)}">${fmt(r.date)}</time>`,E(r.time),`<span class="table-party">${r.guests} guests</span>`,E(r.table),badge(r.status),statusSelect('reservations',r),actionCells('reservations',r.id)]))}
function reservationPage(){return head('Reservations','A seamless welcome starts before guests arrive.',exp('reservations')+add('reservations','New reservation'))+
 stats([['Reservations',db.reservations.length,'Total bookings','calendar-days'],["Today's arrivals",db.reservations.filter(r=>r.date===today()).length,'Expected today','calendar-check'],['Confirmed',db.reservations.filter(r=>r.status==='confirmed').length,'Booked tables','check-circle'],['Expected guests',db.reservations.filter(r=>r.status!=='cancelled').reduce((a,r)=>a+r.guests,0),'Across active bookings','users']])+
 controls('Search guest, date, table...',['pending','confirmed','completed','cancelled'])+
 `<section class="panel">${panelHead('Guest reservations','Bookings, arrival times and statuses')}<div id="results">${table(['GUEST','DATE','TIME','PARTY','TABLE','STATUS','UPDATE',''],reservationRows())}</div></section>`}
function inventoryRows(){return list('inventory',['name','category','unit']).map(i=>{const isLow=i.quantity<=i.min;return cells([`<span class="strong">${E(i.name)}</span>`,E(i.category),`${i.quantity} ${E(i.unit)}`,`<div class="inventory-meter"><span class="${isLow?'low':''}" style="width:${Math.min(100,i.min?i.quantity/i.min*50:100)}%"></span></div>`,badge(isLow?'Low':'Healthy',isLow?'low':'healthy'),actionCells('inventory',i.id)])})}
function inventoryPage(){return head('Inventory','Stay stocked and one step ahead of every service.',exp('inventory')+add('inventory','Add ingredient'))+
 stats([['Ingredients',db.inventory.length,'Tracked items','package'],['Healthy stock',db.inventory.length-low().length,'Above minimum','badge-check'],['Low stock alerts',low().length,'Restock recommended','alert-triangle'],['Categories',new Set(db.inventory.map(x=>x.category)).size,'Stock groups','boxes']])+
 (low().length?`<div class="insight-banner section-spacer">${icons('alert-triangle')}<p><strong>Stock attention:</strong> ${E(low().map(i=>i.name).join(', '))} need restocking.</p></div>`:'')+
 controls('Search ingredients...')+`<section class="panel">${panelHead('Ingredient stock levels','Realistic demo thresholds')}<div id="results">${table(['INGREDIENT','CATEGORY','ON HAND','STOCK HEALTH','STATUS',''],inventoryRows())}</div></section>`}
function customerRows(){return list('customers',['name','email','phone','segment']).map(c=>cells([person(c.name),E(c.email),`<span class="table-phone" dir="ltr">${E(c.phone)}</span>`,`<strong>${c.visits}</strong>`,badge(c.segment,c.segment==='VIP'?'served':c.segment==='New'?'new':'available'),actionCells('customers',c.id)]))}
function customersPage(){return head('Customers','Good hospitality begins with knowing your guests.',exp('customers')+add('customers','Add customer'))+
 stats([['Customer profiles',db.customers.length,'Saved contacts','users'],['VIP guests',db.customers.filter(c=>c.segment==='VIP').length,'Favorite regulars','crown'],['Total visits',db.customers.reduce((a,c)=>a+c.visits,0),'Across profiles','footprints'],['New guests',db.customers.filter(c=>c.segment==='New').length,'Discovering your place','user-plus']])+
 controls('Search name, email, phone...')+`<section class="panel">${panelHead('Guest directory','Manage customers and visit history')}<div id="results">${table(['CUSTOMER','EMAIL','PHONE','VISITS','SEGMENT',''],customerRows())}</div></section>`}
function staffRows(){return list('staff',['name','role','email','shift']).map(s=>cells([person(s.name),E(s.role),E(s.shift),E(s.email),badge(s.status),statusSelect('staff',s),actionCells('staff',s.id)]))}
function staffPage(){return head('Team & Staff','Your people make every experience exceptional.',exp('staff')+add('staff','Add team member'))+
 stats([['Team size',db.staff.length,'All employees','users'],['Active staff',db.staff.filter(s=>s.status==='active').length,'Currently employed','check-circle'],['Morning shifts',db.staff.filter(s=>s.shift==='Morning').length,'Scheduled morning','sun'],['Evening shifts',db.staff.filter(s=>s.shift==='Evening').length,'Scheduled evening','moon-star']])+
 controls('Search team name or role...',['active','inactive'])+`<section class="panel">${panelHead('Team directory','Staff roles and shifts')}<div id="results">${table(['TEAM MEMBER','ROLE','SHIFT','EMAIL','STATUS','UPDATE',''],staffRows())}</div></section>`}
function analyticsPage(){return head('Analytics & Insights','See what is working and grow with confidence.',exp('orders'))+
 stats([['Paid revenue',money(revenue()),'Completed demo sales','wallet'],['Avg. paid order',money(revenue()/(paid().length||1)),'Across paid orders','chart-line'],['Paid orders',paid().length,'Revenue-generating orders','badge-check'],['Reservations',db.reservations.length,'Guest bookings','calendar-days']])+
 `<div class="analytics-row"><section class="panel">${panelHead('Sales performance','Revenue from paid orders',duration())}<div class="chart-holder tall"><canvas id="revenueChart"></canvas></div></section><section class="panel">${panelHead('Order channels','Dine in, takeaway and delivery')}<div class="chart-holder tall"><canvas id="channelsChart"></canvas></div></section></div>`+
 `<div class="content-grid equal section-spacer"><section class="panel">${panelHead('Top selling dishes','Illustrative demo sales counts')}${[...db.menu].sort((a,b)=>b.sold-a.sold).slice(0,5).map(m=>`<div class="hbar"><div class="hbar-heading"><strong>${E(m.name)}</strong><span>${m.sold} sales</span></div><div class="hbar-track"><div class="hbar-fill" style="width:${m.sold/(Math.max(1,...db.menu.map(x=>x.sold)))*100}%"></div></div></div>`).join('')}</section><section class="panel">${panelHead('Operational snapshot','Current demo data')}<div class="dish-list">${[['Open orders',db.orders.filter(o=>o.status!=='paid').length],['Reserved tables',db.tables.filter(t=>t.status==='reserved').length],['Low stock items',low().length],['Active team members',db.staff.filter(s=>s.status==='active').length]].map(([n,v])=>`<div class="dish-row"><span class="stat-icon t-orange">${icons('activity')}</span><div class="dish-info"><strong>${n}</strong><small>Current status</small></div><span class="dish-price">${v}</span></div>`).join('')}</div></section></div>`}
function settingsPage(){return head('Settings','Fine-tune your workspace and personalize the experience.')+
 `<div class="settings-grid section-spacer"><section class="panel">${panelHead('Restaurant profile','Update details about your demo restaurant')}<form id="settingsForm"><div class="field"><label for="s-name">Restaurant name</label><input id="s-name" name="name" required value="${E(db.settings.name)}"></div><div class="field-row"><div class="field"><label for="s-location">Location</label><input id="s-location" name="location" value="${E(db.settings.location)}"></div><div class="field"><label for="s-currency">Currency</label><select id="s-currency" name="currency">${['MAD','EUR','USD','GBP'].map(c=>`<option ${c===db.settings.currency?'selected':''}>${c}</option>`).join('')}</select></div></div><div class="field-row"><div class="field"><label for="s-email">Email</label><input id="s-email" type="email" name="email" value="${E(db.settings.email)}"></div><div class="field"><label for="s-phone">Phone number</label><input id="s-phone" name="phone" value="${E(db.settings.phone)}"></div></div><button class="btn" type="submit">${icons('save')} Save preferences</button></form></section><div class="stack"><section class="panel">${panelHead('Appearance','Make the dashboard yours')}<div class="settings-hint">${icons('palette')}<strong>Theme preference</strong><p>Choose light or dark mode. Your preference is saved locally.</p><div class="action-inline section-spacer">${btn(icons('sun')+' Light','theme',db.settings.theme==='light'?'btn':'btn btn-light','data-value="light"')}${btn(icons('moon')+' Dark','theme',db.settings.theme==='dark'?'btn':'btn btn-light','data-value="dark"')}</div></div></section><section class="panel settings-danger">${panelHead('Demo controls','Start from a clean slate')}<p class="page-subtitle">All edits are stored in this browser only. Resetting removes changes.</p><div class="section-spacer">${btn(icons('rotate-ccw')+' Reset demo data','reset','btn btn-danger')}</div></section></div></div>`}
const views={overview,orders:orderPage,tables:tablesPage,reservations:reservationPage,menu:menuPage,inventory:inventoryPage,customers:customersPage,staff:staffPage,analytics:analyticsPage,settings:settingsPage};
function list(kind,keys){return db[kind].filter(x=>(filter==='all'||(x.status||x.category)===filter)&&keys.some(k=>String(x[k]??'').toLowerCase().includes(query.toLowerCase())))}
function navRender(){$('#workspaceName').textContent=db.settings.name;$('#sideNav').innerHTML=nav.map(([title,links])=>`<div class="nav-label">${title}</div>${links.map(([id,ic,t])=>`<button class="side-link ${id===page?'active':''}" data-page="${id}">${icons(ic)}<span>${t}</span>${id==='orders'&&db.orders.some(o=>o.status==='new')?`<span class="count">${db.orders.filter(o=>o.status==='new').length}</span>`:''}</button>`).join('')}`).join('')}
function syncHeaderThemeButtons(){
 const theme=db.settings.theme==='dark'?'dark':'light';
 for(const mode of ['light','dark']){
  const control=document.getElementById(mode==='light'?'lightModeBtn':'darkModeBtn');
  if(!control)continue;
  const selected=theme===mode;
  control.classList.toggle('active',selected);
  control.setAttribute('aria-pressed',String(selected));
 }
}
function render(){charts.forEach(c=>c.destroy());charts=[];document.body.classList.toggle('dark',db.settings.theme==='dark');$('#breadcrumb').textContent=names[page];navRender();$('#pageContent').innerHTML=(views[page]||overview)();refresh();enhanceSelects();syncNotificationBadge();syncHeaderThemeButtons();if(page==='overview'||page==='analytics')graph();const count=$('#resultCount');if(count)count.textContent=`${list(page,{orders:['id','customer','item','channel'],menu:['name','category','description'],reservations:['customer','date','table'],inventory:['name','category'],customers:['name','email','phone'],staff:['name','role']}[page]||['name']).length} records`}
function go(p){if(p==='guest'){openGuest();return}if(!views[p])p='overview';page=p;query='';filter='all';location.hash=p;$('#sidebar').classList.remove('open');$('#mobileShade').classList.remove('open');render();window.scrollTo(0,0)}
function openGuest(){window.open(location.origin+location.pathname+'?guest=1','_blank','noopener,noreferrer')}
function guestRender(){document.body.classList.remove('dark');document.body.innerHTML=`<div class="guest-shell"><header class="guest-head"><div class="guest-brand">resto<span>pilot.</span></div><a class="btn btn-light" href="${E(location.pathname+'#overview')}">${icons('layout-dashboard')} Owner dashboard</a></header><section class="guest-hero"><div class="guest-intro"><div class="hero-pill">✦ A RESTOPILOT EXPERIENCE</div><h1>${E(db.settings.name)}</h1><p>Good food. Great company. Unforgettable moments. Explore our signature dishes.</p></div></section><main class="guest-main"><div class="heading-row"><div><div class="page-eyebrow">FRESHLY MADE WITH LOVE</div><h2 style="font-size:27px;margin:0">Explore our menu</h2><p class="page-subtitle">${E(db.settings.location)}</p></div><button id="guestCart" class="btn btn-dark">${icons('shopping-bag')} Cart <span id="cartCount">0</span></button></div><div class="guest-cats" id="guestCats"></div><div class="guest-grid" id="guestItems"></div></main><footer class="guest-footer">Made with ♡ · Powered by RestoPilot · Interactive demo, no real purchases</footer></div><div class="toast-root" id="toastRoot"></div>`;guestItems();refresh()}
function guestItems(){const cats=['All',...new Set(db.menu.filter(m=>m.available).map(m=>m.category))];$('#guestCats').innerHTML=cats.map(c=>`<button data-guest-cat="${E(c)}" class="${c===guestCat?'active':''}">${E(c)}</button>`).join('');$('#guestItems').innerHTML=db.menu.filter(m=>m.available&&(guestCat==='All'||m.category===guestCat)).map(m=>`<article class="guest-card">${image(m.image,'guest-image')}<div class="guest-body"><div class="menu-cat">${E(m.category)}</div><strong>${E(m.name)}</strong><p>${E(m.description)}</p><div class="flex-between"><b>${money(m.price)}</b><button class="btn btn-sm" data-guest-add="${m.id}">${icons('plus')} Add to cart</button></div></div></article>`).join('');refresh()}
const formFields={
 orders:[['customer','Customer name','text'],['item','Dish','menu'],['amount','Amount','number'],['date','Date','date'],['channel','Sales channel','select:Dine in|Takeaway|Delivery'],['table','Table reference','text'],['status','Order status','select:new|preparing|ready|paid']],
 tables:[['name','Table name','text'],['zone','Area','select:Main Dining|Terrace|Private Lounge'],['seats','Number of seats','number'],['status','Status','select:available|occupied|reserved']],
 reservations:[['customer','Guest name','text'],['date','Date','date'],['time','Arrival time','time'],['guests','Number of guests','number'],['table','Table reference','text'],['status','Status','select:pending|confirmed|completed|cancelled']],
 menu:[['name','Dish name','text'],['category','Category','text'],['price','Price','number'],['description','Description','textarea'],['image','Image URL (https)','url'],['available','Available','boolean'],['sold','Demo sales count','number']],
 inventory:[['name','Ingredient name','text'],['category','Category','text'],['quantity','Quantity','number'],['unit','Unit','text'],['min','Minimum stock','number']],
 customers:[['name','Full name','text'],['email','Email address','email'],['phone','Phone number','text'],['visits','Visits','number'],['segment','Segment','select:New|Regular|VIP']],
 staff:[['name','Full name','text'],['role','Role','text'],['shift','Shift','select:Morning|Evening|Night'],['email','Email','email'],['status','Status','select:active|inactive']]
};
function formModal(kind,id=null){const obj=id===null?null:db[kind].find(x=>x.id===id);if(!formFields[kind])return;editState={kind,id};const markup=formFields[kind].map(([k,t,type])=>{let v=obj?.[k]??(k==='date'?today():k==='status'?(statuses[kind]?.[0]||'active'):k==='available'?true:k==='item'?db.menu[0]?.name:k==='amount'?db.menu[0]?.price:k==='channel'?'Dine in':'');let html='';if(type==='textarea')html=`<textarea name="${k}" id="f-${k}">${E(v)}</textarea>`;else if(type==='boolean')html=`<select name="${k}" id="f-${k}"><option value="true" ${v===true?'selected':''}>Yes</option><option value="false" ${v===false?'selected':''}>No</option></select>`;else if(type==='menu')html=`<select name="${k}" id="f-${k}">${db.menu.map(m=>`<option value="${E(m.name)}" ${v===m.name?'selected':''}>${E(m.name)}</option>`).join('')}</select>`;else if(type.startsWith('select:'))html=`<select name="${k}" id="f-${k}">${type.slice(7).split('|').map(x=>`<option value="${E(x)}" ${x===v?'selected':''}>${E(x)}</option>`).join('')}</select>`;else html=`<input id="f-${k}" name="${k}" type="${type}" value="${E(v)}" ${type==='number'?'min="0" step="any"':''}>`;return `<div class="field"><label for="f-${k}">${t}</label>${html}</div>`}).join('');$('#modalRoot').innerHTML=`<div class="modal-backdrop" id="modalShade"><div class="modal-card" role="dialog" aria-modal="true"><div class="modal-titlebar"><div><div class="page-eyebrow">RESTOPILOT · ${kind.toUpperCase()}</div><h2>${obj?'Edit':'Add'} ${kind.slice(0,-1)}</h2><p>Changes are saved locally in this browser.</p></div><button class="small-icon" data-action="close">${icons('x')}</button></div><form id="recordForm">${markup}<div class="modal-actions"><button type="button" class="btn btn-light" data-action="close">Cancel</button><button class="btn" type="submit">${icons('save')} Save changes</button></div></form></div></div>`;refresh();enhanceSelects();$('#recordForm input')?.focus()}
function closeModal(){$('#modalRoot').innerHTML='';editState=null}
function exportCSV(kind){const a=db[kind];if(!Array.isArray(a)||!a.length)return toast('No records to export');const cols=[...new Set(a.flatMap(o=>Object.keys(o)))],csv=[cols.join(','),...a.map(o=>cols.map(k=>`"${String(o[k]??'').replace(/"/g,'""')}"`).join(','))].join('\r\n'),url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download=`restopilot-${kind}.csv`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('CSV exported')}
function filteredRender(){const el=$('#results');if(!el)return;const renderer={orders:orderResults,reservations:()=>table(['GUEST','DATE','TIME','PARTY','TABLE','STATUS','UPDATE',''],reservationRows()),menu:()=>menuCards(list('menu',['name','category','description'])),inventory:()=>table(['INGREDIENT','CATEGORY','ON HAND','STOCK HEALTH','STATUS',''],inventoryRows()),customers:()=>table(['CUSTOMER','EMAIL','PHONE','VISITS','SEGMENT',''],customerRows()),staff:()=>table(['TEAM MEMBER','ROLE','SHIFT','EMAIL','STATUS','UPDATE',''],staffRows())}[page];if(renderer)el.innerHTML=renderer();const count=$('#resultCount');if(count)count.textContent=`${list(page,{orders:['id','customer','item','channel'],menu:['name','category','description'],reservations:['customer','date','table'],inventory:['name','category'],customers:['name','email','phone'],staff:['name','role']}[page]||['name']).length} of ${db[page].length} records`;refresh();enhanceSelects()}
document.addEventListener('click',e=>{
 if(e.target.id==='modalShade'){closeModal();return}
 const cat=e.target.closest('[data-guest-cat]');if(cat){guestCat=cat.dataset.guestCat;guestItems();return}
 if(e.target.closest('[data-guest-add]')){cartCount++;$('#cartCount').textContent=cartCount;toast('Added to demo cart');return}
 if(e.target.closest('#guestCart')){toast(`${cartCount} items in demo cart · checkout disabled`);return}
 const pg=e.target.closest('[data-page]');if(pg){go(pg.dataset.page);return}
 const r=e.target.closest('[data-range]');if(r){range=Number(r.dataset.range);render();return}
 const b=e.target.closest('[data-action]');if(!b)return;const {action,kind,id,value}=b.dataset;
 if(action==='add'){formModal(kind);return}
 if(action==='edit'){formModal(kind,Number(id));return}
 if(action==='close'){closeModal();return}
 if(action==='delete'){if(confirm('Delete this local demo record?')){db[kind]=db[kind].filter(x=>x.id!==Number(id));save();render();toast('Record deleted')}return}
 if(action==='cycle'){const t=db.tables.find(x=>x.id===Number(id)),states=statuses.tables;if(t){t.status=states[(states.indexOf(t.status)+1)%states.length];addNotification('Table status changed',`${t.name} is now ${t.status}.`,'table','tables');save();render();toast(`${t.name} is ${t.status}`)}return}
 if(action==='export'){exportCSV(kind);return}
 if(action==='guest'){openGuest();return}
 if(action==='theme'){db.settings.theme=value;save();render();toast(`${value} theme enabled`);return}
 if(action==='reset'){if(confirm('Reset all local changes and restore original demo data?')){db=seed();save();notifications=initialNotifications();saveNotifications();render();toast('Demo restored')}return}
});
document.addEventListener('submit',e=>{
 if(e.target.id==='settingsForm'){e.preventDefault();Object.assign(db.settings,Object.fromEntries(new FormData(e.target)));save();render();toast('Settings saved');return}
 if(e.target.id==='recordForm'){e.preventDefault();if(!editState)return;const {kind,id}=editState,record=Object.fromEntries(new FormData(e.target));for(const k of ['amount','price','guests','quantity','min','seats','visits','sold'])if(k in record)record[k]=Math.max(0,Number(record[k])||0);if('available' in record)record.available=record.available==='true';if('image' in record&&!/^https:\/\//.test(record.image))record.image=pics[4];if(kind==='orders'&&!record.table)record.table='—';if(id!==null){Object.assign(db[kind].find(x=>x.id===id),record)}else db[kind].unshift({id:Math.max(0,...db[kind].map(x=>x.id))+1,...record});addNotification(id===null?'New '+kind.slice(0,-1):'Updated '+kind.slice(0,-1),(record.customer||record.name||('Record #'+id))+' was '+(id===null?'created':'updated')+'.','activity',kind);save();closeModal();render();toast('Changes saved')}
});
document.addEventListener('input',e=>{if(e.target.id==='listSearch'){query=e.target.value;filteredRender()}});
document.addEventListener('change',e=>{if(e.target.id==='listFilter'){filter=e.target.value;filteredRender()}if(e.target.matches('[data-status]')){const o=db[e.target.dataset.status]?.find(x=>x.id===Number(e.target.dataset.id));if(o){o.status=e.target.value;addNotification('Status updated',`${e.target.dataset.status==='orders'?'Order #RP-'+o.id:e.target.dataset.status==='reservations'?'Reservation for '+o.customer:'Team member '+o.name} is now ${o.status}.`,'status',e.target.dataset.status);save();render();toast('Status updated')}}if(e.target.name==='item'&&editState?.kind==='orders'&&editState.id===null){const m=db.menu.find(x=>x.name===e.target.value);if(m&&$('#f-amount'))$('#f-amount').value=m.price}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('#sidebar')?.classList.remove('open');$('#mobileShade')?.classList.remove('open')}});
$('#mobileMenu')?.addEventListener('click',()=>{$('#sidebar').classList.toggle('open');$('#mobileShade').classList.toggle('open')});
$('#mobileShade')?.addEventListener('click',()=>{$('#sidebar').classList.remove('open');$('#mobileShade').classList.remove('open')});
$('#userProfile')?.addEventListener('click',()=>go('settings'));$('#topAvatar')?.addEventListener('click',()=>go('settings'));$('#tourBtn')?.addEventListener('click',()=>go('analytics'));
$('#notificationBtn')?.addEventListener('click',e=>{e.stopPropagation();toggleNotificationPanel()});
$('#searchTrigger')?.addEventListener('click',()=>{go('orders');$('#listSearch')?.focus()});
window.addEventListener('hashchange',()=>{if(new URLSearchParams(location.search).has('guest'))return;const v=location.hash.slice(1);if(views[v]&&v!==page){page=v;query='';filter='all';render()}});
/* --- RestoPilot premium select system --- */
let selectPopup=null;
function closeCustomSelect(){
  if(!selectPopup)return;
  selectPopup.trigger.setAttribute('aria-expanded','false');
  selectPopup.trigger.closest('.rp-select')?.classList.remove('open');
  selectPopup.menu.remove();
  selectPopup=null;
}
function enhanceSelects(root=document){
  root.querySelectorAll('select:not([data-enhanced])').forEach(native=>{
    native.dataset.enhanced='true';
    const wrap=document.createElement('div');wrap.className='rp-select';if(native.hasAttribute('data-status'))wrap.classList.add('rp-status');
    native.parentNode.insertBefore(wrap,native);wrap.appendChild(native);
    native.classList.add('rp-native-select');native.tabIndex=-1;native.setAttribute('aria-hidden','true');
    const trigger=document.createElement('button');trigger.type='button';
    trigger.className='rp-select-trigger';trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
    trigger.setAttribute('aria-label',native.getAttribute('aria-label')||native.closest('.field')?.querySelector('label')?.textContent?.trim()||'Choose option');
    trigger.innerHTML='<span class="rp-current"></span><span class="rp-select-chevron" aria-hidden="true"></span>';
    wrap.appendChild(trigger);updateCustomSelect(native);
  });
}
function updateCustomSelect(native){
  const wrap=native.closest('.rp-select');if(!wrap)return;
  const current=wrap.querySelector('.rp-current');if(current)current.textContent=native.selectedOptions[0]?.textContent||'Select an option';
  wrap.dataset.state=String(native.value).toLowerCase().replace(/[^a-z0-9-]/g,'-');
}
function openCustomSelect(trigger){
  const wrap=trigger.closest('.rp-select');const native=wrap.querySelector('select');
  if(selectPopup?.trigger===trigger){closeCustomSelect();return}
  closeCustomSelect();
  const menu=document.createElement('div');menu.className='rp-select-menu';menu.setAttribute('role','listbox');
  menu.setAttribute('aria-label',trigger.getAttribute('aria-label')||'Options');
  Array.from(native.options).forEach((opt,i)=>{
    if(opt.hidden)return;
    const item=document.createElement('button');item.type='button';item.className='rp-select-option';
    item.dataset.selectIndex=String(i);item.dataset.state=String(opt.value).toLowerCase().replace(/[^a-z0-9-]/g,'-');
    item.setAttribute('role','option');item.setAttribute('aria-selected',opt.selected?'true':'false');
    item.disabled=opt.disabled;
    const label=document.createElement('span');label.className='rp-option-label';label.textContent=opt.textContent;
    const check=document.createElement('span');check.className='rp-option-check';check.textContent='✓';
    item.append(label,check);menu.append(item);
    if(opt.selected)item.classList.add('selected');
  });
  document.body.append(menu);
  const rect=trigger.getBoundingClientRect();
  const width=Math.max(170,rect.width);
  const availableBelow=window.innerHeight-rect.bottom-12;
  const openAbove=availableBelow<200&&rect.top>availableBelow;
  menu.style.width=Math.min(width,window.innerWidth-20)+'px';
  menu.style.left=Math.max(10,Math.min(rect.left,window.innerWidth-Math.min(width,window.innerWidth-20)-10))+'px';
  menu.style.maxHeight=Math.max(105,Math.min(320,openAbove?rect.top-16:availableBelow))+'px';
  menu.style.top=(openAbove?Math.max(10,rect.top-Math.min(menu.scrollHeight,320)-7):rect.bottom+7)+'px';
  trigger.setAttribute('aria-expanded','true');wrap.classList.add('open');
  selectPopup={trigger,menu,native};
  menu.querySelector('.selected')?.scrollIntoView({block:'nearest'});
}
function pickCustomSelect(index){
  if(!selectPopup)return;
  const native=selectPopup.native,trigger=selectPopup.trigger;
  const option=native.options[index];if(!option||option.disabled)return;
  const previous=native.value;native.selectedIndex=index;
  updateCustomSelect(native);
  closeCustomSelect();
  trigger.focus({preventScroll:true});
  if(previous!==native.value)native.dispatchEvent(new Event('change',{bubbles:true}));
}
document.addEventListener('click',event=>{
  const trigger=event.target.closest('.rp-select-trigger');
  if(trigger){openCustomSelect(trigger);return}
  const option=event.target.closest('.rp-select-option');
  if(option){pickCustomSelect(Number(option.dataset.selectIndex));return}
  if(selectPopup&&!event.target.closest('.rp-select-menu'))closeCustomSelect();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&selectPopup){event.stopImmediatePropagation();event.preventDefault();closeCustomSelect();return}
  const trigger=event.target.closest('.rp-select-trigger');
  if(trigger&&['Enter',' ','ArrowDown','ArrowUp'].includes(event.key)){
    event.preventDefault();
    if(!selectPopup||selectPopup.trigger!==trigger)openCustomSelect(trigger);
    if(selectPopup&&event.key.startsWith('Arrow')){
      const list=Array.from(selectPopup.menu.querySelectorAll('.rp-select-option:not(:disabled)'));
      const curr=list.indexOf(selectPopup.menu.querySelector('.selected'));
      const next=list[(curr+(event.key==='ArrowDown'?1:list.length-1))%list.length];
      next?.focus();
    }
    return;
  }
  if(event.target.closest('.rp-select-option')){
    const items=Array.from(selectPopup?.menu.querySelectorAll('.rp-select-option:not(:disabled)')||[]);
    const curr=items.indexOf(event.target);
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){
      event.preventDefault();items[(curr+(event.key==='ArrowDown'?1:items.length-1))%items.length]?.focus();
    }else if(event.key==='Enter'||event.key===' '){event.preventDefault();pickCustomSelect(Number(event.target.dataset.selectIndex))}
  }
});
window.addEventListener('scroll',e=>{if(!e.target?.closest?.('.rp-select-menu'))closeCustomSelect()},true);
window.addEventListener('resize',closeCustomSelect);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&selectPopup){event.preventDefault();event.stopPropagation();closeCustomSelect()}},true);

/* --- RestoPilot notification center --- */
const notificationKey='restopilot-notifications-v2';
const initialNotifications=()=>[
 {id:'welcome-order',title:'New order received',message:'Order #RP-1048 from Sofia Martin is waiting for preparation.',type:'order',page:'orders',read:false,at:Date.now()-120000},
 {id:'welcome-booking',title:'Reservation confirmed',message:'Sarah & Friends booked a table for 19:30.',type:'reservation',page:'reservations',read:false,at:Date.now()-600000},
 {id:'welcome-stock',title:'Stock needs attention',message:'Some ingredients have fallen below their minimum stock levels.',type:'stock',page:'inventory',read:false,at:Date.now()-1600000}
];
let notifications;
try{notifications=JSON.parse(localStorage.getItem(notificationKey));if(!Array.isArray(notifications))notifications=initialNotifications()}catch{notifications=initialNotifications()}
const saveNotifications=()=>{try{localStorage.setItem(notificationKey,JSON.stringify(notifications.slice(0,70)))}catch{}};
function addNotification(title,message,type='activity',destination='overview'){
  notifications.unshift({id:'n'+Date.now()+Math.random().toString(36).slice(2,6),title,message,type,page:destination,read:false,at:Date.now()});
  notifications=notifications.slice(0,70);saveNotifications();syncNotificationBadge();
}
function relativeNotificationTime(at){
  const minutes=Math.max(0,Math.floor((Date.now()-at)/60000));
  if(minutes<1)return 'Just now';
  if(minutes<60)return minutes+' min ago';
  if(minutes<1440)return Math.floor(minutes/60)+' hr ago';
  return Math.floor(minutes/1440)+' days ago';
}
function syncNotificationBadge(){
  const b=$('#notificationBtn b'),button=$('#notificationBtn');if(!button||!b)return;
  const n=notifications.filter(x=>!x.read).length;
  b.textContent=n>9?'9+':String(n);b.style.display=n?'grid':'none';
  button.setAttribute('aria-label',n?`Notifications, ${n} unread`:'Notifications, all read');
  button.setAttribute('aria-haspopup','dialog');
  if(!button.hasAttribute('aria-expanded'))button.setAttribute('aria-expanded','false');
}
function closeNotificationPanel(){
  $('#notificationPanel')?.remove();
  $('#notificationBtn')?.setAttribute('aria-expanded','false');
}
function renderNotificationPanel(){
  const panel=$('#notificationPanel');if(!panel)return;
  panel.innerHTML='<div class="rp-notification-header"><div><strong>Notifications</strong><p>Updates from your restaurant</p></div><button type="button" data-notif-action="mark-all" class="rp-mark-all">Mark all read</button></div>'+
   '<div class="rp-notification-list">'+(notifications.length?notifications.map(n=>{
    const iconName=({order:'shopping-bag',reservation:'calendar-days',stock:'alert-triangle',table:'armchair',status:'check-circle-2',activity:'activity'})[n.type]||'bell';
    return `<button type="button" class="rp-notification-item ${n.read?'':'unread'}" data-notification-id="${E(n.id)}"><span class="rp-notification-icon ${E(n.type)}">${icons(iconName)}</span><span class="rp-notification-body"><strong>${E(n.title)}</strong><span>${E(n.message)}</span><small>${E(relativeNotificationTime(n.at))}</small></span>${n.read?'':'<span class="rp-unread-dot"></span>'}</button>`;
   }).join(''):'<div class="rp-notification-empty">You are all caught up ✨</div>')+'</div><div class="rp-notification-footer"><span>Demo alerts · Stored on this device</span><button type="button" data-notif-action="clear-read">Clear read</button></div>';
  refresh();
}
function toggleNotificationPanel(){
  closeCustomSelect();
  if($('#notificationPanel')){closeNotificationPanel();return}
  const node=document.createElement('div');node.id='notificationPanel';node.className='rp-notification-panel';node.setAttribute('role','dialog');node.setAttribute('aria-label','Restaurant notifications');
  $('.topbar-right')?.append(node);
  $('#notificationBtn')?.setAttribute('aria-expanded','true');
  renderNotificationPanel();
}
document.addEventListener('click',event=>{
  const target=event.target.closest('[data-notification-id]');
  if(target){
    const notification=notifications.find(n=>n.id===target.dataset.notificationId);
    if(!notification)return;
    notification.read=true;saveNotifications();syncNotificationBadge();closeNotificationPanel();
    if(notification.page&&views[notification.page])go(notification.page);
    return;
  }
  const act=event.target.closest('[data-notif-action]');
  if(act){
    if(act.dataset.notifAction==='mark-all')notifications.forEach(n=>n.read=true);
    if(act.dataset.notifAction==='clear-read')notifications=notifications.filter(n=>!n.read);
    saveNotifications();syncNotificationBadge();renderNotificationPanel();
    toast(act.dataset.notifAction==='mark-all'?'Notifications marked as read':'Read notifications cleared');
    return;
  }
  if($('#notificationPanel')&&!event.target.closest('#notificationPanel')&&!event.target.closest('#notificationBtn'))closeNotificationPanel();
});
enhanceSelects();
syncNotificationBadge();
if(new URLSearchParams(location.search).has('guest'))guestRender();else{page=views[location.hash.slice(1)]?location.hash.slice(1):'overview';$('#footerYear').textContent=new Date().getFullYear();render()}
