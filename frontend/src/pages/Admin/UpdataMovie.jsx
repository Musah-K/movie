import React,{ useState, useEffect } from 'react';
import { useUpdateMovieMutation,useGetSpecificMovieQuery, useUploadImageMutation, useDeleteMovieMutation } from '../../app/api/moviesApi';
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdataMovie = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        reviews:[],
        image: null,
        genre: '',
      });
      const [selectedImage, setSelectedImage] = useState(null);
      const {data: initialMovieData} = useGetSpecificMovieQuery(id);

      useEffect(()=>{

        if(initialMovieData) setMovieData(initialMovieData);

      },[initialMovieData]);

      const [uploadImage, {isLoading: isUploadingImage, error: uploadImageError}] = useUploadImageMutation();
      const [updateMovie, {isLoading: isUpdatingMovie, error: updateMovieError}] = useUpdateMovieMutation();
      const [deleteMovie, {isLoading: isDeletingMovie}] = useDeleteMovieMutation();

      const handleChange = (e) =>{
        const {name, value} = e.target;
        setMovieData(prevData =>({
            ...prevData, [name]: value,
        }))

      };

      const handleImageChange =(e)=>{
        const file = e.target.files[0];
        setSelectedImage(file);
      };

      const handleUpdateMovie = async() =>{
        try {
            if(
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast
              ){
                toast.error("please fill all required fields")
                return;
              }

              let uploadedImagePath = movieData.image;

              if(selectedImage){
                const formData = new FormData();
                formData.append('image', selectedImage);

                const uploadImageResponse = await uploadImage(formData);



                if(uploadImageResponse){
                    uploadedImagePath = uploadImageResponse.data.image;
                }else{
                    console.error("Failed to upload image: ", uploadImageError);
                    toast.error("Failed to upload image");
                    return;
                }

              }

              await updateMovie({
                id: id,
                data: {
                    ...movieData,
                    image: uploadedImagePath,
                }
              })

              console.log(movieData);
              console.log("Update response:", response);


              toast.success("Movie updated successifully")

              navigate('/movies');
        } catch (error) {
            console.error("Failed to update movie ", error);
      toast.error(`Failed to create movie: ${updateMovieError?.message}`);
            
        }

      };

      const handleDeleteMovie = async()=>{
        try {
            await deleteMovie(id);
            toast.success("Movie deleted successifully");
            navigate('/movies');
        } catch (error) {
            console.log('Failed to delete movie', error);
            toast.error(`Failed to delete movie: ${error?.message}`);
        }

      }
    


  return (
    <div className='container flex justify-center items-center mt-4'>
        <form>
            <p className='text-green-200 w-[50rem] text-2xl mb-4'>Update Movie</p>

            <div className='mb-4'>
                <label className='block'>
                    Name: 
                    <input type="text" name='name' value={movieData.name} 
                    onChange={handleChange}
                    className='border px-2 py-1 w-full'
                    />
                </label>
            </div>
             
             <div className="mb-4">
                <label className='block'>
                    Year: 
                    <input type="number" name='year' value={movieData.year} 
                    onChange={handleChange}
                    className='border px-2 py-1 w-full'
                    />
                </label>
             </div>

             <div className="mb-4">
                <label className='block'>
                    Detail: 
                    <textarea name="detail" value={movieData.detail}  
                    onChange={handleChange} 
                    className='border px-2 py-1 w-full' />
                </label>     
            </div>

            <div className="mb-4">
                <label className='block'>

                    Cast (comma separated):
                <input 
                type="text" name='cast' 
                value={movieData.cast.join(', ')} 
                onChange={e=> setMovieData({...movieData, cast: e.target.value.split(', ')})} 
                className='border px-2 py-1 w-full' />
                </label>    
             </div>

                <div className="mb-4">

                    <label 
                    style={ !selectedImage ? {border: "1px solid #888", borderRadius: '5px', padding: "8px"} : {border: "0", borderRadius:"0", padding: "0"}}>

                    {!selectedImage && "Upload Image"}
                    <input type="file" accept='image/*' 
                    onChange={handleImageChange}
                    style={{display: !selectedImage? "none" : "block"}} />
                    </label>


                </div>


                <button type='button' 
                    onClick={handleUpdateMovie}
                    disabled={isUpdatingMovie || isUploadingImage} 
                    className='bg-teal-500 text-white px-4 py-2 rounded'>
                        {isUpdatingMovie || isUploadingImage ?"Updating..." : "Update Movie" } 
              </button>

              <button type='button' 
                    onClick={handleDeleteMovie}
                    disabled={isUpdatingMovie || isUploadingImage || isDeletingMovie} 
                    className='bg-red-500 text-white px-4 py-2 rounded ml-2'>
                        {isDeletingMovie ?"Deleting..." : "Delete Movie" } 
              </button>

        </form>
    </div>
  )
}

export default UpdataMovie;