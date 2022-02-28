import {toast} from "react-toastify";

const handleFetchError = (error, redirect = null) => {
    if (error.detail !== undefined) {
        toast.error(error.detail);
        if (redirect !== null) {
            redirect();
        }
    } else {
        toast.error(error.message);
    }

}

export default handleFetchError;