import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logo from '../assets/sanwariya-logo-transparent.png';

const links = [['Home','home'],['About','about'],['Services','services'],['Technologies','technologies'],['Our Work','work']];

export default function Navbar(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);

  useEffect(()=>{
    const updateScroll=()=>setScrolled(window.scrollY>24);
    updateScroll();
    window.addEventListener('scroll',updateScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',updateScroll);
  },[]);

  const close=()=>setOpen(false);
  return <header className={`navbar ${scrolled?'scrolled':''}`}>
    <a className="brand" href="#home" onClick={close}><img src={logo} alt="Sanwariya Electrotech logo"/><span>SANWARIYA <b>ELECTROTECH</b><small>PVT. LTD.</small></span></a>
    <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav-links show':'nav-links'}>{links.map(([label,id])=><a key={id} href={`#${id}`} onClick={close}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={close}>Get a Quote <ArrowUpRight size={16}/></a></nav>
  </header>
}
