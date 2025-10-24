import './ProjectItem.scss'
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
                            <span className='projectItem__subtitle'>
                            ({item.subTitle})
                            </span>
                        </div>

                </motion.div>

                <div className='projectItem__links' onMouseOver={ () => contextValue.overTag('button')} onMouseLeave={contextValue.outTag}>
                    {/* prefer demoUrl/codeUrl fields, fallback to existing item fields */}
                    <ButtonLink
                        to={item.demoUrl || item.pageURL || '#'}
                        title={item.demoUrl || item.pageURL ? (item.title !== "Ecommerce BackEnd" ? 'web' : 'API') : 'web'}
                    />
                    <ButtonLink
                        to={item.codeUrl || item.gitHubURL || '#'}
                        title={'code'}
                        style={{marginLeft: '15px'}}
                    />
                </div>
            </div>
           
        </motion.div>
        )
}
