import {useState} from 'react'

const App = () => {

const [title, setTitle] = useState('')
const [details, setDetails] = useState('')

const [task, setTask] = useState([])

const submitHandler = (e)=>{
  e.preventDefault();
  
  const copyTask =[...task];

  copyTask.push({title, details})
 
  setTask(copyTask)
  

  setTitle('')
  setDetails('')
}

  const deleteNote = (idx)=>{
    const copyTask = [...task];
    copyTask.splice(idx,1)
    setTask(copyTask)
    //console.log(idx);
  }


  return (
    <div className='h-screen lg:flex  bg-black text-white'>
     
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className='flex flex-col items-start gap-4 p-10'>
        <div className='flex gap-4 w-1/2 items-start flex-col'>
         
        <h1 className='text-4xl mb-2 font-bold'> Add Notes</h1>

        <input 
        type="text" 
        className='px-5 py-2 w-full  font-medium border-2 outline-none rounded'
        placeholder='Enter Notes Heading '
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        /> 
        
        <textarea
         type="text"
         className='px-5 py-2  w-full font-medium h-32 flex items-start flex-row border-2 outline-none rounded'
         placeholder='Writing Details'
         value={details}
         onChange={(e)=>{
          setDetails(e.target.value)
         }}
        
        />
       
         <button 
          className='bg-white active:bg-amber-950 text-black px-5 py-2 rounded'>
          Add Note
          </button>
       </div>
      </form>
      <div className=' lg:w-1/2 border-l-2 p-10'>
        <h1 className='text-xl font-bold'>Recent Notes</h1>
       <div className='flex flex-wrap items-start justify-start gap-5 mt-5 overflow-auto h-[90%'>
        {task.map(function(elem,idx){
          
      return (
        
      <div key={idx} className='h-52 w-40 bg-cover pt-9 rounded-xl flex flex-col justify-between relative text-black pb-4 px-4 bg-white'>
        <div>
          <h3 className='leading-tight text-lg font-bold'>{elem.title}</h3>
         <p className='mt-4 leading-tight font-medium text-gray-500  text-sm'>{elem.details}</p>
        </div>
        <button onClick={() =>{
          deleteNote(idx)
        }} className='w-full cursor-pointer active:scale-95 bg-red-600 py-1 text-xs rounded font-bold text-white '>Delete</button>
      </div>
      ) 

      })}
          
       </div>
      </div>
    </div>
  )
}

export default App
