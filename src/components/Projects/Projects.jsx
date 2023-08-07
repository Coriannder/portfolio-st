import './Projects.scss'
import { ProjectItemList } from './ProjectItemList/ProjectItemList'
import { ImageContainer } from './ImageContainer/ImageContainer'
import { useState } from 'react'



export const Projects = () => {

    const [projectId, setProjectId] = useState('')


    const getProjectId = (id) => {
        setProjectId(id)
    }

    //console.log(projectId)




    return (
        <section className='projects__section'>
            <div className='projects__container' onMouseLeave={()=>{setProjectId('')}}>

                {projectId && <ImageContainer image ={`src/assets/project${projectId }.png`} />}

                <div className='projects__list'>
                    <h2 className='projects__h2'>
                        /projects
                    </h2>
                    <div className='projects__body'>
                        <ProjectItemList getProjectId={getProjectId} />
                    </div>
                </div>
            </div>
        </section>
    )
}