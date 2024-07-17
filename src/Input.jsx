import { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure Auth is used properly in your actual implementation
import { onValue, ref, set } from "firebase/database";

function Input(prop) {
  const [input, setInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [err, setErr] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(null); // Track copied URL
  const dataRef = ref(db, 'user/' + prop.uid);

  const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

  async function request(posturl) {
    
    const response = await 
    fetch('https://smolurl.com/api/links', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          url: posturl
      })
  })
    
    const rJson = await response.json();
    return rJson;
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errorMessageElement = document.getElementById('errM');

    if (pattern.test(input) && !isDuplicate(input)) {
      setErr(false);
      errorMessageElement.textContent = ''; // Clear error message
      request(input).then(r => {
        const newUrlData = { long: input, short: r.data.short_url };
        setUrls([...urls, newUrlData]);
      })
    } else if (input === '') {
      setErr(true);
      errorMessageElement.textContent = 'please add a link';
    } else {
      setErr(true);
      errorMessageElement.textContent = 'Invalid URL'; // Display error message
    }
  }

  function isDuplicate(url) {
    return urls.some(item => item.long === url);
  }

  async function clipboard(copy) {
    await navigator.clipboard.writeText(copy);
    setCopiedUrl(copy); // Update the copied URL state
  }
 useEffect(()=>{
  if(prop.uid.length!==0){
    onValue(dataRef,(snap)=>{
      const snapdata=snap.val();
      if(snapdata[0]!=="initialization"){
        setUrls(snapdata)
      }
    })
  }
 
 },[prop.uid])
  useEffect(()=>{
    if(urls.length!==0 && prop.uid.length!==0){
      set(dataRef,urls)
    }
    
  },[urls])

  return (
    <div className='xl:mx-[12%] max-sm:mt-32 max-sm:mx-4 relative'>
      <form className='flex justify-center items-center max-sm:flex-col h-40 bg-[#3a3053] rounded-md xl:mt-20 xl:bg-input-desk max-sm:bg-input-mobile bg-cover bg-no-repeat max-sm:bg-right-top'>
        <input
          onChange={handleChange}
          className={`rounded-md max-sm:w-11/12 xl:w-4/6 xl:h-1/3 px-10 outline-none max-sm:h-1/3  ${err ? "err" : ""}`}
          type="text"
          name="url"
          id="url"
          placeholder='Shorten a link here...'
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className='max-sm:mt-3 max-sm:h-1/3 max-sm:w-11/12 xl:w-1/6 xl:h-1/3 xl:ml-5 rounded-md bg-Cyan font-bold text-[#fff] hover:brightness-125 transition duration-500'
        >
          Shorten It!
        </button>
        
      </form>
      <div className="relative">
        <h1 className={` absolute left-[8%] bottom-[100%] text-[#f00] max-sm:hidden`} id="errM"></h1>
      </div>
      <ol className="xl:mt-10">
        {urls.map((data, i) => (
          <li key={i} className="flex xl:justify-between xl:items-center max-sm:flex-col bg-[#fff] xl:h-20 max-sm:mt-5">
            <h1 className="font-medium max-sm:my-5">{data.long}</h1>
            <div className="xl:flex items-center justify-center">
              <span className="text-Cyan font-medium block max-sm:my-5">{data.short}</span>
              <button
                onClick={() => clipboard(data.short)}
                className={`${copiedUrl === data.short ? "bg-Dark-Violet" : "bg-Cyan"} max-sm:w-full max-sm:h-12 text-[#fff] font-bold rounded-md xl:mx-5 xl:w-24 xl:h-10 transition-all ${copiedUrl === data.short ? "bg-green-500" : "hover:brightness-150"}`}>
                {copiedUrl === data.short ? "Copied!" : "Copy"}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Input;
