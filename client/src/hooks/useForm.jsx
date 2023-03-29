import { useState } from "react";

export const useForm = (formData = {}) => {
    const [form, setForm] = useState(formData);
    
    const serialize = (data) => {
        const formData = new FormData(data);
        const serializedData = {};

        for(let [name, value] of formData) {
            serializedData[name] = value;
        }

        return serializedData;
    }

    const onSend = (e) => {
        e.preventDefault();

        setForm(serialize(e.target));

        document.querySelector(".code").classList.add("sent");
    }

    const onChange = ({target}) => {
        const {name, value} = target;

        setForm({...form, [name]: value});
    }

    return {
        form, 
        onSend, 
        onChange
    }
}