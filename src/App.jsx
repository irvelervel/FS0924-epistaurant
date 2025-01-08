import RestaurantNavbar from './components/RestaurantNavbar'
import HomeContent from './components/HomeContent'

// tolgo questo import CSS perchè utilizzeremo bootstrap
// import './App.css'
// importiamo una volta per tutte il CSS di bootstrap, da node_modules
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <RestaurantNavbar />
      <HomeContent />
    </>
  )
}

export default App
