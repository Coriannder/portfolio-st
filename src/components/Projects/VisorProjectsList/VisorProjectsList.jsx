
import { VisorProject } from '../VisorProject/VisorProject'
import { projects } from '../../../json/project.json'


export const VisorProjectsList = ({ id }) => {


    return (
            projects && projects.map( project => (
                            <VisorProject
                                src={project.pageURL}
                                isVisible={id==project.id ? true : false}
                                key={project.id}
                            />
            ))
    )
}
