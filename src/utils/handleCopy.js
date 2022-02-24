import {toast} from "react-toastify";

const handleCopy = (text, status) => {
    if (status) {
        toast.success("Текстът беше копирн успешно!")
    } else {
        toast.error("Възникна грешка при копирането!")
    }
}

export default handleCopy;