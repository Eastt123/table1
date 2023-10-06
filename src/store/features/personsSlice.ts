import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

export interface Person {
    id:number,
    name:string,
    email:string,
    address:{
        street:string,
        suite:string,
        city:string,
        zipcode:number,
        geo:{
            lat:number,
            lng:number
        }
    },
}

export interface PersonsState {
    persons:Person[],
    isLoading:boolean
}




const initialState:PersonsState ={
    persons:[],
    isLoading:false
}




export const fetchPersons = createAsyncThunk(
    'fetchPersons',
    async () => {
      const {data} = await axios.get("https://jsonplaceholder.typicode.com/users")
      return data;
    }
  );

export const deletePerson = createAsyncThunk(
    'deletePerson',
    async (id:number) => {
       await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
       .catch((error)=>{
            return error
        
       });
       const {data} = await axios.get("https://jsonplaceholder.typicode.com/users")
       return {id, data};
    }
  );
export const editPerson = createAsyncThunk(
    'editPerson',
    async (person:Person) => {
      const {data} = await axios.patch(`https://jsonplaceholder.typicode.com/users/${person.id}`,
     {...person},
      ).then((data)=>{
        return data
      }).catch((error) => {
        return error
      })
        
      return data;
    }
  );


export const PersonSlice = createSlice({
    name:"persons",
    initialState,
    reducers:{
       
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchPersons.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(fetchPersons.fulfilled, (state, action:PayloadAction<Person[]>) =>{
            state.persons = action.payload;
            state.isLoading = false;
        });

        builder.addCase(fetchPersons.rejected, ()=>{
            toast.error("Error while fetching")
        })

        builder.addCase(deletePerson.pending,(state) => {
            state.isLoading = true
        });

        builder.addCase(deletePerson.fulfilled,(state, action) => {
            
         state.persons =  action.payload.data.filter((person:Person) =>{
            if(person.id !== action.payload.id){
                return person;
            }
         });
         toast.success("Person Deleted");
            state.isLoading = false;
        });

        builder.addCase(deletePerson.rejected,()=>{
            toast.error("Error while deleting")
        })

        builder.addCase(editPerson.pending,(state) => {
            state.isLoading = true
        });

        builder.addCase(editPerson.fulfilled,(state, action) => {

            state.persons = state.persons.map((person:Person) => {
                        if(person.id === action.payload.id){
                            return action.payload
                        }else{
                            return person;
                        }
            });
        toast.success("Person Edited")
            state.isLoading = false;
        });
        builder.addCase(editPerson.rejected,() => {
            toast.error("Error While Editing")
        })

      
    }

});



export default PersonSlice.reducer;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPersons = (state:any) => state.persons;

