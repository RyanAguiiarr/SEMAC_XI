import React from 'react';
import './BackgroundImage.css';

const BackgroundImage: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determina qual imagem usar baseado no estado 'isMobile'
  const imageUrl = isMobile ? '/fundoXI.jpeg' : '/fundoXIH.jpeg';

  return (
    <>
      <div 
        className="background-container"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="background-overlay" />
    </>
  );
};

export default BackgroundImage;