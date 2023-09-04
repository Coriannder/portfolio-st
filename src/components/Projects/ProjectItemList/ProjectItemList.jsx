import './ProjectItemList.scss'
//import {projects} from '../../../json/project.json'
import { ProjectItem } from '../ProjectItem/ProjectItem'


export const ProjectItemList = ({ projects, getProjectId }) => {


    return (
        projects && projects.map( project => (
            <ProjectItem
                item={project}
                getProjectId={getProjectId}
                key={project.id}

            />
            )
        )
    )
}