import { useState } from 'react';
import AxiosService from "../Services/AxiosService.js";
import { Toaster, toast } from 'sonner'


export default function Auth({path}) {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${path}`, formData);
            const response = await AxiosService.post(path, formData);
            setFormData({
                username: '',
                password: ''
            });

            toast.success(response.data.message);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    return (
        <>
            <Toaster/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username}/>
                <br/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password}/>
                <br/>
                <button type="submit">{path}</button>
            </form>
        </>
    )
}