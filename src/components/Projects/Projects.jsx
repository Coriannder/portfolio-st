import './Projects.scss'
import { ProjectItemList } from './ProjectItemList/ProjectItemList'
//import { VisorProject } from './VisorProject/VisorProject'
import { useState } from 'react'
import { projects } from '../../json/project.json'
import { VisorProjectsList } from './VisorProjectsList/VisorProjectsList'



export const Projects = () => {

    const [projectId, setProjectId] = useState('')


    const getProjectId = (id) => {
        setProjectId(id)
       // console.log(id)
    }

    //console.log(ProjectId)


    return (
        <section className='projects__section'>

            <div className='projects__container' onMouseLeave={()=>{setProjectId('')}}>

                <div className='projects__list'>
                    <h2 className='projects__h2'>
                        /projects
                    </h2>
                    <div className='projects__body'>
                        <ProjectItemList projects={projects}  getProjectId={getProjectId} />
                    </div>
                </div>


                <div className='projects__visorProjects' >
                    {/* ProjectId && <VisorProject src ={ProjectId} /> */}

                    <VisorProjectsList projects={projects} id={projectId} />

                </div>

                {/* <iframe src='https://islagourmet.netlify.app/index.html'></iframe> */}



            </div>
        </section>
    )
}