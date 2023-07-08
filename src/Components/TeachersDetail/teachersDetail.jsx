import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const TeachersDetail = () => {

    const { id } = useParams()
    const [teacher, setTeacher ] = useState({})

    const getTeacherInfo = async () => {
      try {
        const { data } = await axios.get(`https://talent-forge-data.cyclic.app/teacher/${id}`)
        console.log(data)
        setTeacher(data)
      } catch (error) {
        console.error(error)
      }
    }
    
    useEffect(() => {
        getTeacherInfo()
    }, [])

    const country = () => {
      if (teacher.country === "colombia") return "Colombia 🇨🇴"
      if (teacher.country === "Argentina") return 'Argentina 🇦🇷'
    }

    return (
        <div className="my-24">
          <h1 className="font-bold text-xl">INFORMACION DEL PROFESOR</h1>
          <div className="flex justify-center items-center my-24">
  <img src={teacher.profileImage} alt="" className="mr-6 w-80 rounded-full" />
  <div>
    <h1 className="my-5 text-3xl">{teacher.name}</h1>
    <h1 className="text-2xl">{country()}</h1>
    <p className="text-xl mt-5">Email: {teacher.email}</p>
  </div>
</div>
<p>{teacher.description}</p>

         <div  className="mt-44">
      <h1 className="flex ml-7 font-bold text-xl">Cursos a cargo de {teacher.name}</h1>
         {Array.isArray(teacher.courses) ? (
            teacher.courses.map((course) => {
              return  (
                <div key={course.id} className="my-6">
                  <h1>{course.title}</h1>
                  <p>{course.cathegory}</p>
                  <p>{course.theme}</p>
                  <p>{course.description}</p>
                </div>
              )
            })
          ) : null}
         </div>
        </div>
    )
}

export default TeachersDetail;
