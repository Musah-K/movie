import React,{useEffect, useState}from 'react';
import {useCreateMovieMutation, useUploadImageMutation} from '../../app/api/moviesApi';
import { useAllGenresQuery } from '../../App/api/genreApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';



const CreateMovie = () => {
  
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

  const [createMovie,{isLoading: iscreatingMovie, error: creatingMovieError}] = useCreateMovieMutation();
  const [uploadImage, {isLoading: isUploadingImage, error: uploadImageError}] = useUploadImageMutation();

  const {data:genres, isLoading:isLoadingGenres} = useAllGenresQuery();


  useEffect(()=>{
    if(genres){
      setMovieData((prevData)=>({
        ...prevData, genre: genres[0]?._id || ''
      }))
    }
  },[genres]);

  const handleChange = (e) =>{
    const {name, value} = e.target;

    if(name === "genre"){
      const selectedGenre = genres.find(g=>g._id ===value);

      setMovieData(prevData=>({
        ...prevData, genre : selectedGenre ? selectedGenre._id : "",
      }));

    }else{
      setMovieData(prevData=>({
        ...prevData, [name]: value,
      }));
    }
  };

  const handleImageChange = (e)=>{
      const file = e.target.files[0];
      setSelectedImage(file);
  };

  const handleCreateMovie  =  async(e) =>{
    e.preventDefault();

    try {
      if(
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ){
        toast.error("please fill all required fields")
        return;
      }

      let uploadedImagePath = null;
      if(selectedImage){
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if(uploadImageResponse.data){

          uploadedImagePath = uploadImageResponse.data.image;
        }else{
          console.error("Failed to upload image: ", uploadImageError);
          toast.error("Failed to upload image");
          return;
        }

         const newMovie = await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });
        
          console.log(newMovie);

        navigate("/admin/movies-list");

        setMovieData({ 
          name: '',
          year: 0,
          detail: '',
          cast: [],
          reviews:[],
          image: null,
          genre: '',
        });

        toast.success("Movie Added to database")
      }

    } catch (error) {
      console.error("Failed to create movie ", creatingMovieError);
      toast.error(`Failed to create movie: ${creatingMovieError?.message}`);
    }

  }


  return (
    <div className='container flex justify-center items-center mt-4'>

      <form >
        <p className='text-green-200 w-[50rem] text-2xl mb-4'>Create Movie</p>

        <div className='mb-4'>
          <label className='block'>
            Name:
            <input 
            type="text" name='name' value={movieData.name} 
            onChange={handleChange} 
            className='border px-1 py-1 w-full' />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block'>
            Year:
            <input 
            type="number" name='year' value={movieData.year} 
            onChange={handleChange} 
            className='border px-1 py-1 w-full' />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block'>
            Details:
            <textarea name="detail" value={movieData.detail} 
            onChange={handleChange} 
            className='border px-1 py-1 w-full'></textarea>
          </label>
        </div>

        <div className='mb-4'>
          <label className='block'>
            Cast (comma separated):
            <input 
            type="text" name='cast' 
            value={movieData.cast.join(', ')} 
            onChange={e=> setMovieData({...movieData, cast: e.target.value.split(', ')})} 
            className='border px-1 py-1 w-full' />
          </label>
        </div>

        <div className='mb-4'>
          <label className='block'>
            Genre :

            <select name="genre" value={movieData.genre} className='border px-2 py-1 w-full'
            onChange={handleChange}
            >
              {isLoadingGenres?(<option>Loading genres ...</option>): (genres.map(g=>(

                <option key={g._id} value={g._id}>{g.name}</option>
              ))) }
            </select>
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
               onClick={handleCreateMovie}
              disabled={iscreatingMovie || isUploadingImage} 
              className='bg-teal-500 text-white px-4 py-2 rounded'>
                {iscreatingMovie || isUploadingImage ?"Creating..." : "Create Movie" } 
              </button>

      </form>
    </div>
  )
}

export default CreateMovie