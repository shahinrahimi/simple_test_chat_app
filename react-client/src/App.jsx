import React from 'react'
import './App.css'
import { MessagingContext } from '../context/MessagingContext'

function App() {

  const { socket } = React.useContext(MessagingContext)

  React.useEffect(() => {
    console.log("useEffect Ran")
  },[])
  
  const [inputValue, setInputValue] = React.useState("")

  const handleInput = (e) => setInputValue(e.target.value)

  const handleClick = () => {
    if (inputValue !== ""){
      console.log("Emitted")
      socket.emit('chat message', inputValue)
      setInputValue("")
    }
  }

  socket.on("chat message", (msg) => {
    const messageElement = document.createElement("li")
    messageElement.innerText = (msg)
    const messagesElement = document.querySelector("#messages")
    messagesElement.append(messageElement)
  })
  
  return (
    <div className="h-screen w-screen flex-col justify-between items-center bg-slate-700 p-20">
      <div className="w-full h-full grid place-content-center p-20">
        <ul className="h-[calc(40vh-40px)] bg-slate-300 p-3" id={"messages"}>
          Messages goes here
        </ul>
        <div className="flex h-10 justify-between">
          <input
            className='bg-slate-400 flex-grow outline-none p-2'
            type="text"
            value={inputValue}
            onChange={handleInput}
          />
          <button 
            className='bg-blue-600 px-4 py-2'
            onClick={handleClick}
          >Send</button>
        </div>
      </div>
      
      
    </div>
  )
}

export default App
