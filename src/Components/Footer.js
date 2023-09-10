// components/Footer.js

const Footer = () => {
    return (
      // set height 50 px
      <footer style={{ backgroundColor: '#f3f3f3', padding: '5px', textAlign: 'center', position: 'fixed', width: '100%', bottom: 0 }}>
      {/*<footer style={{ backgroundColor: '#f3f3f3', padding: '20px', textAlign: 'center', position: 'absolute', width: '100%', bottom: 0 }}>*/}
        <p>&copy; {new Date().getFullYear()} DoctorAid. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  