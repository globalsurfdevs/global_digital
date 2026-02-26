import React from 'react' 

const blocked = () => {
  return (
    <>
       <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>403</h1>
      <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Access Denied</h2>
      <p style={{ color: '#666' }}>
        Sorry, this website is not available in your region.
      </p>
    </div> 
    </>
  )
}

export default blocked