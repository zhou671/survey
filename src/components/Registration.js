import { useState } from "react"
import "./styles/registration.css"

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
        <main id="main-holder">
            <h1 id="login-header">Login</h1>

            {/* <label>Welcome to the sequential modeling suevey! Please input your name and click on "Enter Survey" to begin or continue.</label> */}


            <form id="login-form" onSubmit={onSubmit}>
                <input type="text" id="username-field" class="login-form-field" placeholder='UserName' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                <input type="submit" value='Enter Survey' id="login-form-submit"/>
            </form>
        </main>
    )
}

export default Registration
