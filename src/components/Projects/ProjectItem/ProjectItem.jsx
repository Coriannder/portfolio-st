import './ProjectItem.scss'
//import arrowRight from '../../../assets/arrowRight.svg'
import { motion } from "framer-motion"
import { useContext, useState } from 'react';
import { ButtonLink } from '../Button/Button';
import { CursorContext } from '../../../Context/CursorContext';




export const  ProjectItem = ({item , getId}) => {

    const contextValue = useContext(CursorContext)

    const [arrow, setArrow] = useState(false)

    const child = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }


    return (
        <motion.div
            className='projectItem__container'
            onMouseOver={()=>{
                getId(item.id)
                setArrow(true)}}
            onMouseLeave={()=>setArrow(false)}
            variants={child}>

            <div className='projectItem__header'>
                <motion.div
                    style={{display: 'flex'}}
                    initial={{x: -18}}
                    animate={{x: arrow? 0 : -18}}>

                        <span style={{marginRight: '5px'}} > &#8594; </span>

                        <div className='projectItem__title'>
                            {item.title}
                        </div>

                </motion.div>

                <div className='projectItem__links' onMouseOver={contextValue.overButton} onMouseLeave={contextValue.outTag}>
                    <ButtonLink
                        to={'https://www.lagaceta.com.ar/?utm_source=web_app'}
                        title={'web'}/>
                    <ButtonLink to={'https://getbootstrap.com/docs/5.1/getting-started/introduction/'} title={'code'} style={{marginLeft: '15px'}}/>
{/*                     <Link to={"https://getbootstrap.com/docs/5.1/getting-started/introduction/"} className='projectItem__button' style={{marginLeft: '10px'}}>code</Link>
 */}            </div>

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
        </motion.div>
        )
}
