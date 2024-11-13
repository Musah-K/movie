import React,{useState} from 'react';
import {useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation, useAllGenresQuery} from '../../App/api/genreApi';
import GenreForm from '../../components/GenreForm';
import Modal from '../../components/Modal';
import {toast} from 'react-toastify'


const GenreList = () => {
    const [name, setName] = useState('');
    const [selectedGenre, setSelectedGenre]= useState(null);
    const [updatingName, setUpdatingName]= useState('');
    const [modalVisible, setmodalVisible]= useState(false);

    const{data: genres , refetch} = useAllGenresQuery();
    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();

    const handleCreateGenre = async(e)=> {
      e.preventDefault();

        if(!name){
          toast.error('Enter name');
          return;
        }

      try {
        const result = await createGenre({name}).unwrap();
        if(result.error){
          toast.error('There was an error submitting the data');
          return;
        }
        setName('');
         toast.success(`${result.name} saved successifully`);
         refetch()
        
      } catch (err) {
        console.error(err);
        toast.error("couldnt send")
      }
    }

    const handleUpdateGenre =async(e)=>{
      e.preventDefault();
       
      if(!updatingName){
        toast.error('Input a valid name');
        return;
      }
      
      try {

        const data = await updateGenre({
          id: selectedGenre._id,
          updategenre: {
            name: updatingName,
          }
        }).unwrap();

        
        if(data.error){
          toast.error(data.error);
          return;
        }
        
        toast.success(`${data.genre.name} is updated`);
        refetch();
        setUpdatingName("");
        setSelectedGenre(null);
        setmodalVisible(false);
        
      } catch (err) {
        console.error(err);
      }

    }


    const handleDeleteGenre = async()=>{

      try {
        const result = await deleteGenre(selectedGenre._id).unwrap();

        if(result.error){
          toast.error(result.error)
        }else{
          console.log(result)
          toast.success(`${result.remove.name} is deleted`)
          refetch()
          setSelectedGenre(null);
          setmodalVisible(false);
        }
        
      } catch (error) {
        console.error(error);
        toast.error("Genre deletion failed. try again")
      }

    }

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
        <div className='md:w-3/4 p-3'>
            <h1 className='h-12'>Manage Genres</h1>

            <GenreForm 
              value={name} 
              setValue={setName} 
              handleSubmit= {handleCreateGenre}
            />
            <br/>

            <div className="flex frex-wrap justify-evenly">
              {genres?.map((genre)=>(<div key={genre._id}>
                  <button className='bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
                  onClick={()=> {
                    setmodalVisible(true);
                    setSelectedGenre(genre)
                    setUpdatingName(genre.name);
                  }}>{genre.name}
                  </button>
                </div>
              ))}
            </div>

            <Modal isOpen={modalVisible} onClose={()=>setmodalVisible(false)}>
              <GenreForm value={updatingName}
               setValue={(value)=>setUpdatingName(value)} 
               handleSubmit={handleUpdateGenre} 
               buttonText='Update' 
               handleDelete={handleDeleteGenre}
               />
            </Modal>
        </div>
    </div>
  )
}

export default GenreList