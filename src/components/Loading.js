import {Alert, Spinner} from "react-bootstrap";

const Loading = (props) => {

    return (
        <>
            {props.error ?
                <Alert variant="danger" className={'text-center my-5'}>
                    <Alert.Heading>
                        <h1>Възникна грешка при зареждането!</h1>
                    </Alert.Heading>
                    <hr />
                    <h3>Възможните причини са:</h3>
                    <p className={'mb-0'}>
                        Липса на интернет връзка.<br/>
                        Неналичие на достъп до сървъра с информация.<br/>
                        Липса на съществуваща информация в сървъра.<br/>
                        ...<br/>
                    </p>
                </Alert>
                :
                <div className={'d-flex justify-content-center'}>
                    <Spinner animation={'border'} variant={'primary'}/>
                </div>
            }
        </>
    )
}

export default Loading;