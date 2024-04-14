import {useState} from 'react'

export default function UserWelcome() {
    const [nombre, setNombre] = useState(null)

    function handleChange(nombre) {
        setNombre(nombre)
    }

    return (
        <>
        <h1>Welcome to the User Welcome Page</h1>
        <input 
            onChange={e => handleChange(e.target.value)}
            />
        <p>{nombre}</p>
        </>
    )
}