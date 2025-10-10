import './BackgroundFigure.scss'

import { motion } from 'framer-motion'


export const BackgroundFigure = () => {

    return (
		<div>
			<motion.div className="banter-BackgroundFigure"
				initial={{ scale: 100, }}
				animate={{ scale:.7, }}
				transition={{duration: .8}}>
				{[...Array(9)].map((_, index) =>
					<motion.div
						key = {index}
						className="banter-BackgroundFigure__box"
						initial={{ background: '#00000000'}}
						animate={{ background:"#00000016" }}
					/>
				)}
			</motion.div>
		</div>

    )
}