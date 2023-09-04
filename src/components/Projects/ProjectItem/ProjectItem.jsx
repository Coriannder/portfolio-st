import './ProjectItem.scss'
//import arrowRight from '../../../assets/arrowRight.svg'

import { Link } from "react-router-dom";





export const  ProjectItem = ({item , getProjectId}) => {

    return (
        <div className='projectItem__container' onMouseEnter={()=>{getProjectId(item.id)}}>
            <div className='projectItem__header'>
                {/* <span>   &#8594;  </span> */}
                <div className='projectItem__title'>
                    {item.title}
                </div>

                <div className='projectItem__links'>
                    <Link to = "https://www.lagaceta.com.ar/?utm_source=web_app" className='projectItem__button'>web</Link>
                    <Link to={"https://getbootstrap.com/docs/5.1/getting-started/introduction/"} className='projectItem__button' style={{marginLeft: '10px'}}>code</Link>
                </div>

                
            </div>
            <div className='projectItem__body'>
                {/* <div className='projectITem__web'>
                    Web
                </div>
                <div className='projectITem__gitHub'>
                    Git
                </div> */}
            </div>
            {/* <div className='projectItem__linksContainer'>
                
            </div> */}
        </div>
        )
}
