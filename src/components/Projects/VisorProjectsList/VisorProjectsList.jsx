
import { VisorProject } from '../VisorProject/VisorProject'
import { projects } from '../../../json/project.json'


export const VisorProjectsList = ({ id }) => {


    return (
            projects && projects.map( project => ( id !== 4 &&
                            <VisorProject
                                src={ /* id == 4 ? project.gitHubURL :  */project.pageURL }
                                isVisible={ id==project.id ? true : false }
                                key={ project.id }
                            />
            ))
    )
}
