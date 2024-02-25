import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const showErrorToast = (msg: string) => {
    toast(msg, {
        "theme": "colored",
        "type": "error",
        "position": "top-center",
        "dangerouslyHTMLString": true
    })
}
