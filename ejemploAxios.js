import axios from "axios";

const listadoDeProductos = async () => {
    try {
        const {data} = await axios.get('https://clasesbackend-production-7d6f.up.railway.app/api/ver')
        return data
    } catch (error) {
        console.log({data: error.response.data, status: error.response.status})
    }
}

const guardarProductos = async (productoAGuardar) => {
    try {
        const {data} = await axios.post('https://clasesbackend-production-7d6f.up.railway.app/api/crear',{
            productoAGuardar
        })
        return data
    } catch (error) {
        console.log({data: error.response.data, status: error.response.status})
    }
}

const login = async (email, password) => {
    try {
        const {data} = await axios.post('https://clasesbackend-production-7d6f.up.railway.app/api/logintoken',{
            email: email,
            password: password
        })
        return data
    } catch (error) {
        console.log({data: error.response.data, status: error.response.status})
    }
}

const listadoDeProductosConToken = async (token) => {
    try {
        const {data} = await axios.get('https://clasesbackend-production-7d6f.up.railway.app/api/ver', {
            headers: {
                "x-token": token
            }
        })
        return data
    } catch (error) {
        console.log({data: error.response.data, status: error.response.status})
    }
}

const guardarProductosConToken = async (productoAGuardar, token) => {
    try {
        const {data} = await axios.post('https://clasesbackend-production-7d6f.up.railway.app/api/crear',{
            productoAGuardar
        },{
            headers: {
                "x-token": token
            }
        })
        return data
    } catch (error) {
        console.log({data: error.response.data, status: error.response.status})
    }
}
