import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const showErrorToast = (msg: string) => {
    toast(msg, {
        "theme": "colored",
        "type": "error",
        "position": "top-center",
        "autoClose": 2000,
        "pauseOnFocusLoss": false,
        "dangerouslyHTMLString": true
    })
}

export const showSuccessToast = (msg: string) => {
    toast(msg, {
        "theme": "colored",
        "type": "success",
        "position": "top-right",
        "autoClose": 1000,
        "dangerouslyHTMLString": true,
        "pauseOnFocusLoss": false,
    })
}

export const showInfoToast = (msg: string) => {
    toast(msg, {
        "theme": "colored",
        "type": "info",
        "position": "top-center",
        "autoClose": 1500,
        "pauseOnFocusLoss": false,
        "dangerouslyHTMLString": true
    })
}