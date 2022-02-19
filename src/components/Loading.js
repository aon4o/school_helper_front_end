import {Spinner} from "react-bootstrap";

const Loading = (props) => {

    return (
        <>
            {props.error ?
                <h1 className={'text-danger'}>Възникна грешка при зареждането!</h1>
                :
                <Spinner animation={'border'} variant={'primary'}/>
            }
        </>
    )
}

export default Loading;