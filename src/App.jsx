import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import authService  from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header , Footer}  from './components';
import { Outlet } from 'react-router-dom';
import { ThemeContextProvider } from './context/theme'

function App() {

  const [loading, setLoading] =useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout());
      }
    })
    .finally(setLoading(false))
  },[])

  const [themeMode, setThemeMode] = useState("dark")

  const lightTheme = () => {
    setThemeMode("light");
  }

  const darkTheme = () => {
    setThemeMode("dark");
  }

  useEffect(()=>{
    document.querySelector('html').classList.remove("light" , "dark")
    document.querySelector('html').classList.add(themeMode)// mainly responsible for changing ui
  }, [themeMode])


  return !loading ? (
    <ThemeContextProvider value= {{themeMode, lightTheme, darkTheme}} >

    <div className="min-h-screen flex flex-wrap content-between bg-slate-200 ">
      <div className="w-full block">
        <Header/>  

        <main className="bg-slate-50 h-4/5 dark:bg-customBlack"> 
            <Outlet/>
        </main>

        <Footer/>

      </div>
    </div>

    </ThemeContextProvider>

  ) : <>
  <div>Loading...</div></>
}
export default App