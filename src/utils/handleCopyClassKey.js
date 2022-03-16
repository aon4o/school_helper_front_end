import {api_get} from "./fetch";
import {toast} from "react-toastify";
import handleFetchError from "./handleFetchError";

const handleCopyClassKey = (name, token) => {
    api_get(`/classes/${name}/key`, token)
        .then((response) => {
            navigator.clipboard.writeText(response.key)
                .then(() => toast.success("Текстът беше копирн успешно!"))
                .catch(error => toast.error(error))
        })
        .catch((error) => handleFetchError(error))
}

export default handleCopyClassKey;