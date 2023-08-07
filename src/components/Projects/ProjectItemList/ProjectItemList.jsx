import './ProjectItemList.scss'
import {projects} from '../../../json/project.json'
import { ProjectItem } from '../ProjectItem/ProjectItem'


export const ProjectItemList = ({ getProjectId }) => {


    return (
        projects.map( project => (
            <ProjectItem
                item={project}
                getProjectId={getProjectId}
                key={project.id}

            />
            )
        )
    )
}