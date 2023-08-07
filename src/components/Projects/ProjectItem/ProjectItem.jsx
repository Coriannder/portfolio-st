import './ProjectItem.scss'
import arrowRight from '../../../assets/arrowRight.svg'





export const  ProjectItem = ({item , getProjectId}) => {

    return (
        <div className='projectItem__container' onMouseEnter={()=>{getProjectId(item.id)}}>
            <div className='projectItem__header'>
                <span><img src={arrowRight} /></span>
                    {item.title}
                    {item.subtitle}
            </div>
            <div className='projectItem__body'>
            </div>
        </div>
        )
}
