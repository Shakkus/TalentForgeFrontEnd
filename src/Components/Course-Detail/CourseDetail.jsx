import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CourseDetail = () => {
    const { id } = useParams();
    const [detailInfo, setDetailInfo] = useState([])
    const [teacherInfo, setTeacherInfo] = useState([])

    const getTeacher = async () => {
        const { data } = await axios.get(`https://talent-forge-data.cyclic.app/teacher/name/${detailInfo.teacher}`)
        setTeacherInfo(data[0])
        console.log(data)
    }

    const getDetail = async () => {
        const { data } = await axios.get(`https://talent-forge-data.cyclic.app/courses/${id}`)
        setDetailInfo(data)
    }

    useEffect(() => {
        getDetail()
    }, []);

    useEffect(() => {
        if (detailInfo.teacher) {
            getTeacher()
        }
    }, [detailInfo]);

    return (
        <div>
            <h1>INFORMACION DEL CURSO</h1>
            <h6>{detailInfo.title}</h6>
            <h6>{detailInfo.description}</h6>
            <h6>{detailInfo.rating}</h6>
            <h6>{detailInfo.prize}</h6>
            <h6>{detailInfo.duration}</h6>
            <h6>{detailInfo.link}</h6>
            <h6>{detailInfo.cathegory}</h6>
            <h6>{detailInfo.theme}</h6>
            <img src={detailInfo.image} alt="" />
            <h1>INFORMACION DEL PROFESOR</h1>
            <h6>{teacherInfo.name}</h6>
            <h6>{teacherInfo.country}</h6>
            <h6>{teacherInfo.description}</h6>
            <img src={teacherInfo.profileImage} alt="" />
        </div>
    )
}

export default CourseDetail
