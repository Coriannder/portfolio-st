

import './Main.scss'
export const Main = (props) => {

    return (
        <main className='main'>
            {/* <div className='main__container'> */}
                {props.children}
            {/* </div> */}
        </main>

    )
}