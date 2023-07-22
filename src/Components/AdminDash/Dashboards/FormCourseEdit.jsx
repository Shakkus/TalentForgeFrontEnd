import { useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const FormCourseEdit = () => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {cloudName: "dal385dkc",uploadPreset: "q3fewzvu",},
        function (error, result) {
          if (result && result.event === "success") {
            const imageUrl = result.info.secure_url;
            setSelectedImage(imageUrl);
          }
        }
      )
    }, []);

    const [currentCourse, setCurrentCourse] = useState({})
    const [courseInfo, setCourseInfo] = useState({
      title: "",
      cathegory: "",
      theme: "",
      link: "",
      teacher: "",
      description: "",
      prize: "",
      duration: "",
      image: "",
    })

    const { id } = useParams();

    const handleSubmit = async (event) => {
        const courseEdited = {
            title: courseInfo.title === "" ? currentCourse.title : courseInfo.title,
            cathegory: courseInfo.cathegory === "" ? currentCourse.cathegory : courseInfo.cathegory,
            theme: courseInfo.theme === "" ? currentCourse.theme : courseInfo.theme,
            link: courseInfo.link === "" ? currentCourse.link : courseInfo.link,
            teacher: courseInfo.pteacher=== "" ? currentCourse.teacher : courseInfo.teacher,
            description: courseInfo.description === "" ? currentCourse.description : courseInfo.description,
            prize: courseInfo.prize === "" ? currentCourse.prize : courseInfo.prize,
            duration: courseInfo.duration === "" ? currentCourse.duration : courseInfo.duration,
            image: courseInfo.image === "" ? currentCourse.image : courseInfo.image
        };
        event.preventDefault();
        axios.put(`https://talent-forge-data.cyclic.app/courses/edit/${id}`, courseEdited)
        setCourseInfo({
          title: "",
          cathegory: "",
          theme: "",
          link: "",
          teacher: "",
          description: "",
          prize: "",
          duration: "",  
          image: "", 
        })
    };  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseInfo((prevInfo) => ({...prevInfo, [name]: value ?? currentCourse[name]}));
    };

    useEffect(() => {
        const getCurrentTeacher = async () => {
        const { data } = await axios.get( `https://talent-forge-data.cyclic.app/courses/${id}`);
        setCurrentCourse(data);
        };
            getCurrentTeacher()
      }, []); 



  return (
    <div>
        <form class="w-full max-w-lg" onSubmit={handleSubmit}>
          <div>
            <div class="flex flex-wrap mb-6">

              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="title" > Title: </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="title" name="title" value={courseInfo.title} onChange={handleChange} placeholder={currentCourse.title}/>
              </div>

              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="teacher"> Teacher: </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="teacher" name="teacher" value={courseInfo.teacher} onChange={handleChange} placeholder={currentCourse.teacher}/>
              </div>

          </div>

          <div class="flex flex-wrap mb-6">

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="cathegory" > Category: </label>
              <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" id="cathegory" name="cathegory" value={courseInfo.cathegory} onChange={handleChange} placeholder={currentCourse.email} >
                <option value="">Select a category</option>
                <option value="programming">Programming</option>
                <option value="languages">Languages</option>
              </select>
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="theme" > Theme: </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="theme" name="theme" value={courseInfo.theme} onChange={handleChange} placeholder={currentCourse.theme}/>
            </div>

          </div>

          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="description" > Description: </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="description" name="description" value={courseInfo.description} onChange={handleChange} placeholder={currentCourse.description}/>
            </div>
          </div>

          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="link" > Link: </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="link" name="link" value={courseInfo.link} onChange={handleChange} placeholder={currentCourse.link}/>
            </div>
          </div>

          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="image" > Image: </label>
              <button class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="button" name="image" onClick={() => widgetRef.current.open()}> Upload Image </button>
              <img src={currentCourse.image} alt="" class="img-upload" />
            </div>
          </div>

          <div class="flex flex-wrap mb-6">

            <div class="w-full md:w-1/3 px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="prize"> Price:</label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="number" id="prize" name="prize" value={courseInfo.prize} onChange={handleChange}placeholder={currentCourse.prize}/>
            </div>
            
            <div class="w-full md:w-1/3 px-3">
              <label class="block uppercase tracking-wide text-[#7c38cd] text-xs font-bold mb-2" for="duration" > Duration: </label>
              <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="duration" name="duration" value={courseInfo.duration} onChange={handleChange} placeholder={currentCourse.duration}/>
            </div>

          </div>
        </div>
            
            <div>
                <button type="submit" className="text-white bg-[#7c38cd] hover:bg-[#8244cf] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">EDIT</button>
            </div>
    </form>
</div>
  )
}

export default FormCourseEdit