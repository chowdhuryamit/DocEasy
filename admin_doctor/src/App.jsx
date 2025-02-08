

function App() {
  const today=new Date();
  for (let index = 0; index < 7; index++) {
    const currDate=new Date(today+index)
    console.log(currDate);
    
    
    
  }
  
  
  
  return (
    <>
     <p className="text-green-400 bg-gray-500">hello world</p>
    </>
  )
}

export default App
