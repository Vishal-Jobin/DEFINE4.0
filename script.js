(() => {
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const img=(id,w=900)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
  const sampleMine=[
    {id:'m1',title:'Navy blue headphones',description:'Over-ear headphones with a tiny scratch on the left ear cup. Last seen near the library entrance.',location:'MBCET, Nalanchira',reward:500,status:'active',distance:1.2,created:Date.now()-3600000,images:[img('photo-1505740420928-5e560c06d30e')]},
    {id:'m2',title:'Black card holder',description:'Slim black card holder with initials inside. Might have fallen near the canteen.',location:'Nalanchira Junction',reward:200,status:'active',found:false,distance:2.4,created:Date.now()-86400000,images:[img('photo-1627123424574-724758594e93')]}
  ];
  const sampleCommunity=[
    {id:'c1',ownerName:'Anjali Menon',title:'Legion gaming laptop',description:'Lenovo Legion laptop in a dark sleeve. Last seen around Pachalloor, Thiruvallam. Please share a detail to verify before collection.',location:'Pachalloor, Thiruvallam',reward:1200,status:'active',distance:6.4,created:Date.now()-7200000,images:[img('photo-1593642632823-8f785ba67e45')]},
    {id:'c2',ownerName:'Rahul Nair',title:'Brown leather wallet',description:'Brown leather wallet with a few cards inside. Lost near the bus stop. Happy to verify the contents.',location:'Nalanchira Junction',reward:500,status:'active',distance:1.1,created:Date.now()-5400000,images:[img('photo-1627123424574-724758594e93')]},
    {id:'c3',ownerName:'Meera Thomas',title:'Wireless earbuds case',description:'White charging case for wireless earbuds, with a small blue mark on the back.',location:'Kesavadasapuram',reward:250,distance:2.2,status:'active',created:Date.now()-10000000,images:[img('photo-1606220945770-b5b6c2c55bf1')]},
    {id:'c4',ownerName:'Adithya S',title:'Green sketchbook',description:'A forest-green sketchbook with pencil drawings inside. It means a lot to me.',location:'MBCET campus',reward:0,distance:.7,status:'active',created:Date.now()-18000000,images:[img('photo-1517842645767-c639042777db')]},
    {id:'c5',ownerName:'Nikhil Raj',title:'Silver keyring',description:'Three keys and a round metal keyring. Probably dropped around the main gate.',location:'Nalanchira, main gate',reward:150,distance:1.5,status:'active',created:Date.now()-36000000,images:[img('photo-1582139329536-e7284fece509')]},
    {id:'c6',ownerName:'Fathima Basheer',title:'Blue college ID card',description:'Blue lanyard with a college ID card. Name partly rubbed off; please contact me to verify.',location:'Thiruvananthapuram Central',reward:100,distance:7.2,status:'active',created:Date.now()-50000000,images:[img('photo-1586281380349-632531db7ed4')]}
  ];
  const sampleCommunityHistory=[
    {id:'history-an-j1',ownerName:'Anjali Menon',title:'Black travel backpack',description:'Previous community listing. The backpack was returned to its owner.',location:'Kowdiar, Thiruvananthapuram',reward:300,status:'returned',found:true,archiveOnly:true,distance:3.2,created:Date.now()-1000*60*60*24*38,images:[img('photo-1553062407-98eeb64c6a62')]},
    {id:'history-rn-j1',ownerName:'Rahul Nair',title:'Grey laptop sleeve',description:'Previous community listing, marked returned after a successful handover.',location:'Pattom Junction',reward:250,status:'returned',found:true,archiveOnly:true,distance:2.6,created:Date.now()-1000*60*60*24*54,images:[img('photo-1588872657578-7efd1f1555ed')]},
    {id:'history-mt-j1',ownerName:'Meera Thomas',title:'Canvas tote bag',description:'Previous community listing, returned to its owner.',location:'Kesavadasapuram',reward:150,status:'returned',found:true,archiveOnly:true,distance:1.8,created:Date.now()-1000*60*60*24*29,images:[img('photo-1590874103328-eac38a683ce7')]},
    {id:'history-as-j1',ownerName:'Adithya S',title:'Blue water bottle',description:'Previous community listing. The item was found and the listing was closed.',location:'MBCET campus',reward:0,status:'resolved',found:true,archiveOnly:true,distance:.5,created:Date.now()-1000*60*60*24*21,images:[img('photo-1602143407151-7111542de6e8')]},
    {id:'history-nr-j1',ownerName:'Nikhil Raj',title:'Wired earphones',description:'Previous community listing, successfully returned.',location:'Nalanchira Junction',reward:100,status:'returned',found:true,archiveOnly:true,distance:1.4,created:Date.now()-1000*60*60*24*46,images:[img('photo-1505740420928-5e560c06d30e')]},
    {id:'history-fb-j1',ownerName:'Fathima Basheer',title:'Patterned notebook',description:'Previous community listing, returned after the owner verified it.',location:'Thiruvananthapuram Central',reward:0,status:'returned',found:true,archiveOnly:true,distance:4.9,created:Date.now()-1000*60*60*24*32,images:[img('photo-1531346878377-a5be20888e57')]}
  ];
  // Seed a shared set of community-submitted potentially-lost reports for both demo logins.
  // A migration marker prevents reports a user deletes from being re-added on each launch.
  const samplePotentialReports=[
    {id:'seed-pr-backpack',title:'Olive backpack left by the bench',location:'MBCET main gate, Nalanchira',description:'An olive backpack appears to have been left beside the bench near the main gate. No name tag is visible; please check with the owner before collecting it.',photo:img('photo-1553062407-98eeb64c6a62',720),locationLat:8.5674,locationLng:76.8745,status:'open',created:Date.now()-1000*60*60*3,updated:Date.now()-1000*60*60*3,reporterName:'Anjali Menon',reporterEmail:'community.anjali@fling.demo',demoSeed:true},
    {id:'seed-pr-keys',title:'Two keys on a silver ring',location:'Nalanchira bus stop',description:'A small keyring with two keys was spotted on the bench beside the bus stop. I left it where it was so the owner may be able to retrace their steps.',photo:img('photo-1582139329536-e7284fece509',720),locationLat:8.5668,locationLng:76.8757,status:'open',created:Date.now()-1000*60*60*7,updated:Date.now()-1000*60*60*7,reporterName:'Rahul Nair',reporterEmail:'community.rahul@fling.demo',demoSeed:true},
    {id:'seed-pr-bottle',title:'Blue water bottle near library steps',location:'MBCET library entrance',description:'A blue reusable water bottle was sitting near the library steps after classes. It has no obvious name label.',photo:img('photo-1602143407151-7111542de6e8',720),locationLat:8.5679,locationLng:76.8740,status:'investigating',created:Date.now()-1000*60*60*20,updated:Date.now()-1000*60*60*4,reporterName:'Meera Thomas',reporterEmail:'community.meera@fling.demo',demoSeed:true},
    {id:'seed-pr-notebook',title:'Green-covered notebook left on a seat',location:'Kesavadasapuram junction',description:'A green-covered notebook was left on a public seat near the junction. The cover looks plain; no personal details are visible from the outside.',photo:img('photo-1531346878377-a5be20888e57',720),locationLat:8.5368,locationLng:76.9446,status:'open',created:Date.now()-1000*60*60*28,updated:Date.now()-1000*60*60*28,reporterName:'Adithya S',reporterEmail:'community.adithya@fling.demo',demoSeed:true},
    {id:'seed-pr-wallet',title:'Brown wallet noticed near a café',location:'Pattom café row',description:'A brown wallet was noticed beside an outdoor café table. I did not open it or handle the contents.',photo:img('photo-1627123424574-724758594e93',720),locationLat:8.5238,locationLng:76.9362,status:'resolved',created:Date.now()-1000*60*60*42,updated:Date.now()-1000*60*60*12,reporterName:'Nikhil Raj',reporterEmail:'community.nikhil@fling.demo',demoSeed:true},
    {id:'seed-pr-earbuds',title:'Earbud charging case on the bus seat',location:'Thiruvananthapuram Central bus terminal',description:'A small white earbud charging case was seen on a seat after passengers got off. It may have been left behind during the previous trip.',photo:img('photo-1606220945770-b5b6c2c55bf1',720),locationLat:8.4875,locationLng:76.9525,status:'open',created:Date.now()-1000*60*60*56,updated:Date.now()-1000*60*60*56,reporterName:'Fathima Basheer',reporterEmail:'community.fathima@fling.demo',demoSeed:true}
  ];
  const sampleAbuseReports=[
    {id:'seed-abuse-scam',listingId:'c1',listingTitle:'Legion gaming laptop',listingOwnerName:'Anjali Menon',reason:'Suspicious or scam activity',details:'The listing may be asking interested people for an upfront deposit before arranging a handover. Please review the wording and contact route.',created:Date.now()-1000*60*60*8,status:'pending',reporterName:'Asha Menon',reporterEmail:'asha@fling.demo',demoSeed:true},
    {id:'seed-abuse-misleading',listingId:'c3',listingTitle:'Wireless earbuds case',listingOwnerName:'Meera Thomas',reason:'False or misleading listing',details:'The photo may not match the described item. Please check whether the listing details are accurate.',created:Date.now()-1000*60*60*26,status:'reviewing',reporterName:'Arjun Nair',reporterEmail:'arjun@fling.demo',demoSeed:true},
    {id:'seed-abuse-privacy',listingId:'c6',listingTitle:'Blue college ID card',listingOwnerName:'Fathima Basheer',reason:'Harassment or personal information',details:'Please check that the listing photo or description does not expose private identifying information unnecessarily.',created:Date.now()-1000*60*60*49,status:'pending',reporterName:'Asha Menon',reporterEmail:'asha@fling.demo',demoSeed:true}
  ];
  const ownerNameFor=item=>{
    if(item?.ownerName)return item.ownerName;
    const known={c1:'Anjali Menon',c2:'Rahul Nair',c3:'Meera Thomas',c4:'Adithya S',c5:'Nikhil Raj',c6:'Fathima Basheer'};
    if(known[item?.id])return known[item.id];
    const names=['Ananya Pillai','Vishnu Prasad','Diya Mathew','Arjun Kumar','Neha Joseph','Kiran Das'];
    const key=String(item?.id||item?.title||'listing');
    const hash=[...key].reduce((total,ch)=>total+ch.charCodeAt(0),0);
    return names[hash%names.length];
  };
  const load=(k,f)=>{try{const v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)?v:f}catch{return f}};
  const loadObject=(k,f={})=>{try{const v=JSON.parse(localStorage.getItem(k));return v&&typeof v==='object'&&!Array.isArray(v)?v:f}catch{return f}};
  const DEMO_ACCOUNTS={asha:{name:'Asha Menon',email:'asha@fling.demo'},arjun:{name:'Arjun Nair',email:'arjun@fling.demo'}};
  function readProfile(){try{return JSON.parse(sessionStorage.getItem('fling.profile.v1')||localStorage.getItem('fling.profile.v1')||'null')}catch{return null}}
  const accountKey=email=>String(email||'guest@fling.demo').trim().toLowerCase();
  let profile=readProfile();
  if(profile?.email)profile.email=String(profile.email).trim().toLowerCase();
  let mineAccounts=loadObject('fling.mine.accounts.v1',{});
  // One-time migration: assign old unscoped listings only to the account active during migration.
  if(localStorage.getItem('fling.mine.account-migration.v1')!=='1'){
    const legacyMine=load('fling.mine.v1',null);
    if(Array.isArray(legacyMine)&&legacyMine.length){
      const target=accountKey(profile?.email||DEMO_ACCOUNTS.asha.email);
      if(!Array.isArray(mineAccounts[target]))mineAccounts[target]=legacyMine;
    }
    try{localStorage.setItem('fling.mine.accounts.v1',JSON.stringify(mineAccounts));localStorage.setItem('fling.mine.account-migration.v1','1')}catch{}
  }
  const sampleMineArjun=[
    {id:'arjun-m1',title:'Grey laptop sleeve',description:'A grey padded laptop sleeve with a small stitched tag on the inside. Last seen around the computer lab.',location:'MBCET computer lab',reward:300,status:'active',distance:0.8,created:Date.now()-7200000,images:[img('photo-1588872657578-7efd1f1555ed')]},
    {id:'arjun-m2',title:'Steel water bottle',description:'A brushed steel bottle with a dark cap and a small dent near the base.',location:'MBCET cafeteria',reward:100,status:'active',distance:0.6,created:Date.now()-86400000,images:[img('photo-1602143407151-7111542de6e8')]}
  ];
  function ensureMineFor(email){
    const key=accountKey(email);
    if(!Array.isArray(mineAccounts[key])){
      const seed=key===accountKey(DEMO_ACCOUNTS.arjun.email)?sampleMineArjun:sampleMine;
      const displayName=key===accountKey(DEMO_ACCOUNTS.arjun.email)?DEMO_ACCOUNTS.arjun.name:(key===accountKey(DEMO_ACCOUNTS.asha.email)?DEMO_ACCOUNTS.asha.name:(profile?.name||'Fling member'));
      mineAccounts[key]=seed.map(item=>({...item,ownerName:displayName,ownerEmail:key,accountListing:true,images:[...(item.images||[])]}));
      try{localStorage.setItem('fling.mine.accounts.v1',JSON.stringify(mineAccounts))}catch{}
    }
    return mineAccounts[key];
  }
  let mine=profile&&!profile.isAdmin?ensureMineFor(profile.email):[];
  let community=load('fling.community.v1',sampleCommunity),chats=load('fling.chats.v1',[]),potentialReports=load('fling.potential-reports.v1',[]),abuseReports=load('fling.reports.v1',[]),selectedPhotos=[],activeDetail=null,returnView='findView',chatsReturnView='findView',activeChatId=null,searchLocation=localStorage.getItem('fling.location')||'Thiruvananthapuram';
  let flingMap=null,flingMapMarker=null,detailMap=null,detailMapMarker=null,reportMap=null,reportMapMarker=null,imageRecognitionModelPromise=null;
  const reportSeedVersion='1';
  if(localStorage.getItem('fling.potential-reports.seed-version')!==reportSeedVersion){
    const knownReportIds=new Set(potentialReports.map(report=>report.id));
    potentialReports=[...samplePotentialReports.filter(report=>!knownReportIds.has(report.id)),...potentialReports];
    try{localStorage.setItem('fling.potential-reports.v1',JSON.stringify(potentialReports));localStorage.setItem('fling.potential-reports.seed-version',reportSeedVersion)}catch{}
  }
  const abuseReportSeedVersion='1';
  if(localStorage.getItem('fling.abuse-reports.seed-version')!==abuseReportSeedVersion){
    const knownAbuseIds=new Set(abuseReports.map(report=>report.id));
    abuseReports=[...sampleAbuseReports.filter(report=>!knownAbuseIds.has(report.id)),...abuseReports];
    try{localStorage.setItem('fling.reports.v1',JSON.stringify(abuseReports));localStorage.setItem('fling.abuse-reports.seed-version',abuseReportSeedVersion)}catch{}
  }
  const DEFAULT_MAP_CENTER=[8.5241,76.9366];
  const save=()=>{try{if(profile&&!profile.isAdmin)mineAccounts[accountKey(profile.email)]=mine;localStorage.setItem('fling.mine.accounts.v1',JSON.stringify(mineAccounts));localStorage.setItem('fling.community.v1',JSON.stringify(community));localStorage.setItem('fling.chats.v1',JSON.stringify(chats));localStorage.setItem('fling.potential-reports.v1',JSON.stringify(potentialReports));localStorage.setItem('fling.reports.v1',JSON.stringify(abuseReports))}catch{toast('Browser storage is full. Try removing a large photo.')}};
  function upsertMineListingInCommunity(item){
    if(!profile||!item)return;
    const published={...item,ownerName:profile.name,ownerEmail:profile.email,accountListing:true,images:[...(item.images||[])]};
    const index=community.findIndex(entry=>entry.id===published.id);
    if(index<0)community.unshift(published);
    else if(community[index].ownerEmail===profile.email||community[index].accountListing)community[index]={...community[index],...published};
  }
  function syncMineToCommunity(){if(!profile)return;mine.forEach(upsertMineListingInCommunity)}
  // Keep a few resolved demo listings available for community profile history, without showing them in Find.
  let mergedProfileHistory=false;
  for(const archived of sampleCommunityHistory){if(!community.some(item=>item.id===archived.id)){community.push(archived);mergedProfileHistory=true}}
  if(mergedProfileHistory){try{localStorage.setItem('fling.community.v1',JSON.stringify(community))}catch{}}
  // Normalize old chat records created before chats stored their participant accounts.
  function normalizeChatParticipants(){
    let changed=false;
    chats.forEach(chat=>{
      chat.messages=Array.isArray(chat.messages)?chat.messages:[];
      const listing=community.find(item=>item.id===chat.listingId);
      if(chat.kind==='potential-report-claim'){
        chat.participantEmails=[...new Set([...(chat.participantEmails||[]),chat.reporterEmail,chat.claimantEmail].filter(Boolean))];
        return;
      }
      if(!chat.ownerEmail&&listing?.ownerEmail){chat.ownerEmail=listing.ownerEmail;changed=true}
      if(!chat.ownerName){chat.ownerName=listing?.ownerName||chat.otherParticipantName||ownerNameFor(listing||{id:chat.listingId,title:chat.title});changed=true}
      if(!chat.finderEmail){
        const knownSender=chat.messages.find(message=>message.senderEmail&&message.senderEmail!==chat.ownerEmail)?.senderEmail;
        chat.finderEmail=chat.startedByEmail||knownSender||'';
        if(!chat.finderEmail&&profile?.email)chat.finderEmail=profile.email;
        if(chat.finderEmail)changed=true;
      }
      if(!chat.startedByEmail&&chat.finderEmail)chat.startedByEmail=chat.finderEmail;
      chat.participantEmails=[...new Set([...(chat.participantEmails||[]),chat.ownerEmail,chat.finderEmail,...chat.messages.map(message=>message.senderEmail)].filter(Boolean))];
    });
    if(changed){try{localStorage.setItem('fling.chats.v1',JSON.stringify(chats))}catch{}}
  }
  normalizeChatParticipants();
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Use a fully themed dropdown surface instead of browser-native select popups.
  function customSelectName(select){
    if(select.getAttribute('aria-label'))return select.getAttribute('aria-label');
    const host=select.closest('.reports-control,.sort-wrap,.filter-field,.potential-report-controls');
    const label=host?.querySelector('span, label');
    return (label?.textContent||select.labels?.[0]?.textContent||'Choose an option').trim();
  }
  function closeStyledSelect(wrapper,restoreFocus=false){
    if(!wrapper)return;
    wrapper.classList.remove('is-open','opens-up');
    const trigger=$('.styled-select-trigger',wrapper),menu=$('.styled-select-menu',wrapper);
    if(trigger)trigger.setAttribute('aria-expanded','false');
    if(menu)menu.hidden=true;
    if(restoreFocus&&trigger)trigger.focus();
  }
  function closeOtherStyledSelects(except){
    $$('.styled-select.is-open').forEach(wrapper=>{if(wrapper!==except)closeStyledSelect(wrapper)});
  }
  function syncStyledSelect(select){
    const wrapper=select?.closest('.styled-select');if(!wrapper)return;
    const trigger=$('.styled-select-trigger',wrapper),valueNode=$('.styled-select-value',trigger),menu=$('.styled-select-menu',wrapper);
    const selected=select.options[select.selectedIndex];
    if(valueNode)valueNode.textContent=selected?.textContent?.trim()||'Choose an option';
    if(menu){
      $$('.styled-select-option',menu).forEach(option=>{
        const active=option.dataset.value===select.value;
        option.setAttribute('aria-selected',String(active));
        option.classList.toggle('is-selected',active);
      });
    }
  }
  function openStyledSelect(wrapper,focusSelected=false){
    if(!wrapper)return;
    closeOtherStyledSelects(wrapper);
    const trigger=$('.styled-select-trigger',wrapper),menu=$('.styled-select-menu',wrapper),select=$('select.styled-select-source',wrapper);
    if(!trigger||!menu||!select)return;
    wrapper.classList.add('is-open');menu.hidden=false;trigger.setAttribute('aria-expanded','true');
    // Flip the menu upward if there is not enough viewport room below the trigger.
    wrapper.classList.remove('opens-up');
    const triggerRect=trigger.getBoundingClientRect();
    const clippingParent=wrapper.closest('.dialog,.sheet');
    const clipRect=clippingParent?.getBoundingClientRect();
    const bottomBoundary=clipRect?clipRect.bottom:window.innerHeight;
    const topBoundary=clipRect?clipRect.top:0;
    const roomBelow=bottomBoundary-triggerRect.bottom,roomAbove=triggerRect.top-topBoundary;
    const menuHeight=Math.min(menu.scrollHeight||select.options.length*42,250);
    if(roomBelow<menuHeight+18&&roomAbove>roomBelow)wrapper.classList.add('opens-up');
    if(focusSelected){
      const option=$(`.styled-select-option[data-value="${CSS.escape(select.value)}"]`,menu)||$('.styled-select-option',menu);
      option?.focus();
    }
  }
  function enhanceSelect(select){
    if(!(select instanceof HTMLSelectElement)||select.dataset.flingStyled==='true')return;
    select.dataset.flingStyled='true';
    const wrapper=document.createElement('div');wrapper.className='styled-select';
    select.parentNode.insertBefore(wrapper,select);wrapper.appendChild(select);
    select.classList.add('styled-select-source');select.setAttribute('aria-hidden','true');select.tabIndex=-1;
    const label=customSelectName(select);
    const trigger=document.createElement('button');trigger.type='button';trigger.className='styled-select-trigger';trigger.setAttribute('role','combobox');trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-label',label);
    trigger.innerHTML='<span class="styled-select-value"></span><span class="styled-select-chevron" aria-hidden="true">⌄</span>';
    const menu=document.createElement('div');menu.className='styled-select-menu';menu.setAttribute('role','listbox');menu.setAttribute('aria-label',label);menu.hidden=true;
    [...select.options].forEach((option,index)=>{
      const entry=document.createElement('button');entry.type='button';entry.className='styled-select-option';entry.setAttribute('role','option');entry.dataset.value=option.value;entry.textContent=option.textContent.trim();entry.tabIndex=-1;
      entry.addEventListener('click',event=>{
        event.preventDefault();event.stopPropagation();
        select.value=option.value;syncStyledSelect(select);closeStyledSelect(wrapper);select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));trigger.focus();
      });
      entry.addEventListener('keydown',event=>{
        const options=$$('.styled-select-option',menu),indexNow=options.indexOf(entry);let target=null;
        if(event.key==='ArrowDown')target=options[Math.min(options.length-1,indexNow+1)];
        else if(event.key==='ArrowUp')target=options[Math.max(0,indexNow-1)];
        else if(event.key==='Home')target=options[0];else if(event.key==='End')target=options.at(-1);
        else if(event.key==='Escape'){event.preventDefault();closeStyledSelect(wrapper,true);return}
        if(target){event.preventDefault();target.focus()}
      });
      menu.appendChild(entry);
    });
    wrapper.append(trigger,menu);
    trigger.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(wrapper.classList.contains('is-open'))closeStyledSelect(wrapper);else openStyledSelect(wrapper)});
    trigger.addEventListener('keydown',event=>{
      if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();openStyledSelect(wrapper,true)}
      else if(event.key==='Enter'||event.key===' '){event.preventDefault();if(wrapper.classList.contains('is-open'))closeStyledSelect(wrapper);else openStyledSelect(wrapper,true)}
      else if(event.key==='Escape')closeStyledSelect(wrapper);
      else if(event.key.length===1&&!event.ctrlKey&&!event.metaKey){
        const char=event.key.toLowerCase(),options=[...select.options],start=options.findIndex(o=>o.value===select.value),ordered=[...options.slice(start+1),...options.slice(0,start+1)];
        const match=ordered.find(o=>o.textContent.trim().toLowerCase().startsWith(char));if(match){select.value=match.value;syncStyledSelect(select);select.dispatchEvent(new Event('change',{bubbles:true}))}
      }
    });
    select.addEventListener('change',()=>syncStyledSelect(select));
    syncStyledSelect(select);
  }
  function enhanceSelects(root=document){
    if(root.matches?.('select'))enhanceSelect(root);
    $$('select',root).forEach(enhanceSelect);
  }
  function syncStyledSelects(root=document){
    if(root.matches?.('select.styled-select-source'))syncStyledSelect(root);
    $$('select.styled-select-source',root).forEach(syncStyledSelect);
  }
  document.addEventListener('pointerdown',event=>{
    if(!event.target.closest('.styled-select'))closeOtherStyledSelects(null);
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeOtherStyledSelects(null)});
  function loadExternalScript(src,ready){
    if(ready())return Promise.resolve();
    return new Promise((resolve,reject)=>{
      const script=[...document.scripts].find(s=>s.src===src);
      const node=script||document.createElement('script');
      const cleanup=()=>{node.removeEventListener('load',onLoad);node.removeEventListener('error',onError)};
      const onLoad=()=>{cleanup();if(ready())resolve();else{node.remove();reject(new Error('Image recognition library did not initialize'))}};
      const onError=()=>{cleanup();node.remove();reject(new Error('Could not load image recognition library'))};
      node.addEventListener('load',onLoad,{once:true});node.addEventListener('error',onError,{once:true});
      if(!script){node.src=src;node.async=true;document.head.appendChild(node)}
    });
  }
  function getImageRecognitionModel(){
    if(!imageRecognitionModelPromise){
      imageRecognitionModelPromise=(async()=>{
        await loadExternalScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js',()=>!!window.tf);
        await loadExternalScript('https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js',()=>!!window.cocoSsd?.load);
        return window.cocoSsd.load({base:'lite_mobilenet_v2'});
      })().catch(error=>{imageRecognitionModelPromise=null;throw error});
    }
    return imageRecognitionModelPromise;
  }
  function loadImageForRecognition(dataUrl){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('Image could not be opened'));image.src=dataUrl})}
  async function detectObjectFromPhoto(dataUrl){
    const [model,image]=await Promise.all([getImageRecognitionModel(),loadImageForRecognition(dataUrl)]);
    const predictions=await model.detect(image,10,0.35);
    const detected=predictions.filter(p=>p.class&&p.class!=='person').sort((a,b)=>b.score-a.score)[0];
    if(!detected)return null;
    return {label:detected.class.replace(/\b\w/g,ch=>ch.toUpperCase()),lowerLabel:detected.class.toLowerCase(),confidence:Math.round(detected.score*100)};
  }
  async function suggestFlingDetailsFromPhoto(dataUrl){
    const status=$('#imageAnalysisStatus');
    if(!status||$('#editId').value)return;
    status.textContent='Analyzing photo for an item suggestion…';status.dataset.state='loading';
    try{
      const detected=await detectObjectFromPhoto(dataUrl);
      if(!detected){status.textContent='No clear item was detected. You can enter the details manually.';status.dataset.state='idle';return}
      const title=$('#itemTitle'),description=$('#descriptionInput');
      let filled=[];
      if(!title.value.trim()){title.value=detected.label;filled.push('item name')}
      if(!description.value.trim()){
        const article=/^[aeiou]/i.test(detected.lowerLabel)?'an':'a';
        description.value=`I’m looking for ${article} ${detected.lowerLabel}. Please contact me if you’ve found it.`;
        filled.push('starter description');
      }
      status.textContent=`Suggested: ${detected.label} (${detected.confidence}% confidence). ${filled.length?`Auto-filled ${filled.join(' and ')} — please review before posting.`:'Your existing details were kept. Review the photo suggestion before posting.'}`;
      status.dataset.state='success';
    }catch(error){
      status.textContent='Automatic detection is unavailable right now. You can still enter the item details manually.';
      status.dataset.state='error';
    }
  }
  async function suggestPotentialReportDetailsFromPhoto(dataUrl){
    const status=$('#potentialReportImageAnalysisStatus');
    if(!status)return;
    status.textContent='Analyzing photo for an item suggestion…';status.dataset.state='loading';
    try{
      const detected=await detectObjectFromPhoto(dataUrl);
      if(!detected){status.textContent='No clear item was detected. You can enter the details manually.';status.dataset.state='idle';return}
      const title=$('#potentialReportTitle'),description=$('#potentialReportDescription');
      const filled=[];
      if(!title.value.trim()){title.value=detected.label;filled.push('item name')}
      if(!description.value.trim()){
        const article=/^[aeiou]/i.test(detected.lowerLabel)?'an':'a';
        description.value=`I spotted ${article} ${detected.lowerLabel} that may have been left behind. Please contact me if it belongs to you.`;
        filled.push('starter description');
      }
      status.textContent=`Suggested: ${detected.label} (${detected.confidence}% confidence). ${filled.length?`Auto-filled ${filled.join(' and ')} — review before submitting.`:'Your existing details were kept. Review the photo suggestion before submitting.'}`;
      status.dataset.state='success';
    }catch(error){
      status.textContent='Automatic detection is unavailable right now. You can still enter the report details manually.';
      status.dataset.state='error';
    }
  }
  const money=n=>Number(n)>0?'₹ '+Number(n).toLocaleString('en-IN'):'No reward';
  const when=t=>{const d=Math.max(0,Date.now()-(Number(t)||Date.now()));if(d<3600000)return `${Math.max(1,Math.floor(d/60000))} min ago`;if(d<86400000)return `${Math.floor(d/3600000)}h ago`;return `${Math.floor(d/86400000)}d ago`};
  const mapUrl=location=>`https://www.openstreetmap.org/search?query=${encodeURIComponent(location||'Thiruvananthapuram')}`;
  const mapMarkup=item=>`<div class="detail-map-frame"><div id="detailLocationMap" class="detail-embedded-map" role="application" aria-label="Embedded map showing the last-seen location"></div><p id="detailMapStatus" class="detail-map-status" aria-live="polite">Loading map for ${esc(item.location||'this listing')}…</p><a href="${mapUrl(item.location)}" target="_blank" rel="noopener noreferrer" class="map-open">Open in OpenStreetMap ↗</a></div>`;
  const photoMarkup=(item,cls='')=>item.images?.[0]?`<img class="${cls}" src="${esc(item.images[0])}" alt="${esc(item.title)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="cover-fallback" style="display:none">⌁</div>`:`<div class="cover-fallback">⌁</div>`;
  function card(item,mode='community') {const found=mode==='community'&&(!!item.found||item.status==='found');return `<article class="listing-card" data-id="${esc(item.id)}"><div class="listing-cover">${photoMarkup(item)}${found?'<span class="status-tag found">RETURNED</span>':''}</div><div class="listing-body"><h3 class="listing-title">${esc(item.title)}</h3><div class="listing-meta"><span class="listing-place">⌖ ${esc(item.location||'Location not set')}</span><span class="reward">${money(item.reward)}</span></div><div class="card-actions">${mode==='community'?`<button class="small-btn" data-action="details" data-id="${esc(item.id)}">View details ↗</button>`:`<button class="small-btn" data-action="edit" data-id="${esc(item.id)}">Edit fling</button><button class="small-btn danger" data-action="delete" data-id="${esc(item.id)}">Delete</button>`}</div></div></article>`}
  function empty(title,desc,action=''){return `<div class="empty-state"><div class="empty-icon">⌁</div><h3>${esc(title)}</h3><p>${esc(desc)}</p>${action?`<button class="primary-btn" data-action="create">${esc(action)}</button>`:''}</div>`}
  function renderMine(){const count=mine.filter(x=>!x.deleted).length;$('#myCount').textContent=count;const items=mine.filter(x=>!x.deleted).sort((a,b)=>b.created-a.created);$('#myListings').innerHTML=items.length?items.map(x=>card(x,'mine')).join(''):empty('Nothing here yet','Start a fling and your listing will stay here until you delete it.','＋ Start a fling');renderPotentialReports()}
  const reportStatusText=status=>({open:'New report',investigating:'Being checked',resolved:'Resolved'})[status]||'New report';
  function renderPotentialReports(){
    // Reports are a shared community board: both demo accounts see the same entries and status changes.
    const allReports=[...potentialReports];
    const query=($('#reportsSearch')?.value||'').trim().toLowerCase();
    const status=$('#reportsStatusFilter')?.value||'all';
    const sort=$('#reportsSort')?.value||'newest';
    let reports=allReports.filter(r=>{
      const matchesText=!query||[r.title,r.description,r.location,r.reporterName].some(value=>String(value||'').toLowerCase().includes(query));
      const matchesStatus=status==='all'||(r.status||'open')===status;
      return matchesText&&matchesStatus;
    });
    reports.sort((a,b)=>{
      if(sort==='oldest')return (Number(a.created)||0)-(Number(b.created)||0);
      if(sort==='title-asc')return String(a.title||'').localeCompare(String(b.title||''));
      if(sort==='title-desc')return String(b.title||'').localeCompare(String(a.title||''));
      return (Number(b.created)||0)-(Number(a.created)||0);
    });
    $('#potentialReportCount').textContent=allReports.length;
    const resultsLabel=$('#reportsResultsCount');
    if(resultsLabel)resultsLabel.textContent=`Showing ${reports.length} of ${allReports.length} ${allReports.length===1?'report':'reports'}`;
    $('#potentialReportsList').innerHTML=reports.length?reports.map(r=>{
      const canManage=r.reporterEmail===profile?.email;
      const reporter=r.reporterName||'Community member';
      const claims=Array.isArray(r.claims)?r.claims:[];
      const ownClaim=claims.find(c=>c.claimantEmail===profile?.email);
      const incomingClaims=claims.filter(c=>c.claimantEmail!==profile?.email);
      let actions='';
      if(canManage){
        actions=`<button class="small-btn" type="button" data-report-action="edit" data-id="${esc(r.id)}">Edit</button><button class="small-btn danger" type="button" data-report-action="delete" data-id="${esc(r.id)}">Delete</button>${incomingClaims.length?`<button class="small-btn report-claims-btn" type="button" data-report-action="claims" data-id="${esc(r.id)}">Claim requests (${incomingClaims.length})</button>`:''}`;
      }else if(ownClaim){
        actions=`<button class="small-btn report-claim-btn" type="button" data-report-action="claim-open" data-id="${esc(r.id)}" data-chat-id="${esc(ownClaim.chatId)}">Open claim chat ↗</button><span class="report-claim-state">Claim sent</span>`;
      }else if((r.status||'open')!=='resolved'&&profile){
        actions=`<button class="small-btn report-claim-btn" type="button" data-report-action="claim" data-id="${esc(r.id)}">I think this is mine ↗</button>`;
      }else{
        actions=`<span class="report-shared-note">${r.status==='resolved'?'Resolved':'Shared community report'}</span>`;
      }
      return `<article class="potential-report-card" data-report-id="${esc(r.id)}"><div class="potential-report-main">${r.photo?`<img class="potential-report-photo" src="${esc(r.photo)}" alt="Photo of ${esc(r.title)}" loading="lazy">`:''}<div class="potential-report-copy"><div class="potential-report-heading"><h3>${esc(r.title)}</h3><span class="report-status report-status-${esc(r.status||'open')}">${esc(reportStatusText(r.status))}</span></div><p>${esc(r.description)}</p><div class="potential-report-location">⌖ ${esc(r.location)}</div><small>Reported by ${esc(reporter)} · ${when(r.created)}</small></div></div><div class="potential-report-controls"><div class="potential-report-status"><span>Status</span>${canManage?`<select data-report-status="${esc(r.id)}" aria-label="Status for ${esc(r.title)}"><option value="open" ${r.status==='open'?'selected':''}>New</option><option value="investigating" ${r.status==='investigating'?'selected':''}>Being checked</option><option value="resolved" ${r.status==='resolved'?'selected':''}>Resolved</option></select>`:`<strong class="report-status-readonly">${esc(reportStatusText(r.status))}</strong>`}</div><div class="potential-report-actions">${actions}</div></div></article>`;
    }).join(''):allReports.length?`<div class="potential-reports-empty"><span aria-hidden="true">⌕</span><div><strong>No reports match your search or filter.</strong></div></div>`:`<div class="potential-reports-empty"><span aria-hidden="true">⌖</span><div><strong>No potential lost-item reports yet</strong></div></div>`;
    enhanceSelects($('#potentialReportsList'));syncStyledSelects($('#potentialReportsList'));
  }
  const abuseStatusText=status=>({pending:'Pending',reviewing:'Under review',dismissed:'Dismissed',actioned:'Action taken'})[status]||'Pending';
  function renderAdminConsole(){
    if(!profile?.isAdmin)return;
    const all=abuseReports.slice();
    const query=($('#adminReportSearch')?.value||'').trim().toLowerCase();
    const status=$('#adminReportFilter')?.value||'all';
    const sort=$('#adminReportSort')?.value||'newest';
    let rows=all.filter(report=>{
      const item=community.find(entry=>entry.id===report.listingId);
      const content=[report.listingTitle,item?.title,report.reason,report.details,report.reporterName,report.listingOwnerName].join(' ').toLowerCase();
      return (!query||content.includes(query))&&(status==='all'||(report.status||'pending')===status);
    });
    rows.sort((a,b)=>sort==='oldest'?(Number(a.created)||0)-(Number(b.created)||0):(Number(b.created)||0)-(Number(a.created)||0));
    const counts={pending:all.filter(r=>(r.status||'pending')==='pending').length,reviewing:all.filter(r=>r.status==='reviewing').length,dismissed:all.filter(r=>r.status==='dismissed').length,actioned:all.filter(r=>r.status==='actioned').length};
    $('#adminStats').innerHTML=`<div class="admin-stat"><span>All reports</span><strong>${all.length}</strong></div><div class="admin-stat admin-stat-alert"><span>Pending</span><strong>${counts.pending}</strong></div><div class="admin-stat"><span>Under review</span><strong>${counts.reviewing}</strong></div><div class="admin-stat"><span>Action taken</span><strong>${counts.actioned}</strong></div>`;
    $('#adminResultsCount').textContent=`Showing ${rows.length} of ${all.length} abuse ${all.length===1?'report':'reports'}`;
    $('#adminReportList').innerHTML=rows.length?rows.map(report=>{
      const item=community.find(entry=>entry.id===report.listingId);
      const title=report.listingTitle||item?.title||'Listing no longer available';
      const owner=report.listingOwnerName||item?.ownerName||'Unknown owner';
      const statusKey=report.status||'pending';
      let actions='';
      if(statusKey==='pending') actions=`<button class="small-btn" type="button" data-admin-report-action="review" data-id="${esc(report.id)}">Start review</button><button class="small-btn" type="button" data-admin-report-action="dismiss" data-id="${esc(report.id)}">Dismiss</button>${item?`<button class="small-btn danger" type="button" data-admin-report-action="remove" data-id="${esc(report.id)}">Remove listing</button>`:''}`;
      else if(statusKey==='reviewing') actions=`<button class="small-btn" type="button" data-admin-report-action="pending" data-id="${esc(report.id)}">Return to pending</button><button class="small-btn" type="button" data-admin-report-action="dismiss" data-id="${esc(report.id)}">Dismiss</button>${item?`<button class="small-btn danger" type="button" data-admin-report-action="remove" data-id="${esc(report.id)}">Remove listing</button>`:''}`;
      else actions=`<button class="small-btn" type="button" data-admin-report-action="pending" data-id="${esc(report.id)}">Reopen report</button>`;
      const imageSrc=item?.images?.[0]||item?.photo||'';
      return `<article class="admin-report-card"><div class="admin-report-card-head"><div><span class="admin-report-id">REPORT · ${esc(String(report.id).slice(-10).toUpperCase())}</span><h2>${esc(report.reason||'Abuse report')}</h2></div><span class="admin-status admin-status-${esc(statusKey)}">${esc(abuseStatusText(statusKey))}</span></div><div class="admin-reported-listing">${imageSrc?`<img src="${esc(imageSrc)}" alt="" loading="lazy">`:''}<div><small>REPORTED LISTING</small><strong>${esc(title)}</strong><span>${esc(item?.location||'Listing not available')} · Owner: ${esc(owner)}</span></div></div><div class="admin-report-details"><strong>Report details</strong><p>${esc(report.details||'No additional details were provided.')}</p></div><div class="admin-report-meta"><span>Reported by <strong>${esc(report.reporterName||'Community user')}</strong> (${esc(report.reporterEmail||'not provided')})</span><span>${when(report.created)}</span></div>${report.adminNotes?`<div class="admin-saved-note"><strong>Moderator note</strong><p>${esc(report.adminNotes)}</p></div>`:''}<div class="admin-report-actions">${actions}<button class="small-btn" type="button" data-admin-report-action="note" data-id="${esc(report.id)}">${report.adminNotes?'Edit note':'Add note'}</button></div>${report.resolution?`<p class="admin-resolution">${esc(report.resolution)}</p>`:''}</article>`;
    }).join(''):`<div class="admin-empty"><span>✓</span><strong>${all.length?'No reports match these filters.':'No abuse reports yet.'}</strong><p>New listing abuse reports will appear in this queue.</p></div>`;
    enhanceSelects($('#adminView'));syncStyledSelects($('#adminView'));
  }
  function applyAdminDecision(id,action,note=''){
    if(!profile?.isAdmin)return;
    const report=abuseReports.find(entry=>entry.id===id);if(!report)return;
    const now=Date.now();
    report.updated=now;report.reviewedBy=profile.name;if(['note','dismiss','remove'].includes(action)&&note.trim())report.adminNotes=note.trim();
    if(action==='review'){report.status='reviewing';report.resolution='Review started by moderator.'}
    else if(action==='pending'){report.status='pending';report.resolution='Report returned to the pending queue.';report.reviewedAt=null}
    else if(action==='dismiss'){report.status='dismissed';report.reviewedAt=now;report.resolution='Report dismissed after moderator review.'}
    else if(action==='remove'){
      const listingId=report.listingId;
      const target=community.find(entry=>entry.id===listingId);
      community=community.filter(entry=>entry.id!==listingId);
      Object.keys(mineAccounts).forEach(key=>{mineAccounts[key]=(mineAccounts[key]||[]).filter(entry=>entry.id!==listingId)});
      if(target)report.listingTitle=report.listingTitle||target.title;
      report.status='actioned';report.reviewedAt=now;report.resolution='Listing removed from the community feed by a moderator.';
      try{localStorage.setItem('fling.mine.accounts.v1',JSON.stringify(mineAccounts))}catch{}
    }else if(action==='note'){report.adminNotes=note.trim()}
    save();renderAdminConsole();toast(action==='remove'?'Listing removed from the community feed':action==='dismiss'?'Report dismissed':action==='review'?'Report moved to under review':action==='pending'?'Report reopened':'Moderator note saved');
  }
  function openAdminDecision(report,action){
    if(!profile?.isAdmin)return;
    const isRemove=action==='remove';
    const heading=isRemove?'Remove this listing?':'Dismiss this abuse report?';
    const description=isRemove?`“${report.listingTitle||community.find(x=>x.id===report.listingId)?.title||'This listing'}” will be removed from the community feed and the report will be marked as action taken.`:'This report will be marked as dismissed. The report record stays in the moderation history.';
    openModal(`<h2 id="dialogTitle">${heading}</h2><p>${description}</p><form id="adminDecisionForm"><label for="adminDecisionNote">Moderator note (optional)</label><textarea id="adminDecisionNote" rows="3" maxlength="700" placeholder="Record why you made this decision…">${esc(report.adminNotes||'')}</textarea><div class="dialog-actions"><button type="button" class="secondary-btn" id="cancelAdminDecision">Cancel</button><button type="submit" class="primary-btn ${isRemove?'destructive-btn':''}">${isRemove?'Remove listing':'Dismiss report'}</button></div></form>`);
    $('#cancelAdminDecision').onclick=closeModal;
    $('#adminDecisionForm').onsubmit=e=>{e.preventDefault();const note=$('#adminDecisionNote').value;closeModal();applyAdminDecision(report.id,action,note)};
  }
  function openAdminNote(report){
    openModal(`<h2 id="dialogTitle">Moderator note</h2><p>Notes are visible only in the moderation console.</p><form id="adminNoteForm"><label for="adminNoteText">Internal note</label><textarea id="adminNoteText" rows="4" maxlength="700" placeholder="Add context for the moderation decision…">${esc(report.adminNotes||'')}</textarea><div class="dialog-actions"><button type="button" class="secondary-btn" id="cancelAdminNote">Cancel</button><button type="submit" class="primary-btn">Save note</button></div></form>`);
    $('#cancelAdminNote').onclick=closeModal;$('#adminNoteForm').onsubmit=e=>{e.preventDefault();const note=$('#adminNoteText').value;closeModal();applyAdminDecision(report.id,'note',note)};
  }
  function openAdminLogin(){
    openModal(`<div class="admin-login-mark">⌘</div><h2 id="dialogTitle">Admin sign in</h2><p>Use the demo moderator account to review listing abuse reports.</p><form id="adminLoginForm"><label for="adminLoginEmail">Admin email</label><input id="adminLoginEmail" type="email" required autocomplete="username" value="moderator@fling.demo"><label for="adminLoginPassword">Password</label><input id="adminLoginPassword" type="password" required autocomplete="current-password" value="FlingMod#2026"><small class="admin-credential-hint">Demo credentials: moderator@fling.demo · FlingMod#2026</small><p id="adminLoginError" class="admin-login-error" role="alert"></p><div class="dialog-actions"><button class="secondary-btn" id="cancelAdminLogin" type="button">Cancel</button><button class="primary-btn" type="submit">Open console ↗</button></div></form>`);
    $('#cancelAdminLogin').onclick=closeModal;
    $('#adminLoginForm').onsubmit=e=>{e.preventDefault();const email=$('#adminLoginEmail').value.trim().toLowerCase(),password=$('#adminLoginPassword').value;if(email!=='moderator@fling.demo'||password!=='FlingMod#2026'){$('#adminLoginError').textContent='Admin credentials were not recognized.';return}profile={name:'Fling Moderator',email,isAdmin:true};sessionStorage.setItem('fling.profile.v1',JSON.stringify(profile));localStorage.setItem('fling.profile.v1',JSON.stringify(profile));mine=[];activeChatId=null;closeModal();enterApp();toast('Welcome to the moderation console')};
  }
  function openPotentialReport(report=null){
    if(!profile){showLogin();toast('Sign in to report a potentially lost item');return}
    const r=report||{};
    openModal(`<h2 id="dialogTitle">${report?'Edit potential lost-item report':'Report a potentially lost item'}</h2><form id="potentialReportForm"><input type="hidden" id="potentialReportId" value="${esc(r.id||'')}"><label for="potentialReportTitle">Item or object <span aria-hidden="true">*</span></label><input id="potentialReportTitle" required maxlength="90" placeholder="e.g. A backpack left on a bench" value="${esc(r.title||'')}"><label for="potentialReportLocation">Where was it noticed? <span aria-hidden="true">*</span></label><input id="potentialReportLocation" required maxlength="180" placeholder="Area, landmark or nearby place" value="${esc(r.location||'')}"><input type="hidden" id="potentialReportLocationLat" value="${r.locationLat??''}"><input type="hidden" id="potentialReportLocationLng" value="${r.locationLng??''}"><div class="potential-report-location-picker"><div class="potential-report-map-caption"><strong>Choose a location on the map</strong><span>Tap or click the map to place a pin, or enter the area above.</span></div><div id="potentialReportLocationMap" class="potential-report-location-map" role="application" aria-label="Interactive map to select where the item was noticed"></div><p id="potentialReportMapStatus" class="potential-report-map-status" role="status" aria-live="polite">${r.locationLat!=null&&r.locationLng!=null?'Saved map pin loaded. Tap the map to change it.':'Select a map point or enter a location manually.'}</p></div><label for="potentialReportDescription">What did you notice? <span aria-hidden="true">*</span></label><textarea id="potentialReportDescription" required rows="3" maxlength="700" placeholder="Describe the item and any useful context…">${esc(r.description||'')}</textarea><label for="potentialReportPhoto">Photo (optional)</label><div class="report-photo-picker"><input id="potentialReportPhoto" class="report-photo-input" type="file" accept="image/*"><label class="report-photo-button" for="potentialReportPhoto"><span aria-hidden="true">＋</span> Choose photo</label><span id="potentialReportFileName" class="report-photo-filename">${r.photo?'Current photo attached':'No photo selected'}</span></div><div id="potentialReportPhotoPreview" class="report-photo-preview">${r.photo?`<img src="${esc(r.photo)}" alt="Current report photo">`:''}</div><p id="potentialReportImageAnalysisStatus" class="image-analysis-status" role="status" aria-live="polite">Choose a photo to suggest the item name and description.</p><small class="report-form-note">Reports are shared on this demo board. You can edit or delete reports you submitted.</small><div class="dialog-actions"><button type="button" class="secondary-btn" id="cancelPotentialReport">Cancel</button><button type="submit" class="primary-btn">${report?'Save changes':'Submit report'} ↗</button></div></form>`);
    setTimeout(()=>initPotentialReportMap(r),100);
    $('#cancelPotentialReport').onclick=closeModal;
    $('#potentialReportLocation').addEventListener('input',()=>{
      $('#potentialReportLocationLat').value='';$('#potentialReportLocationLng').value='';
      if(reportMap&&reportMapMarker){reportMap.removeLayer(reportMapMarker);reportMapMarker=null;}
      const status=$('#potentialReportMapStatus');if(status)status.textContent='Location text changed. Tap the map to pin exact coordinates.';
    });
    $('#potentialReportPhoto').addEventListener('change',e=>{
      const file=e.target.files?.[0];if(!file)return;
      const status=$('#potentialReportImageAnalysisStatus'),fileName=$('#potentialReportFileName');
      if(!file.type.startsWith('image/')){toast('Choose an image file');e.target.value='';if(fileName)fileName.textContent=r.photo?'Current photo retained':'No photo selected';return}
      if(file.size>2*1024*1024){toast('Choose a photo smaller than 2 MB');e.target.value='';if(fileName)fileName.textContent=r.photo?'Current photo retained':'No photo selected';return}
      if(fileName)fileName.textContent=file.name.length>32?file.name.slice(0,29)+'…':file.name;
      const reader=new FileReader();
      reader.onload=()=>{
        $('#potentialReportPhotoPreview').innerHTML=`<img src="${reader.result}" alt="Selected report photo preview">`;
        suggestPotentialReportDetailsFromPhoto(String(reader.result));
      };
      reader.onerror=()=>{status.textContent='Could not read this photo. Please choose another image.';status.dataset.state='error'};
      reader.readAsDataURL(file);
    });
    $('#potentialReportForm').onsubmit=async e=>{
      e.preventDefault();
      const title=$('#potentialReportTitle').value.trim(),location=$('#potentialReportLocation').value.trim(),description=$('#potentialReportDescription').value.trim(),file=$('#potentialReportPhoto').files[0],latText=$('#potentialReportLocationLat').value,lngText=$('#potentialReportLocationLng').value;
      if(!title||!location||!description){toast('Complete the item, location and details fields');return}
      if(file&&!file.type.startsWith('image/')){toast('Choose an image file');return}
      if(file&&file.size>2*1024*1024){toast('Choose a photo smaller than 2 MB');return}
      let photo=r.photo||'';
      if(file){try{photo=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('Photo could not be read'));reader.readAsDataURL(file)})}catch{toast('Could not load that photo. Try another one.');return}}
      const id=$('#potentialReportId').value||`pr-${Date.now()}`;
      const existing=potentialReports.find(x=>x.id===id);
      const next={id,title,location,description,photo,locationLat:latText===''?null:Number(latText),locationLng:lngText===''?null:Number(lngText),status:existing?.status||'open',claims:existing?.claims||[],created:existing?.created||Date.now(),updated:Date.now(),reporterName:existing?.reporterName||profile.name,reporterEmail:existing?.reporterEmail||profile.email};
      if(existing)potentialReports=potentialReports.map(x=>x.id===id?next:x);else potentialReports.unshift(next);
      save();renderPotentialReports();closeModal();toast(existing?'Potential lost-item report updated':'Potential lost-item report submitted');
    };
  }
  function potentialClaimChatId(report,claimantEmail){
    const safeEmail=String(claimantEmail||'guest').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    return `chat-claim-${report.id}-${safeEmail}`;
  }
  function beginPotentialReportClaim(report){
    if(!profile){showLogin();toast('Sign in to contact the report submitter');return}
    if(report.reporterEmail===profile.email){toast('You submitted this report');return}
    const existingClaim=(Array.isArray(report.claims)?report.claims:[]).find(c=>c.claimantEmail===profile.email);
    if(existingClaim){const chat=chats.find(c=>c.id===existingClaim.chatId);if(chat){activeChatId=chat.id;switchView('chatView');renderChat(chat);return}}
    if(report.status==='resolved'){toast('This report is already marked resolved');return}
    openModal(`<h2 id="dialogTitle">Claim this item</h2><p>Start a conversation with ${esc(report.reporterName||'the report submitter')} about “${esc(report.title)}”. Share a detail that helps verify it belongs to you.</p><form id="potentialClaimForm"><label for="potentialClaimMessage">Message to the report submitter</label><textarea id="potentialClaimMessage" rows="4" maxlength="700" required placeholder="Mention a distinguishing mark, colour, brand, or what was inside…">Hi, I think this ${esc(report.title.toLowerCase())} may be mine. I can share identifying details to help verify ownership.</textarea><div class="dialog-actions"><button class="secondary-btn" type="button" id="cancelPotentialClaim">Cancel</button><button class="primary-btn" type="submit">Send claim & open chat ↗</button></div></form>`);
    $('#cancelPotentialClaim').onclick=closeModal;
    $('#potentialClaimForm').onsubmit=e=>{
      e.preventDefault();
      const message=$('#potentialClaimMessage').value.trim();
      if(!message){toast('Add a message to contact the report submitter');$('#potentialClaimMessage').focus();return}
      const chatId=potentialClaimChatId(report,profile.email),now=Date.now();
      let chat=chats.find(c=>c.id===chatId);
      if(!chat){
        chat={id:chatId,kind:'potential-report-claim',reportId:report.id,listingId:`potential-report:${report.id}:${profile.email}`,title:report.title,location:report.location,photo:report.photo||'',reporterName:report.reporterName||'Report submitter',reporterEmail:report.reporterEmail||'',claimantName:profile.name,claimantEmail:profile.email,participantEmails:[report.reporterEmail||'',profile.email].filter(Boolean),otherParticipantName:report.reporterName||'Report submitter',messages:[],updated:now};
        chats.unshift(chat);
      }
      chat.messages=Array.isArray(chat.messages)?chat.messages:[];
      chat.messages.push({text:message,sender:'me',senderEmail:profile.email,senderName:profile.name,created:now});chat.updated=now;
      report.claims=Array.isArray(report.claims)?report.claims:[];
      if(!report.claims.some(c=>c.claimantEmail===profile.email))report.claims.push({claimantEmail:profile.email,claimantName:profile.name,chatId,created:now,status:'pending'});
      report.updated=now;save();renderPotentialReports();updateChatBadge();closeModal();activeChatId=chat.id;switchView('chatView');renderChat(chat);toast('Claim request sent — continue the conversation');
    };
  }
  function viewPotentialReportClaims(report){
    const claims=(Array.isArray(report.claims)?report.claims:[]).filter(c=>c.claimantEmail!==profile?.email);
    const rows=claims.map(c=>`<div class="report-claim-request"><div><strong>${esc(c.claimantName||'Community member')}</strong><small>${when(c.created)} · Claim request</small></div><button class="small-btn" type="button" data-report-claim-chat="${esc(c.chatId)}">Open chat ↗</button></div>`).join('');
    openModal(`<h2 id="dialogTitle">Claim requests</h2><p>People who think “${esc(report.title)}” may belong to them.</p><div class="report-claim-request-list">${rows||'<p class="report-form-note">No other claim requests yet.</p>'}</div><div class="dialog-actions"><button class="secondary-btn" id="closeReportClaims" type="button">Close</button></div>`);
    $('#closeReportClaims').onclick=closeModal;
  }
  function deletePotentialReport(id){const r=potentialReports.find(x=>x.id===id&&x.reporterEmail===profile?.email);if(!r)return;openModal(`<div class="success-mark warning-mark">!</div><h2 id="dialogTitle">Delete this report?</h2><p>“${esc(r.title)}” will be removed from your report manager.</p><div class="dialog-actions"><button class="secondary-btn" id="cancelPotentialDelete">Keep report</button><button class="primary-btn destructive-btn" id="confirmPotentialDelete">Delete report</button></div>`);$('#cancelPotentialDelete').onclick=closeModal;$('#confirmPotentialDelete').onclick=()=>{potentialReports=potentialReports.filter(x=>x.id!==id);save();renderPotentialReports();closeModal();toast('Report deleted')}}
  function updatePotentialReportStatus(id,status){const item=potentialReports.find(r=>r.id===id);if(!item||!['open','investigating','resolved'].includes(status))return;if(item.reporterEmail!==profile?.email){toast('Only the report submitter can change this status');renderPotentialReports();return}item.status=status;item.updated=Date.now();save();renderPotentialReports();toast(`Report status: ${reportStatusText(status)}`)}
  function renderFind(){let items=community.filter(item=>!item.archiveOnly&&item.ownerEmail!==profile?.email);const q=$('#searchInput').value.trim().toLowerCase();if(q)items=items.filter(x=>(x.title+' '+x.description+' '+x.location).toLowerCase().includes(q));const maxD=Number($('#distanceFilter').value||100),min=Number($('#minReward').value||0),max=$('#maxReward').value===''?Infinity:Number($('#maxReward').value);items=items.filter(x=>(x.distance??100)<=maxD&&(Number(x.reward)||0)>=min&&(Number(x.reward)||0)<=max);const sort=$('#sortSelect').value;if(sort==='reward-high')items.sort((a,b)=>(b.reward||0)-(a.reward||0));if(sort==='reward-low')items.sort((a,b)=>(a.reward||0)-(b.reward||0));if(sort==='distance')items.sort((a,b)=>(a.distance||100)-(b.distance||100));if(sort==='recent')items.sort((a,b)=>b.created-a.created);$('#resultsCount').textContent=`${items.length} ${items.length===1?'listing':'listings'}`;$('#filterCount').textContent=Number(maxD<100)+Number(min>0)+Number(max<Infinity);$('#findListings').innerHTML=items.length?items.map(x=>card(x,'community')).join(''):empty('No matches just yet','Try widening the distance or reward range, or search for something else.');syncStyledSelects(document);}
  function switchView(id){if(profile?.isAdmin&&!['adminView','detailView'].includes(id))id='adminView';const previousView=$('.view.active')?.id;if(id==='chatsView'&&previousView&&!['chatsView','chatView'].includes(previousView))chatsReturnView=previousView;const navView=id==='detailView'||id==='chatView'||id==='chatsView'?'findView':id;$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav-item').forEach(v=>v.classList.toggle('active',v.dataset.view===navView));$('#topChatsBtn').classList.toggle('hidden',id==='chatView'||!!profile?.isAdmin);window.scrollTo({top:0,behavior:'smooth'});if(id==='findView')renderFind();if(id==='lostView')renderMine();if(id==='reportsView')renderPotentialReports();if(id==='chatsView')renderChats();if(id==='adminView')renderAdminConsole()}
  function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;$('#toastRegion').append(el);setTimeout(()=>{el.style.opacity='0';el.style.transform='translateY(-6px)';setTimeout(()=>el.remove(),250)},3200)}
  const sheetOpen=()=>{if(!profile){showLogin();toast('Sign in to start a fling');return}if(!$('#editId').value){$('#imageAnalysisStatus').textContent='Upload a photo to suggest an item name and description.';$('#imageAnalysisStatus').dataset.state='idle'}$('#sheetBackdrop').classList.add('open');$('#flingSheet').classList.remove('sheet-expanded');$('#flingSheet').style.transform='';$('#flingSheet').style.transition='';$('#flingSheet').classList.add('open');document.body.style.overflow='hidden';setTimeout(async()=>{if(flingMap){flingMap.invalidateSize();const lat=Number($('#locationLat').value),lng=Number($('#locationLng').value),hasCoords=$('#locationLat').value!==''&&$('#locationLng').value!==''&&Number.isFinite(lat)&&Number.isFinite(lng);if(hasCoords){flingMap.setView([lat,lng],15);setMapMarker(lat,lng)}else if($('#editId').value&&$('#locationInput').value.trim()){const query=$('#locationInput').value.trim(),place=await geocodePlace(query);if(place&&$('#editId').value&&$('#locationInput').value.trim()===query){flingMap.setView([place.lat,place.lng],15);$('#locationLat').value=String(place.lat);$('#locationLng').value=String(place.lng);setMapMarker(place.lat,place.lng);$('#mapPickerLabel').textContent=`Map centered at ${place.label}. Tap to fine-tune the pin.`}}}else initFlingMap();$('#itemTitle').focus()},300)};
  function sheetClose(){$('#sheetBackdrop').classList.remove('open');$('#flingSheet').classList.remove('open','sheet-expanded');$('#flingSheet').style.transform='';$('#flingSheet').style.transition='';document.body.style.overflow='';$('#flingForm').reset();$('#editId').value='';selectedPhotos=[];renderPreviews();$('#formError').textContent='';$('#sheetTitle').textContent='Start a fling';$('#sheetSubheading').textContent='to find a lost item';$('#sheetSubheading').classList.remove('hidden');$('#submitFling').innerHTML='Post fling <span>↗</span>';$('#mapPickerLabel').textContent='No map location selected yet — manual entry works too.';$('#imageAnalysisStatus').textContent='Upload a photo to suggest an item name and description.';$('#imageAnalysisStatus').dataset.state='idle';if(flingMapMarker&&flingMap){flingMap.removeLayer(flingMapMarker);flingMapMarker=null}if(flingMap){flingMap.setView(DEFAULT_MAP_CENTER,12)}}
  function renderPreviews(){$('#photoPreviews').innerHTML=selectedPhotos.map((src,i)=>`<div class="preview-wrap"><img src="${src}" alt="Selected photo ${i+1}"><button type="button" class="preview-remove" data-photo="${i}" aria-label="Remove photo ${i+1}">×</button></div>`).join('')}
  function editItem(id){const x=mine.find(i=>i.id===id);if(!x)return;$('#editId').value=x.id;$('#itemTitle').value=x.title;$('#rewardInput').value=x.reward||'';$('#descriptionInput').value=x.description;$('#locationInput').value=x.location;$('#locationLat').value=x.locationLat??'';$('#locationLng').value=x.locationLng??'';selectedPhotos=[...(x.images||[])];$('#mapPickerLabel').textContent=x.locationLat!=null&&x.locationLng!=null?`Pinned: ${Number(x.locationLat).toFixed(5)}, ${Number(x.locationLng).toFixed(5)}`:`${x.location} — tap map to pin exact coordinates`;renderPreviews();$('#sheetTitle').textContent='Edit your fling';$('#sheetSubheading').classList.add('hidden');$('#submitFling').innerHTML='Save changes <span>↗</span>';sheetOpen()}
  function openModal(html){removePotentialReportMap();$('#dialogContent').innerHTML=html;enhanceSelects($('#dialogContent'));$('#modalBackdrop').classList.add('open');const first=$('input:not([type=hidden]):not([type=file]),textarea,.styled-select-trigger,button:not(.dialog-close)',$('#dialogContent'));if(first)setTimeout(()=>first.focus(),30)}
  function closeModal(){removePotentialReportMap();$('#modalBackdrop').classList.remove('open');$('#dialogContent').innerHTML=''}
  function deleteItem(id){const x=mine.find(i=>i.id===id);if(!x)return;openModal(`<div class="success-mark warning-mark">!</div><h2 id="dialogTitle">Delete this fling?</h2><p>“${esc(x.title)}” will be removed from your list. This can’t be undone.</p><div class="dialog-actions"><button class="secondary-btn" id="cancelDelete">Keep it</button><button class="primary-btn destructive-btn" id="confirmDelete">Delete fling</button></div>`);$('#cancelDelete').onclick=closeModal;$('#confirmDelete').onclick=()=>{mine=mine.filter(i=>i.id!==id);community=community.filter(item=>!(item.id===id&&item.ownerEmail===profile?.email));save();renderMine();renderFind();closeModal();toast('Fling deleted')};}
  function openDetails(item,from='findView'){activeDetail=item;returnView=from;switchView('detailView');const photos=(item.images||[]).map((src,i)=>`<button class="detail-thumb" data-photo-src="${esc(src)}" aria-label="View photo ${i+1}"><img src="${esc(src)}" alt=""></button>`).join('');$('#detailContent').innerHTML=`<div class="detail-top"><button class="back-btn" id="detailBack">← Back</button><button class="report-btn" id="reportBtn">⚑ Report abuse</button></div><div class="detail-layout"><div><div class="detail-photo" id="detailPhoto">${photoMarkup(item)}</div><div class="detail-thumbs">${photos}</div></div><div class="detail-info"><p class="eyebrow">COMMUNITY LISTING · ${when(item.created).toUpperCase()}</p><h1>${esc(item.title)}</h1><div class="detail-reward">${money(item.reward)}</div><div class="detail-place">⌖ ${esc(item.location)} · approx. ${item.distance??'—'} km away</div><hr class="detail-divider"><h3>The details</h3><p class="detail-description">${esc(item.description)}</p><hr class="detail-divider"><h3>Last seen location</h3>${mapMarkup(item)}<button class="owner-row owner-profile-trigger" id="openOwnerProfile" type="button" aria-label="View ${esc(ownerNameFor(item))} profile and listing history"><span class="owner-avatar">${esc(ownerNameFor(item).split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase())}</span><span class="owner-profile-name"><strong>${esc(ownerNameFor(item))}</strong><small>View profile history</small></span><span class="owner-profile-arrow" aria-hidden="true">↗</span></button><button class="primary-btn contact-btn" id="contactOwner">Contact / Notify owner ↗</button><p class="detail-note">Arrange handovers in a public place. Never share passwords or verification codes.</p></div></div>`;
    setTimeout(()=>initDetailMap(item),80);
    $('#detailBack').onclick=()=>{if(detailMap){detailMap.remove();detailMap=null;detailMapMarker=null}switchView(returnView)};$('#reportBtn').onclick=()=>reportDialog(item);$$('[data-photo-src]').forEach(b=>b.onclick=()=>{$('#detailPhoto').innerHTML=`<img src="${b.dataset.photoSrc}" alt="${esc(item.title)}">`});$('#openOwnerProfile').onclick=()=>openCommunityProfile(item);$('#contactOwner').onclick=()=>startChat(item);
  }
  function openCommunityProfile(listing){
    const name=ownerNameFor(listing);
    const history=community.filter(x=>ownerNameFor(x)===name).sort((a,b)=>(b.created||0)-(a.created||0));
    const active=history.filter(x=>!x.found&&!['found','returned','resolved'].includes(String(x.status||'').toLowerCase())).length;
    const returned=history.length-active;
    const initials=name.split(/\s+/).map(part=>part[0]).slice(0,2).join('').toUpperCase();
    const historyMarkup=history.map(x=>{
      const isReturned=!!x.found||['found','returned','resolved'].includes(String(x.status||'').toLowerCase());
      const content=`<span class="community-history-thumb">${photoMarkup(x)}</span><span class="community-history-copy"><strong>${esc(x.title)}</strong><small>⌖ ${esc(x.location||'Location not set')} · ${when(x.created)}</small></span><span class="community-history-status ${isReturned?'is-returned':'is-active'}">${isReturned?'Returned':'Active'}</span>`;
      return x.archiveOnly?`<div class="community-history-item community-history-archived">${content}</div>`:`<button type="button" class="community-history-item" data-profile-listing="${esc(x.id)}">${content}</button>`;
    }).join('');
    openModal(`<div class="community-profile"><div class="community-profile-head"><div class="community-profile-avatar">${esc(initials)}</div><div class="community-profile-heading"><h2 id="dialogTitle">${esc(name)}</h2><span class="community-profile-type">Community profile</span></div></div><div class="community-profile-stats"><div><strong>${history.length}</strong><span>Listings</span></div><div><strong>${active}</strong><span>Active</span></div><div><strong>${returned}</strong><span>Returned</span></div></div><div class="community-profile-history-head"><h3>Listing history</h3><span>${history.length} ${history.length===1?'listing':'listings'}</span></div><div class="community-profile-history">${historyMarkup||'<p class="community-profile-empty">No public listing history yet.</p>'}</div><div class="dialog-actions community-profile-actions"><button class="secondary-btn" id="closeCommunityProfile" type="button">Close</button></div></div>`);
    $('#closeCommunityProfile').onclick=closeModal;
    $$('[data-profile-listing]').forEach(button=>button.onclick=()=>{const item=community.find(x=>x.id===button.dataset.profileListing);closeModal();if(item)openDetails(item,'findView')});
  }
  function reportDialog(item){
    if(profile?.isAdmin){toast('Use the moderation console to review reports');return}
    openModal(`<h2 id="dialogTitle">Report this listing</h2><p>Your report is confidential. The listing owner won’t see who submitted it.</p><form id="reportForm"><label for="reportReason">What’s the issue?</label><select id="reportReason" required><option value="">Choose a reason</option><option>Suspicious or scam activity</option><option>Inappropriate content</option><option>False or misleading listing</option><option>Harassment or personal information</option><option>Other</option></select><label for="reportDetails">Additional details (optional)</label><textarea id="reportDetails" rows="3" maxlength="500" placeholder="Tell us a little more…"></textarea><div class="dialog-actions"><button type="button" class="secondary-btn" id="cancelReport">Cancel</button><button class="primary-btn" type="submit">Submit report</button></div></form>`);
    $('#cancelReport').onclick=closeModal;
    $('#reportForm').onsubmit=e=>{
      e.preventDefault();const reason=$('#reportReason').value;if(!reason){toast('Choose a reason for your report');return}
      const report={id:'abuse-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),listingId:item.id,listingTitle:item.title,listingOwnerName:ownerNameFor(item),listingOwnerEmail:item.ownerEmail||'',reason,details:$('#reportDetails').value.trim(),created:Date.now(),status:'pending',reporterEmail:profile?.email||'',reporterName:profile?.name||'Community member'};
      abuseReports.unshift(report);save();
      openModal(`<div class="success-mark">✓</div><h2 id="dialogTitle">Report received</h2><p>Thanks for looking out for the community. Your identity stays hidden from the listing owner.</p><div class="dialog-actions"><button class="primary-btn" id="doneReport">Done</button></div>`);$('#doneReport').onclick=closeModal;
    };
  }

  function chatParticipantEmails(chat){
    const all=[...(Array.isArray(chat?.participantEmails)?chat.participantEmails:[]),chat?.ownerEmail,chat?.finderEmail,chat?.reporterEmail,chat?.claimantEmail,chat?.startedByEmail,...(chat?.messages||[]).map(message=>message.senderEmail)];
    return [...new Set(all.filter(Boolean).map(accountKey))];
  }
  function canCurrentUserAccessChat(chat){return !!profile&&chatParticipantEmails(chat).includes(accountKey(profile.email))}
  function chatPeerName(chat){
    if(chat?.kind==='potential-report-claim'){
      if(profile?.email===chat.claimantEmail)return chat.reporterName||chat.otherParticipantName||'Report submitter';
      if(profile?.email===chat.reporterEmail)return chat.claimantName||'Item owner';
      return chat.reporterName||chat.otherParticipantName||'Community member';
    }
    if(profile?.email===chat?.ownerEmail)return chat?.finderName||'Finder';
    return chat?.ownerName||chat?.otherParticipantName||ownerNameFor({id:chat?.listingId,title:chat?.title});
  }
  function isOwnMessage(message){return message.senderEmail?message.senderEmail===profile?.email:message.sender==='me'}
  function startChat(item){
    if(!profile){showLogin();toast('Sign in to contact the owner');return}
    const ownerEmail=item.ownerEmail||'';
    if(ownerEmail&&ownerEmail===profile.email){toast('This is your listing');return}
    let chat=chats.find(c=>c.listingId===item.id&&c.finderEmail===profile.email);
    if(!chat){
      const safeListing=String(item.id).replace(/[^a-z0-9-]/gi,'-');
      const safeAccount=accountKey(profile.email).replace(/[^a-z0-9-]/g,'-');
      chat={id:`chat-${safeListing}-${safeAccount}`,listingId:item.id,title:item.title,location:item.location,photo:item.images?.[0]||'',ownerEmail,ownerName:item.ownerName||ownerNameFor(item),finderEmail:profile.email,finderName:profile.name,startedByEmail:profile.email,participantEmails:[profile.email,ownerEmail].filter(Boolean),otherParticipantName:item.ownerName||ownerNameFor(item),messages:[],updated:Date.now()};
      chats.unshift(chat);
    }else{
      chat.participantEmails=[...new Set([...chatParticipantEmails(chat),profile.email,ownerEmail].filter(Boolean))];
      if(!chat.ownerName)chat.ownerName=item.ownerName||ownerNameFor(item);
      if(!chat.finderName)chat.finderName=profile.name;
    }
    save();activeChatId=chat.id;switchView('chatView');renderChat(chat);
  }
  function renderChat(chat){if(!chat)return;if(!canCurrentUserAccessChat(chat)){toast('This conversation belongs to another account');switchView('chatsView');return}const peerName=chatPeerName(chat);$('#chatContent').innerHTML=`<div class="chat-header"><button class="back-btn" id="chatBack">← Back</button><div class="chat-item-summary"><div class="chat-thumb">${chat.photo?`<img src="${esc(chat.photo)}" alt="">`:'⌁'}</div><div><strong>${esc(chat.title)}</strong><small>${esc(chat.location)} · ${chat.kind==='potential-report-claim'?'Potentially lost item · claim chat':'Finder / owner chat'}</small></div></div></div><div class="chat-safety">Messages in this prototype are stored on this device. A hosted backend is required for real cross-device chat.</div><div id="messageList" class="message-list">${chat.messages.length?chat.messages.map(m=>{const own=isOwnMessage(m);return `<div class="message ${own?'mine-message':'theirs-message'}"><p>${esc(m.text)}</p><small>${esc(own?'You':(m.senderName||peerName))} · ${when(m.created)}</small></div>`}).join(''):`<div class="chat-empty"><span>⌁</span><h3>Start the conversation</h3><p>Send the first message to connect about this item.</p></div>`}</div><form id="messageForm" class="message-form"><input id="messageInput" required maxlength="1000" placeholder="Write a message…" aria-label="Write a message"><button class="primary-btn" type="submit" aria-label="Send message">Send ↗</button></form>`;$('#chatBack').onclick=()=>switchView('chatsView');$('#messageForm').onsubmit=e=>{e.preventDefault();const input=$('#messageInput'),txt=input.value.trim();if(!txt)return;chat.messages.push({text:txt,sender:'me',senderEmail:profile?.email||'',senderName:profile?.name||'You',created:Date.now()});chat.updated=Date.now();save();renderChat(chat);$('#messageInput').focus();$('#messageList').scrollTop=$('#messageList').scrollHeight;toast('Message added to this chat')};$('#messageList').scrollTop=$('#messageList').scrollHeight}
  function currentUserChats(){return chats.filter(canCurrentUserAccessChat)}
  function renderChats(){const visible=currentUserChats().sort((a,b)=>b.updated-a.updated);$('#chatList').innerHTML=visible.length?visible.map(c=>`<button class="chat-list-item" data-chat="${esc(c.id)}"><div class="chat-thumb">${c.photo?`<img src="${esc(c.photo)}" alt="">`:'⌁'}</div><div class="chat-list-copy"><strong>${esc(c.title)}</strong><p>${esc(c.messages.at(-1)?.text||`Chat with ${chatPeerName(c)} — say hello`)}</p><small>${esc(c.location)} · ${c.messages.length} messages</small></div><span>›</span></button>`).join(''):empty('No chats yet','Contact a listing owner or claim a report to start a conversation.')}
  function updateChatBadge(){const n=currentUserChats().length;$('#chatBadge').textContent=n;$('#chatBadge').classList.toggle('hidden',!n)}
  function setMapMarker(lat,lng){
    if(!flingMap||!window.L)return;
    if(flingMapMarker)flingMapMarker.setLatLng([lat,lng]);
    else flingMapMarker=window.L.marker([lat,lng]).addTo(flingMap);
  }
  async function reverseGeocode(lat,lng){
    try{
      const response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`,{headers:{'Accept-Language':'en'}});
      if(!response.ok)throw new Error('Reverse geocoding failed');
      const data=await response.json();
      return data.name||data.address?.neighbourhood||data.address?.suburb||data.address?.town||data.address?.city||data.display_name?.split(',').slice(0,3).join(',').trim()||'';
    }catch{return '';}
  }
  async function geocodePlace(query){
    try{
      const response=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,{headers:{'Accept-Language':'en'}});
      if(!response.ok)throw new Error('Geocoding failed');
      const results=await response.json();
      if(!results.length)return null;
      return {lat:Number(results[0].lat),lng:Number(results[0].lon),label:results[0].name||results[0].display_name?.split(',').slice(0,3).join(',').trim()||query};
    }catch{return null;}
  }
  function initFlingMap(){
    const mapRoot=$('#flingLocationMap');
    if(!mapRoot)return;
    if(!window.L){mapRoot.innerHTML='<div class="map-load-error">Map tiles could not load. You can still enter the area or landmark above.</div>';return;}
    if(!flingMap){
      const savedLat=Number($('#locationLat').value),savedLng=Number($('#locationLng').value),hasSaved=$('#locationLat').value!==''&&$('#locationLng').value!==''&&Number.isFinite(savedLat)&&Number.isFinite(savedLng);
      flingMap=window.L.map(mapRoot,{scrollWheelZoom:false}).setView(hasSaved?[savedLat,savedLng]:DEFAULT_MAP_CENTER,hasSaved?15:12);
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(flingMap);
      if(hasSaved)setMapMarker(savedLat,savedLng);
      flingMap.on('click',async event=>{
        const lat=Number(event.latlng.lat.toFixed(6)),lng=Number(event.latlng.lng.toFixed(6));
        $('#locationLat').value=String(lat);$('#locationLng').value=String(lng);setMapMarker(lat,lng);
        const fallback=`Pinned location (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
        $('#locationInput').value=fallback;$('#mapPickerLabel').textContent=`Selected ${lat.toFixed(5)}, ${lng.toFixed(5)} · finding place name…`;
        const label=await reverseGeocode(lat,lng);
        if($('#locationLat').value===String(lat)&&$('#locationLng').value===String(lng)){
          if(label)$('#locationInput').value=label;
          $('#mapPickerLabel').textContent=label?`Pinned: ${label} (${lat.toFixed(5)}, ${lng.toFixed(5)})`:`Pinned: ${lat.toFixed(5)}, ${lng.toFixed(5)} — coordinates saved`;
        }
      });
    }else{
      setTimeout(()=>flingMap.invalidateSize(),50);
      const lat=Number($('#locationLat').value),lng=Number($('#locationLng').value);
      if($('#locationLat').value!==''&&$('#locationLng').value!==''&&Number.isFinite(lat)&&Number.isFinite(lng)){flingMap.setView([lat,lng],15);setMapMarker(lat,lng)}
    }
    setTimeout(()=>flingMap?.invalidateSize(),120);
  }
  function removePotentialReportMap(){
    if(reportMap){reportMap.remove();reportMap=null;reportMapMarker=null;}
  }
  function setPotentialReportMapMarker(lat,lng,label='Selected location'){
    if(!reportMap||!window.L)return;
    if(reportMapMarker)reportMapMarker.setLatLng([lat,lng]);
    else reportMapMarker=window.L.marker([lat,lng]).addTo(reportMap);
    if(label)reportMapMarker.bindPopup(esc(label));
  }
  async function initPotentialReportMap(report={}){
    const root=$('#potentialReportLocationMap');
    if(!root)return;
    if(!window.L){root.innerHTML='<div class="map-load-error">The embedded map could not load. Enter the area or landmark above instead.</div>';return;}
    removePotentialReportMap();
    const lat=Number(report.locationLat),lng=Number(report.locationLng);
    const hasCoords=report.locationLat!==undefined&&report.locationLat!==null&&report.locationLng!==undefined&&report.locationLng!==null&&Number.isFinite(lat)&&Number.isFinite(lng);
    const map=window.L.map(root,{scrollWheelZoom:false}).setView(hasCoords?[lat,lng]:DEFAULT_MAP_CENTER,hasCoords?15:12);
    reportMap=map;
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(map);
    if(hasCoords)setPotentialReportMapMarker(lat,lng,report.location||'Reported location');
    else if(report.location){
      const query=report.location;
      const point=await geocodePlace(query);
      if(reportMap!==map)return;
      if(point){map.setView([point.lat,point.lng],14);setPotentialReportMapMarker(point.lat,point.lng,point.label||query);$('#potentialReportLocationLat').value=String(point.lat);$('#potentialReportLocationLng').value=String(point.lng);const status=$('#potentialReportMapStatus');if(status)status.textContent=`Approximate match for “${query}”. Tap the map to refine the pin.`;}
    }
    map.on('click',async event=>{
      const pLat=Number(event.latlng.lat.toFixed(6)),pLng=Number(event.latlng.lng.toFixed(6));
      $('#potentialReportLocationLat').value=String(pLat);$('#potentialReportLocationLng').value=String(pLng);
      setPotentialReportMapMarker(pLat,pLng,'Selected location');
      const fallback=`Pinned location (${pLat.toFixed(5)}, ${pLng.toFixed(5)})`;
      $('#potentialReportLocation').value=fallback;
      const status=$('#potentialReportMapStatus');if(status)status.textContent=`Selected ${pLat.toFixed(5)}, ${pLng.toFixed(5)} · finding place name…`;
      const label=await reverseGeocode(pLat,pLng);
      if(reportMap===map&&$('#potentialReportLocationLat').value===String(pLat)&&$('#potentialReportLocationLng').value===String(pLng)){
        if(label)$('#potentialReportLocation').value=label;
        setPotentialReportMapMarker(pLat,pLng,label||'Selected location');
        if(status)status.textContent=label?`Pinned: ${label} (${pLat.toFixed(5)}, ${pLng.toFixed(5)})`:`Pinned: ${pLat.toFixed(5)}, ${pLng.toFixed(5)} · coordinates saved`;
      }
    });
    setTimeout(()=>{if(reportMap===map)map.invalidateSize()},120);
  }
  async function initDetailMap(item){
    const root=$('#detailLocationMap');
    if(!root)return;
    if(!window.L){root.innerHTML='<div class="map-load-error">The embedded map could not load. Use the OpenStreetMap link below to view this location.</div>';return;}
    if(detailMap){detailMap.remove();detailMap=null;detailMapMarker=null;}
    const lat=Number(item.locationLat),lng=Number(item.locationLng);
    const hasCoordinates=item.locationLat!==undefined&&item.locationLat!==null&&item.locationLng!==undefined&&item.locationLng!==null&&Number.isFinite(lat)&&Number.isFinite(lng);
    const start=hasCoordinates?[lat,lng]:DEFAULT_MAP_CENTER;
    const map=window.L.map(root,{scrollWheelZoom:false}).setView(start,hasCoordinates?15:12);
    detailMap=map;
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(map);
    const placeMarker=(p,label)=>{
      if(detailMap!==map)return;
      detailMapMarker=window.L.marker([p.lat,p.lng]).addTo(map);
      if(label)detailMapMarker.bindPopup(esc(label));
      map.setView([p.lat,p.lng],hasCoordinates?15:14);
      const status=$('#detailMapStatus');if(status)status.textContent=label?`Showing map near ${label}.`:`Pinned coordinates: ${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}.`;
    };
    if(hasCoordinates){placeMarker({lat,lng},item.location||'Last-seen location');}
    else{
      const status=$('#detailMapStatus');if(status)status.textContent=`Finding ${item.location||'the listed location'} on the map…`;
      const result=await geocodePlace(item.location||'Thiruvananthapuram');
      if(detailMap!==map)return;
      if(result)placeMarker(result,result.label||item.location);
      else if(status)status.textContent='Exact map coordinates are not available for this listing. You can open the location in OpenStreetMap below.';
    }
    setTimeout(()=>{if(detailMap===map)map.invalidateSize()},100);
  }
  function showLogin(){ $('#loginView').classList.remove('hidden');$('#appShell').classList.add('hidden');$('#appShell').classList.remove('admin-mode') }
  function enterApp(){
    $('#loginView').classList.add('hidden');$('#appShell').classList.remove('hidden');
    if(profile?.isAdmin){
      $('#appShell').classList.add('admin-mode');$('#topLocation').textContent='Moderation console';$('#profileBtn').textContent='M';$('#topChatsBtn').classList.add('hidden');
      $$('.view').forEach(view=>view.classList.toggle('active',view.id==='adminView'));renderAdminConsole();return;
    }
    normalizeChatParticipants();
    $('#appShell').classList.remove('admin-mode');if(profile){mine=ensureMineFor(profile.email);syncMineToCommunity()}
    $('#topLocation').textContent=searchLocation+', KL';$('#findLocationLabel').textContent=searchLocation;$('#profileBtn').textContent=(profile?.name||'F').trim().charAt(0).toUpperCase();$('#topChatsBtn').classList.remove('hidden');save();renderMine();renderFind();updateChatBadge();
  }
  function signInAs(person){profile={name:String(person.name||'Fling member').trim(),email:String(person.email||'').trim().toLowerCase()};mine=ensureMineFor(profile.email);sessionStorage.setItem('fling.profile.v1',JSON.stringify(profile));localStorage.setItem('fling.profile.v1',JSON.stringify(profile));$('#loginName').value=profile.name;$('#loginEmail').value=profile.email;activeChatId=null;enterApp();toast(`Welcome to Fling, ${profile.name.split(' ')[0]}!`)}
  $('#loginForm').onsubmit=e=>{e.preventDefault();const name=$('#loginName').value.trim(),email=$('#loginEmail').value.trim();if(!name||!email){toast('Add your name and email to continue');return}signInAs({name,email})};
  $$('[data-demo-account]').forEach(button=>button.addEventListener('click',()=>{const person=DEMO_ACCOUNTS[button.dataset.demoAccount];if(person)signInAs(person)}));
  $('#flingForm').addEventListener('submit',e=>{e.preventDefault();const title=$('#itemTitle').value.trim(),description=$('#descriptionInput').value.trim(),location=$('#locationInput').value.trim(),reward=Number($('#rewardInput').value||0),error=$('#formError');error.textContent='';if(!title){error.textContent='Add an item name so people know what to look for.';$('#itemTitle').focus();return}if(!description){error.textContent='A short description helps people recognise your item.';$('#descriptionInput').focus();return}if(!location){error.textContent='Add the last-seen area or a nearby landmark.';$('#locationInput').focus();return}if(reward<0||reward>1000000){error.textContent='Reward must be between ₹0 and ₹10,00,000.';return}const id=$('#editId').value,existing=mine.find(x=>x.id===id),lat=$('#locationLat').value===''?null:Number($('#locationLat').value),lng=$('#locationLng').value===''?null:Number($('#locationLng').value),entry={id:id||'m'+Date.now()+'-'+Math.random().toString(36).slice(2,7),title,description,location,reward,status:'active',found:false,distance:existing?.distance??1,created:existing?.created??Date.now(),images:[...selectedPhotos],locationLat:Number.isFinite(lat)?lat:null,locationLng:Number.isFinite(lng)?lng:null,ownerName:profile?.name||'Fling member',ownerEmail:profile?.email||'',accountListing:true};if(existing)mine=mine.map(x=>x.id===id?entry:x);else mine.unshift(entry);upsertMineListingInCommunity(entry);save();renderMine();renderFind();sheetClose();switchView('lostView');toast(existing?'Your fling has been updated':'Your fling is live ✦')});
  $('#photoInput').addEventListener('change',e=>{const files=[...e.target.files],remaining=4-selectedPhotos.length;if(files.length>remaining)toast('You can add up to 4 photos');let analysisQueued=false;files.slice(0,remaining).forEach(file=>{if(!file.type.startsWith('image/'))return;const reader=new FileReader();reader.onload=()=>{selectedPhotos.push(reader.result);renderPreviews();if(!analysisQueued&&selectedPhotos.length===1&&!$('#editId').value){analysisQueued=true;suggestFlingDetailsFromPhoto(reader.result)}};reader.readAsDataURL(file)});e.target.value=''});
  document.addEventListener('click',e=>{const adminAction=e.target.closest('[data-admin-report-action]');if(adminAction){if(!profile?.isAdmin)return;const {adminReportAction:action,id}=adminAction.dataset;const report=abuseReports.find(entry=>entry.id===id);if(!report)return;if(action==='review'||action==='pending')applyAdminDecision(id,action);else if(action==='dismiss'||action==='remove')openAdminDecision(report,action);else if(action==='note')openAdminNote(report);return}const photo=e.target.closest('[data-photo]');if(photo){selectedPhotos.splice(Number(photo.dataset.photo),1);renderPreviews();return}const reportAction=e.target.closest('[data-report-action]');if(reportAction){const {reportAction:act,id,chatId}=reportAction.dataset;const foundReport=potentialReports.find(x=>x.id===id);if(act==='edit'&&foundReport&&foundReport.reporterEmail===profile?.email)openPotentialReport(foundReport);else if(act==='delete'&&foundReport)deletePotentialReport(id);else if(act==='claim'&&foundReport)beginPotentialReportClaim(foundReport);else if(act==='claim-open'&&chatId){const chat=chats.find(c=>c.id===chatId);if(chat){activeChatId=chat.id;switchView('chatView');renderChat(chat)}}else if(act==='claims'&&foundReport&&foundReport.reporterEmail===profile?.email)viewPotentialReportClaims(foundReport);return}const claimChat=e.target.closest('[data-report-claim-chat]');if(claimChat){const chat=chats.find(c=>c.id===claimChat.dataset.reportClaimChat);if(chat){closeModal();activeChatId=chat.id;switchView('chatView');renderChat(chat)}return}const chatBtn=e.target.closest('[data-chat]');if(chatBtn){activeChatId=chatBtn.dataset.chat;renderChat(chats.find(c=>c.id===activeChatId));switchView('chatView');return}const action=e.target.closest('[data-action]');if(action){const {action:act,id}=action.dataset;if(act==='create')sheetOpen();if(act==='edit')editItem(id);if(act==='delete')deleteItem(id);if(act==='details'){const item=community.find(x=>x.id===id);if(item)openDetails(item)}}});
  document.addEventListener('change',e=>{const statusSelect=e.target.closest('[data-report-status]');if(statusSelect)updatePotentialReportStatus(statusSelect.dataset.reportStatus,statusSelect.value)});
  $$('.nav-item').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));$('#adminLoginLaunch').onclick=openAdminLogin;$('#adminReportSearch').oninput=renderAdminConsole;$('#adminReportFilter').onchange=renderAdminConsole;$('#adminReportSort').onchange=renderAdminConsole;$('#heroFling').onclick=sheetOpen;$('#reportPotentialItem').onclick=()=>openPotentialReport();$('#closeSheet').onclick=sheetClose;$('#cancelSheet').onclick=sheetClose;$('#sheetBackdrop').onclick=sheetClose;$('#searchInput').oninput=renderFind;$('#sortSelect').onchange=renderFind;$('#reportsSearch').oninput=renderPotentialReports;$('#reportsStatusFilter').onchange=renderPotentialReports;$('#reportsSort').onchange=renderPotentialReports;['distanceFilter','minReward','maxReward'].forEach(id=>$('#'+id).addEventListener('input',renderFind));$('#filterToggle').onclick=()=>{const panel=$('#filterPanel');const button=$('#filterToggle');const opening=!panel.classList.contains('open');panel.classList.toggle('open',opening);button.setAttribute('aria-expanded',String(opening));};$('#clearFilters').onclick=()=>{$('#distanceFilter').value='100';$('#minReward').value='';$('#maxReward').value='';renderFind()};$('#locationInput').addEventListener('input',()=>{if($('#locationLat').value!==''||$('#locationLng').value!==''){$('#locationLat').value='';$('#locationLng').value='';if(flingMapMarker&&flingMap){flingMap.removeLayer(flingMapMarker);flingMapMarker=null}$('#mapPickerLabel').textContent='Manual location entered. Tap the map to pin exact coordinates.'}});$('#topChatsBtn').onclick=()=>switchView('chatsView');$('#chatsBack').onclick=()=>switchView(chatsReturnView||'findView');$('#changeLocation').onclick=()=>{openModal(`<h2 id="dialogTitle">Search area</h2><p>Choose a sample area. Location permission is not required.</p><label for="locationChoice">Browse near</label><select id="locationChoice"><option>Thiruvananthapuram</option><option>Nalanchira</option><option>Kesavadasapuram</option><option>Thiruvallam</option></select><div class="dialog-actions"><button class="secondary-btn" id="cancelLocation">Cancel</button><button class="primary-btn" id="saveLocation">Use this area</button></div>`);$('#cancelLocation').onclick=closeModal;$('#saveLocation').onclick=()=>{searchLocation=$('#locationChoice').value;localStorage.setItem('fling.location',searchLocation);$('#findLocationLabel').textContent=searchLocation;$('#topLocation').textContent=searchLocation+', KL';closeModal();toast('Search area updated')}};$('#closeDialog').onclick=closeModal;$('#modalBackdrop').addEventListener('click',e=>{if(e.target===$('#modalBackdrop'))closeModal()});$('#brandHome').onclick=e=>{e.preventDefault();switchView('lostView')};$('#profileBtn').onclick=()=>{openModal(`<div class="success-mark">${esc((profile?.name||'F').charAt(0).toUpperCase())}</div><h2 id="dialogTitle">${esc(profile?.name||'Your Fling profile')}</h2><p>${esc(profile?.email||'')}</p><div class="dialog-actions"><button class="secondary-btn" id="signOut">Sign out</button><button class="primary-btn" id="profileDone">Done</button></div>`);$('#profileDone').onclick=closeModal;$('#signOut').onclick=()=>{profile=null;sessionStorage.removeItem('fling.profile.v1');localStorage.removeItem('fling.profile.v1');closeModal();showLogin()}};document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();switchView('findView');$('#searchInput').focus()}if(e.key==='Escape'){sheetClose();closeModal()}});
  // The grab handle toggles expanded state on tap and supports swipe gestures.
  const sheetHandle=$('.sheet-handle'),sheetElement=$('#flingSheet');
  if(sheetHandle&&sheetElement){
    sheetHandle.setAttribute('role','button');sheetHandle.setAttribute('tabindex','0');sheetHandle.setAttribute('aria-label','Drag to expand or close the Fling form');sheetHandle.setAttribute('aria-controls','flingSheet');
    let handleStartY=0,handleDelta=0,handlePointerId=null,handleDragging=false,suppressHandleClick=false;
    const toggleSheetSize=()=>sheetElement.classList.toggle('sheet-expanded');
    sheetHandle.addEventListener('pointerdown',e=>{
      if(!sheetElement.classList.contains('open'))return;
      handleStartY=e.clientY;handleDelta=0;handlePointerId=e.pointerId;handleDragging=true;
      sheetHandle.style.cursor='grabbing';sheetElement.style.transition='none';
      try{sheetHandle.setPointerCapture(e.pointerId)}catch{}
    });
    sheetHandle.addEventListener('pointermove',e=>{
      if(!handleDragging||e.pointerId!==handlePointerId)return;
      handleDelta=e.clientY-handleStartY;
      const offset=handleDelta>0?Math.min(handleDelta,sheetElement.offsetHeight):Math.max(handleDelta,-56);
      sheetElement.style.transform=`translate(-50%, ${offset}px)`;
    });
    const finishHandleGesture=e=>{
      if(!handleDragging||(e.pointerId!==undefined&&e.pointerId!==handlePointerId))return;
      handleDragging=false;handlePointerId=null;sheetHandle.style.cursor='';sheetElement.style.transition='';sheetElement.style.transform='';
      if(Math.abs(handleDelta)>8){suppressHandleClick=true;setTimeout(()=>{suppressHandleClick=false},300)}
      if(handleDelta>105){sheetClose()}
      else if(handleDelta<-38){sheetElement.classList.add('sheet-expanded')}
    };
    sheetHandle.addEventListener('pointerup',finishHandleGesture);sheetHandle.addEventListener('pointercancel',finishHandleGesture);
    sheetHandle.addEventListener('click',e=>{if(suppressHandleClick){e.preventDefault();return}toggleSheetSize()});
    sheetHandle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleSheetSize()}else if(e.key==='Escape'){sheetClose()}});
  }

  // Keep the shared demo board synchronized if the app is open in another tab.
  window.addEventListener('storage',event=>{
    if(event.key==='fling.reports.v1'){try{const next=JSON.parse(event.newValue||'[]');if(Array.isArray(next)){abuseReports=next;if($('#adminView').classList.contains('active'))renderAdminConsole()}}catch{}}
    if(event.key==='fling.potential-reports.v1'){
      try{const next=JSON.parse(event.newValue||'[]');if(Array.isArray(next)){potentialReports=next;renderPotentialReports()}}catch{}
    }
    if(event.key==='fling.community.v1'){
      try{const next=JSON.parse(event.newValue||'[]');if(Array.isArray(next)){community=next;renderFind();if(activeDetail){const refreshed=community.find(item=>item.id===activeDetail.id);if(refreshed)openDetails(refreshed,returnView)}}}catch{}
    }
    if(event.key==='fling.chats.v1'){
      try{const next=JSON.parse(event.newValue||'[]');if(Array.isArray(next)){chats=next;updateChatBadge();if($('#chatsView').classList.contains('active'))renderChats();if($('#chatView').classList.contains('active')&&activeChatId){const refreshed=chats.find(c=>c.id===activeChatId);if(refreshed)renderChat(refreshed)}}}catch{}
    }
    if(event.key==='fling.mine.accounts.v1'){
      mineAccounts=loadObject('fling.mine.accounts.v1',mineAccounts);
      if(profile){mine=ensureMineFor(profile.email);renderMine()}
    }
  });
  enhanceSelects(document);
  if(profile)enterApp();else showLogin();
})();
