import "./NotFoundPage.css"
import notFound from "../../Recourses/page-not-found.png"


const NotFoundPage = () => {
    return (<div className="not-found">
            <img src={notFound} alt="" className="image-404"/>
        </div>
    )
}

export default NotFoundPage