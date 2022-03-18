import {toast} from "react-toastify";

const handleFetchError = (error, redirect = null) => {
    if (error.detail !== undefined) {
        toast.error(error.detail);
        if (redirect !== null) {
            redirect();
        }
    } else {
        toast.error("Възникна грешка при извличането на информация!");
        if (redirect !== null) {
            redirect();
        }
    }

}

export default handleFetchError;