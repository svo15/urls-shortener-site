import Input from './Input'
import Sign from './sign';
import Login from './login';
import { useEffect, useRef, useState } from 'react';
import { Auth } from "./firebase";


function App() {
  const inputRef=useRef(null);
  const [menu,setmenu]=useState(false);
  const [option,setoption]=useState(0);
  const [uid,setuid]=useState('');
  const [load,setload]=useState(false)
  const scrollToInput = () => {
    inputRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  function turnoff(){
    if(menu){
      setmenu(false)
    }
    setoption(0)
  }
  
    useEffect(() => {
    const timer = setTimeout(() => {
      setoption(3); // Trigger a re-render
      setuid(Auth.currentUser.uid);
      setload(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  
  
  
  
  return (<>
  
  <div className={`bg-Dark-Violet flex flex-col py-10 px-5 text-center text-[#fff] absolute w-[320px] h-[400px] rounded-md xl:hidden ${menu? "top-20":"-top-[500px]"} left-5 transition-all`}>
    <a href="/" className='font-bold mb-10'>Features</a>
    <a href="/" className='font-bold mb-10'>Pricing</a>
    <a href="/" className='font-bold mb-10'>Resources</a> 
    <hr className='border-[#4B3F6B] border-[1px]'></hr>
     <button  onClick={()=>setoption(2)} className=' my-8 font-bold'>Login</button>
     <button onClick={()=>setoption(1)} className=' font-bold bg-Cyan h-10 rounded-full'>Sign Up</button>
  </div>
  <Sign Option={option} setoption={setoption} ></Sign>
  <Login Option={option} setoption={setoption}></Login>
  <header className='xl:mx-[12%] xl:mt-16 mx-3 mt-8 flex items-center justify-between'>
        <div className='flex items-center font-bold '>
          <img src="images/logo.svg" alt="logo"/>
          <nav className='max-sm:hidden'>
            <a className="ml-7 text-Gray hover:text-[#000] transition duration-500" href="/">Features</a>
            <a className='ml-6 text-Gray hover:text-[#000] transition duration-500' href="/">Pricing</a>
            <a className='ml-6 text-Gray hover:text-[#000] transition duration-500' href="/">Resources</a>
          </nav>
        </div>
        <div className={`flex items-center ${Auth.currentUser!==null?"hidden":""} `}>
          <button onClick={()=>setoption(2)} className='max-sm:hidden w-24 h-10 mr-10 text-Gray hover:text-[#000] transition duration-500'>Login</button>
          <button onClick={()=>setoption(1)} className=' max-sm:hidden w-24 h-10 bg-Cyan rounded-full font-bold text-[#fff] hover:brightness-125 transition duration-500'>Sign Up</button>
          <img onClick={()=>setmenu(true)} className='block xl:hidden w-8 h-8 ' src="images/menu.svg" alt="menu" />
        </div> 
        <div className={Auth.currentUser===null?"hidden":""}>
          <p>{Auth.currentUser===null?"":Auth.currentUser.email }</p><button onClick={()=>{Auth.signOut();window.location.reload(false);}} className='text-Dark-Violet'>signOut</button>
        </div>
      </header>
    <main onClick={()=>turnoff()} className='w-full h-full '>
      
      <main className='xl:ml-[12%] xl:mt-40 max-sm:mx-4'>
        <div className='flex justify-center items-center max-sm:flex-col-reverse'>
          <div className='xl:w-1/2 max-sm:text-center'>
            <h1 className='xl:text-7xl font-bold max-sm:text-4xl'>More than just shorter links</h1>
            <p className='mt-5 mb-12 xl:text-xl  text-Gray max-sm:text-xl'>Build your brand's recognition and get detailed
              insights on how your links are perfoming</p>
            <button onClick={scrollToInput} className='bg-Cyan w-44 h-12 rounded-full text-[#fff] font-semibold hover:brightness-125 transition duration-500'>Get Started</button>
          </div>
          <img className='xl:w-1/2 xl:ml-20 max-sm:ml-20 max-sm:h-64 max-sm:mt-20 ' src="images/illustration-working.svg" alt="" />
        </div> 
      </main>
      <div ref={inputRef}>
       <Input uid={uid} uload={load} />
      </div>
      <div className='xl:mx-[12%] xl:mt-60 max-sm:mx-4 mt-40 max-sm:h-[1400px] '>
        <div className='text-center'>
          <h1 className='font-bold xl:text-5xl text-3xl'>Advanced Statistics</h1>
          <p className='text-Gray mt-10 xl:text-xl'>Track how your links are perfoming across the web with our<br></br> advanced statistics dashboard</p>
        </div>
        <div className='h-96 mt-20 xl:flex xl:relative'>
          <div className='xl:block hidden h-[10px] w-full absolute bg-Cyan -z-10 top-60'></div>
          <div className=' xl:w-2/3 w-full bg-[#fff] p-5 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center'>
            <div className='bg-[#3a3053] rounded-full w-20 h-20 flex justify-center items-center'>
              <img src="images/icon-brand-recognition.svg" alt="" />
            </div>
            <h1 className='mt-10 text-xl font-bold'>Brand Recognition</h1>
            <p className='mt-5 text-Grayish-Violet'>Bosst your brand recognition with 
              each click. Generic links dont't mean a 
              thing. Branded links help instil
              confidence in your content
            </p>
          </div>
          <div className=' xl:w-2/3 w-full bg-[#fff] xl:mx-10 xl:mt-10 p-5 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center'>
            <div className='bg-[#3a3053] rounded-full w-20 h-20 flex justify-center items-center'>
              <img src="images/icon-detailed-records.svg" alt="" />
            </div>
            <h1 className='mt-10 text-xl font-bold'>Detailed Records</h1>
            <p className='mt-5 text-Grayish-Violet'>
              Gain insights into who is clicking your
              links. Knowing when and where
              people engage with your content
              helps inform better decisions
            </p>
          </div>
          <div className=' xl:w-2/3 w-full bg-[#fff] xl:mt-20 p-5 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:text-center'>
            <div className='bg-[#3a3053] rounded-full w-20 h-20 flex justify-center items-center'>
              <img src="images/icon-fully-customizable.svg" alt="" />
            </div>
            <h1 className='mt-10 text-xl font-bold'>Fully Customizable</h1>
            <p className='mt-5 text-Grayish-Violet'>
              Improve brand awareness and 
              content discoverability through
              customizable links. supercharging
              audience engagement
            </p>
          </div>
        </div>
      </div>
      <footer className='xl:mt-40 max-sm:h-[1150px] bg-Very-Dark-Violet '>
        <div className='xl:h-60 h-80 bg-Dark-Violet xl:bg-fotter-desk max-sm:bg-fotter-mobile bg-no-repeat bg-cover text-center pt-20'>
          <h1 className='text-[#fff] text-4xl font-bold'>Boost your links today</h1>
          <button onClick={scrollToInput} className='bg-Cyan w-52 h-14 mt-10 rounded-full text-[#fff] text-xl font-semibold hover:brightness-125 transition duration-500'>Get Started</button>
        </div>
        <div className='h-80 xl:mx-[12%] mt-14 flex text-[#fff] max-sm:flex-col max-sm:items-center'>
          <img className="logo h-10 " src="images/logo.svg" alt="logo"/>
          
          <nav className='flex flex-col xl:ml-60 max-sm:text-center max-sm:mt-10'>
              <h1 className='mb-5 font-bold'>Features</h1>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Link Shortening</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Branded Links</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Analytics</a>
          </nav>

          <nav className='flex flex-col xl:ml-20 max-sm:text-center max-sm:mt-10'>
              <h1 className='mb-5 font-bold'>Resources</h1>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Blog</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Developers</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Support</a>
          </nav>

          <nav className='flex flex-col xl:ml-20 max-sm:text-center max-sm:mt-10'>
              <h1 className='mb-5 font-bold'>Company</h1>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>About</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Our Team</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Careers</a>
              <a href="/" className='text-Grayish-Violet mb-3 hover:text-Cyan'>Contact</a>
          </nav>

          <nav className='flex flex-row xl:ml-20 max-sm:mt-10'>
              <a href="/" className='social h-[24px] change'><img src="images/icon-facebook.svg"alt="Facebook" /></a>
              <a href="/" className='ml-5 social h-[24px] change'><img src="images/icon-twitter.svg" alt="Twitter" /></a>
              <a href="/" className='ml-5 social h-[24px] change'><img src="images/icon-pinterest.svg" alt="Pinterest" /></a>
              <a href="/" className='ml-5 social h-[24px] change'><img src="images/icon-instagram.svg" alt="Instagram" /></a>
          </nav>
        </div>
      </footer>
      </main>
      
    </>
  )
}

export default App
