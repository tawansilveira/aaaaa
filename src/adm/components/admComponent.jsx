import NavBar from '../../components/nav_bar'; // Assuming the correct path

const AdmComponent = ({ withoutNavBar }) => {
    return (
      <div>
        {!withoutNavBar && <NavBar />} {/* Renderizar navbar condicionalmente se `withoutNavBar` não for true */}
        {/* ... seu conteúdo ADM */}
      </div>
    );
  };


export default AdmComponent;
