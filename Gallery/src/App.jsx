import React, {useEffect, useState} from 'react'
import  axios  from 'axios'

const App = () => {

  const [UserData, setUserData] = useState([]);

  const [index, setIndex] = useState(1);

  const getData = async() => {
   
   

    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserData(response.data)
    console.log(response.data);
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className='text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 - translate-y-1/2'>Loading...</h3>

   if(UserData.length>0){
    printUserData = UserData.map(function(elem,idx){

     return <div key={idx}>
       <a href={elem.url} target='_blank'>
         <div className='h-40 w-44 overflow-hidden rounded-xl'>
        <img className='h-full w-full object-cover' src={elem.download_url} alt="" />
      </div>
      <h2 className='font-bold text-lg' >{elem.author}</h2>
       </a>
     </div>
    })
   } 

  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>
   <h1 className='fixed text-6xl'>{index}</h1>
    
{/*        
        <button
      onClick={getData}
      className='bg-red-600 mb-4 active:scale-95 px-5 py-2  rounded-full text-white '>get data</button> */}
    
    <div className='flex flex-wrap h-[83%] gap-4 p-2'>
      {printUserData}
    </div>
     <div className='flex justify-center gap-4 items-center p-4'>
      
      <button 
      className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
      onClick={()=>{
       if(index>1){
         setIndex(index-1)
         
       }
      }}
      >
        Prev
      </button>
     <h4 className='text-black bg-amber-50 py-2 px-2 rounded-2xl'>Page {index}</h4>
    <button
    className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
     onClick={()=>{
       setUserData([])

       setIndex(index+1)
      }}
    >
      Next
    </button>
     </div>
    </div>
  )
}

export default App
