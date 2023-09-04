import { VisorProject } from '../VisorProject/VisorProject'
import './VisorProjectsList.scss'


export const VisorProjectsList = ({projects, id}) => {


    return (
        projects && projects.map( project => (
            <VisorProject
                src={project.src}
                key={project.id}
                visible={id===project.id & true}
            />
            )
        )
    )


}
