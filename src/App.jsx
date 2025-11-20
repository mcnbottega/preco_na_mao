import React, { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [query, setQuery] = useState("");
  const [city] = useState("São João");

  return (
    <div style={{fontFamily:'Inter, sans-serif', background:'#f3f4f6', minHeight:'100vh', padding:20}}>
      <div style={{maxWidth:420, margin:'0 auto'}}>
        <Header onNavigate={setScreen} city={city} />
        <div style={{marginTop:16}}>
          {screen === 'home' && <Home onSearch={(q)=>{ setQuery(q); setScreen('results'); }} />}
          {screen === 'results' && <Results query={query} onBack={()=>setScreen('home')} onOpenProduct={()=>setScreen('product')} />}
          {screen === 'product' && <Product onBack={()=>setScreen('results')} onRoute={()=>alert('Abrir rota no Google Maps (simulado)')} />}
          {screen === 'submit' && <Submit onBack={()=>setScreen('home')} onSend={()=>{ alert('Preço enviado! Obrigado pela contribuição.'); setScreen('home'); }} />}
          {screen === 'profile' && <Profile onBack={()=>setScreen('home')} city={city} />}
        </div>
        <BottomNav onNavigate={setScreen} active={screen} />
      </div>
    </div>
  );
}

function Header({ onNavigate, city }){
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', background:'white', padding:12, borderRadius:10, boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
      <div>
        <div style={{fontSize:18, fontWeight:700}}>Preço na Mão</div>
        <div style={{fontSize:12, color:'#6b7280'}}>Cidade: {city}</div>
      </div>
      <div>
        <button onClick={()=>onNavigate('profile')} style={{padding:'6px 10px', borderRadius:8, border:'none', background:'#111827', color:'white'}}>Minha Cidade</button>
      </div>
    </div>
  );
}

function Home({ onSearch }){
  const [value, setValue] = useState("");
  return (
    <div style={{background:'white', padding:16, borderRadius:10, marginTop:12}}>
      <div style={{fontSize:16, fontWeight:600, marginBottom:8}}>Encontre o melhor preço na sua cidade</div>
      <div style={{display:'flex', gap:8}}>
        <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Ex: arroz 5kg" style={{flex:1,padding:12,borderRadius:8,border:'1px solid #e5e7eb',fontSize:16}} />
        <button onClick={()=>onSearch(value || 'arroz 5kg')} style={{background:'#0ea5a4',border:'none',padding:'12px 14px',borderRadius:8,color:'white',fontWeight:600}}>Buscar</button>
      </div>

      <div style={{marginTop:12}}>
        <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>Favoritos rápidos</div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>onSearch('arroz 5kg')} style={chipStyle}>Arroz 5kg</button>
          <button onClick={()=>onSearch('leite 1L')} style={chipStyle}>Leite 1L</button>
          <button onClick={()=>onSearch('dipirona')} style={chipStyle}>Dipirona</button>
        </div>
      </div>

      <div style={{marginTop:14,fontSize:13,color:'#6b7280'}}>Dica: toque em ‘Cadastrar’ para enviar uma foto do preço e ajudar sua cidade.</div>
    </div>
  );
}

const chipStyle = {padding:'8px 10px',background:'#f3f4f6',border:'1px solid #e5e7eb',borderRadius:8,fontSize:15}

function Results({ query, onBack, onOpenProduct }){
  const sample = [
    { store: "Mercado Central", price: "R$ 18,90", distance: "1,2 km" },
    { store: "Mercadinho São José", price: "R$ 19,50", distance: "800 m" },
    { store: "Super Bom", price: "R$ 20,00", distance: "2,1 km" },
  ];

  return (
    <div style={{background:'white', padding:14, borderRadius:10, marginTop:12}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <button onClick={onBack} style={{border:'none', background:'transparent', color:'#0ea5a4'}}>← Voltar</button>
        <div style={{fontSize:16,fontWeight:700}}>{query || 'Resultados'}</div>
        <div />
      </div>

      <div style={{marginTop:8,fontSize:13,color:'#6b7280'}}>Melhor preço hoje</div>

      <ul style={{marginTop:12,listStyle:'none',padding:0,display:'grid',gap:12}}>
        {sample.map((s,i)=> (
          <li key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:12,borderRadius:8,border:'1px solid #e5e7eb'}}>
            <div>
              <div style={{fontWeight:700}}>{s.store}</div>
              <div style={{fontSize:13,color:'#6b7280'}}>{s.distance}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:18,fontWeight:800}}>{s.price}</div>
              <div style={{marginTop:8,display:'flex',gap:8,justifyContent:'flex-end'}}>
                <button onClick={onOpenProduct} style={{padding:'6px 10px',borderRadius:8,border:'none',background:'#10b981',color:'white'}}>Ver</button>
                <button onClick={()=>alert('Abrir rota (simulado)')} style={{padding:'6px 10px',borderRadius:8,border:'1px solid #e5e7eb',background:'white'}}>Rota</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{marginTop:12,fontSize:13,color:'#6b7280'}}>Contribua: toque em "Cadastrar" na barra inferior para enviar uma foto de preço.</div>
    </div>
  );
}

function Product({ onBack, onRoute }){
  return (
    <div style={{background:'white', padding:14, borderRadius:10, marginTop:12}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onBack} style={{border:'none',background:'transparent',color:'#0ea5a4'}}>← Voltar</button>
        <div style={{fontSize:16,fontWeight:700}}>Arroz 5kg</div>
        <div />
      </div>

      <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12}}>
        <div style={{width:86,height:86,background:'#f3f4f6',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>Foto</div>
        <div>
          <div style={{fontSize:16,fontWeight:700}}>Arroz 5kg</div>
          <div style={{fontSize:13,color:'#6b7280'}}>Categoria: Mercado</div>
          <div style={{marginTop:8,fontWeight:800,fontSize:18}}>R$ 18,90</div>
          <div style={{marginTop:6,fontSize:12,color:'#6b7280'}}>Última atualização: 2 horas</div>
        </div>
      </div>

      <div style={{display:'flex',gap:10,marginTop:14}}>
        <button onClick={onRoute} style={{flex:1,padding:12,borderRadius:8,border:'none',background:'#0ea5a4',color:'white'}}>Ir ao melhor preço</button>
        <button onClick={()=>navigator.share ? navigator.share({title:'Preço',text:'Arroz 5kg por R$18,90'}) : alert('Compartilhar (simulado)')} style={{flex:1,padding:12,borderRadius:8,border:'1px solid #e5e7eb',background:'white'}}>Compartilhar</button>
      </div>
    </div>
  );
}

function Submit({ onBack, onSend }){
  const [product,setProduct] = useState('');
  const [price,setPrice] = useState('');
  const [store,setStore] = useState('');
  return (
    <div style={{background:'white',padding:14,borderRadius:10,marginTop:12}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={onBack} style={{border:'none',background:'transparent',color:'#0ea5a4'}}>← Voltar</button>
        <div style={{fontSize:16,fontWeight:700}}>Cadastrar preço</div>
        <div />
      </div>

      <div style={{marginTop:12,display:'grid',gap:8}}>
        <input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="Produto" style={inputStyle} />
        <input value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Preço (R$)" style={inputStyle} />
        <input value={store} onChange={(e)=>setStore(e.target.value)} placeholder="Loja" style={inputStyle} />
        <div style={{height:90,border:'1px dashed #e5e7eb',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'#6b7280'}}>Toque para anexar foto (simulado)</div>

        <button onClick={()=>{ if(!product||!price||!store) return alert('Preencha os campos'); onSend(); }} style={{padding:12,borderRadius:8,border:'none',background:'#10b981',color:'white',fontWeight:700}}>Enviar</button>
      </div>

      <div style={{marginTop:10,fontSize:12,color:'#6b7280'}}>Sua contribuição ajuda a comunidade. Preços suspeitos são verificados.</div>
    </div>
  );
}

const inputStyle = {padding:12,borderRadius:8,border:'1px solid #e5e7eb',fontSize:15}

function Profile({ onBack, city }){
  return (
    <div style={{background:'white', padding:14, borderRadius:10, marginTop:12}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:16,fontWeight:700}}>Minha Cidade</div>
          <div style={{fontSize:13,color:'#6b7280'}}>{city}</div>
        </div>
        <button onClick={onBack} style={{border:'none',background:'#ef4444',color:'white',padding:'8px 10px',borderRadius:8}}>Fechar</button>
      </div>

      <div style={{marginTop:12,fontSize:14}}>
        <div>Lojas ativas: <strong>8</strong></div>
        <div>Contribuidores: <strong>124</strong></div>

        <div style={{marginTop:12}}>
          <button onClick={()=>alert('Receber alertas por WhatsApp (simulado)')} style={{padding:12,borderRadius:8,border:'none',background:'#f59e0b',color:'white',fontWeight:700}}>Receber alertas por WhatsApp</button>
        </div>
      </div>
    </div>
  );
}

function BottomNav({ onNavigate, active }){
  return (
    <div style={{position:'fixed',left:0,right:0,bottom:18,display:'flex',justifyContent:'center'}}>
      <div style={{background:'white',padding:10,borderRadius:999,boxShadow:'0 6px 20px rgba(2,6,23,0.08)',display:'flex',gap:8}}>
        <button onClick={()=>onNavigate('home')} style={navBtnStyle(active==='home')}>Início</button>
        <button onClick={()=>onNavigate('results')} style={navBtnStyle(active==='results')}>Buscar</button>
        <button onClick={()=>onNavigate('submit')} style={navBtnStyle(active==='submit')}>Cadastrar</button>
        <button onClick={()=>onNavigate('profile')} style={navBtnStyle(active==='profile')}>Cidade</button>
      </div>
    </div>
  );
}

function navBtnStyle(active){
  return {padding:'8px 12px',borderRadius:8,border:'none',background: active? '#e6fffa':'transparent',fontWeight:700}
}
