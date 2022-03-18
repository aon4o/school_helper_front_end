import {Alert, Button} from "react-bootstrap";
import {useNavigate} from "react-router";

const NoPage = () => {
    document.title = 'ELSYS Helper | 404';

    const navigate = useNavigate();

    return (
        <>
            <Alert variant="danger" className={'text-center'}>
                <Alert.Heading className={'my-5'}>
                    <h1>404 Страницата не е намерена! 404</h1>
                </Alert.Heading>
                <hr/>
                <h3 className={'my-4'}>Страницата, която се опитвате да достъпите не е налична. :(</h3>
                <hr/>
                <h5>Възможните причини за това са:</h5>
                <p className={'mb-0'}>
                    Липса на интернет връзка.<br/>
                    Неналичие на достъп до сървъра с информация.<br/>
                    Липса на съществуваща информация в сървъра.<br/>
                    Грешна хипервръзка.<br/>
                    ...<br/>
                </p>
            </Alert>

            <div className={'d-flex'}>
                <Button
                    variant={'outline-primary'}
                    size={'lg'}
                    onClick={() => navigate('/')}
                >
                    Начало
                </Button>
                <Button
                    variant={'outline-primary'}
                    size={'lg'}
                    className={'ms-3'}
                    onClick={() => navigate(-1)}
                >
                    Назад
                </Button>
            </div>
        </>
    );
};

export default NoPage;
