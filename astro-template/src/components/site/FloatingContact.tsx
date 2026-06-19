'use client'
import React, { useState } from 'react'

interface Props {
  primaryPhone: string | null
  whatsapp: string | null
}

export default function FloatingContact({ primaryPhone, whatsapp }: Props) {
  const [open, setOpen] = useState(false)
  if (!primaryPhone && !whatsapp) return null

  const s: Record<string, React.CSSProperties> = {
    wrap: { position:'fixed', bottom:'28px', left:'24px', zIndex:200, display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'10px', fontFamily:'inherit' },
    btns: { display:'flex', flexDirection:'column', gap:'10px', opacity: open?1:0, pointerEvents: open?'auto':'none', transform: open?'translateY(0)':'translateY(12px)', transition:'opacity .2s, transform .2s' },
    btn: { display:'flex', alignItems:'center', gap:'10px', padding:'11px 18px', borderRadius:'50px', fontSize:'.95rem', fontWeight:600, color:'#fff', boxShadow:'0 4px 16px rgba(0,0,0,.18)', cursor:'pointer', whiteSpace:'nowrap', textDecoration:'none' },
    wa: { background:'#25d366' },
    ph: { background:'var(--sf-primary, #2563eb)' },
    toggle: { display:'flex', alignItems:'center', gap:'8px', padding:'13px 22px', background:'var(--sf-primary, #2563eb)', color:'#fff', border:'none', borderRadius:'50px', cursor:'pointer', fontSize:'.95rem', fontWeight:700, fontFamily:'inherit', boxShadow:'0 4px 20px rgba(37,99,235,.4)' },
  }

  return (
    <div style={s.wrap}>
      <div style={s.btns}>
        {whatsapp && (
          <a href={whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" style={{...s.btn,...s.wa}}>
            💬 واتساپ
          </a>
        )}
        {primaryPhone && (
          <a href={`tel:${primaryPhone.replace(/\D/g,'')}`} style={{...s.btn,...s.ph}} dir="ltr">
            📞 {primaryPhone}
          </a>
        )}
      </div>
      <button style={s.toggle} onClick={() => setOpen(!open)} aria-label={open?'بستن':'تماس'} aria-expanded={open}>
        {open ? '✕' : '📞'} {!open && 'تماس'}
      </button>
    </div>
  )
}
