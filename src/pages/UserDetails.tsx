import { getPersons, Person } from "@/store/features/personsSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";



const UserDetails = () => {
    const [person, setPerson] = useState<Person>();
    const state = useSelector(getPersons);
    const navigate = useNavigate();
    const {id} = useParams();
    
    if(!id){
        navigate("/");
    }

    useEffect(()=>{
        const person = state.persons.find((person:Person) => { return person.id.toString() === id});
        setPerson(person)
    },[id, state.persons])
    
    
    return (
        <div className="delete absolute z-10 left-0 top-0 flex w-full h-full items-center justify-center bg-neutral-300 bg-opacity-50">
            <div  className="rounded p-8 bg-white w-96 flex justify-center flex-col">
                <div className="flex">
                <label className="mr-1.5" >Name: </label>
                <h4 className="mb-2" > {person?.name}</h4>
                </div>
                <div className="flex">
                    <label className="mr-1.5" >Email: </label>
                <h4 className="mb-2" >{person?.email}</h4>
                </div>
                <div className="flex">
                    <label className="mr-1.5" >City: </label>
                <h4 className="mb-2" >{person?.address.city}</h4>
                </div>
                <button onClick={()=>{navigate("/")}} className="bg-blue-600 w-20 text-white h-10 rounded mr-2">Back</button>
            </div>
        </div>

    );
};

export default UserDetails;