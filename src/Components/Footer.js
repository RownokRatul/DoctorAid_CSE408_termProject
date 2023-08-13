// components/Footer.js

const Footer = () => {
    return (
      <footer style={{ backgroundColor: '#f3f3f3', padding: '20px', textAlign: 'center', position: 'absolute', width: '100%', bottom: 0 }}>
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  