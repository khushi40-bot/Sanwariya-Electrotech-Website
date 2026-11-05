import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'An unexpected rendering error occurred.' };
  }

  componentDidCatch(error) {
    console.error('Sanwariya website rendering error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{minHeight:'100vh',background:'#06152e',color:'#eaf7ff',display:'grid',placeItems:'center',padding:'28px',fontFamily:'Arial,sans-serif'}}>
          <section style={{maxWidth:'680px',border:'1px solid #245477',background:'#0b203b',borderRadius:'16px',padding:'32px',boxShadow:'0 20px 70px #0006'}}>
            <p style={{color:'#50d9ff',letterSpacing:'.16em',fontSize:'12px'}}>SANWARIYA ELECTROTECH</p>
            <h1 style={{fontSize:'28px',margin:'12px 0'}}>The website could not finish loading.</h1>
            <p style={{color:'#b5c8dc',lineHeight:1.7}}>A frontend error occurred. Please check the browser console and confirm that dependencies are installed with <code>npm install</code>.</p>
            <pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',background:'#06152e',padding:'14px',borderRadius:'8px',color:'#ffb8ad'}}>{this.state.message}</pre>
            <button onClick={()=>window.location.reload()} style={{marginTop:'10px',padding:'12px 18px',border:0,borderRadius:'6px',background:'#20c7ed',color:'#06152e',fontWeight:700,cursor:'pointer'}}>Reload website</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
