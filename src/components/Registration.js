import { useState } from "react"

const Registration = ({onRegister}) => {
    const [userName, setUserName] = useState('')

    const onSubmit = (e) =>{
        e.preventDefault()

        if(!userName){
            alert("Please input your userName")
            return
        }
        onRegister(userName)
    }    
    
    return (
        <form className="user-name-input" onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Welcome to the sequential modeling suevey! Please input your name and click on "Enter Survey" to begin or continue.</label>
                <input type="text" placeholder='User Name' value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <input type="submit" value='Enter Survey' className='btn btn-block'/>
        </form>
    )
}

export default Registration
