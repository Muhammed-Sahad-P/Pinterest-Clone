import { FaTimes } from "react-icons/fa"
import { toast } from "sonner"

type ToastActionProps = {
    toastId: string
}

const ToastAction = ({ toastId }: ToastActionProps) => {
    return (
        <FaTimes
            size={20}
            onClick={() => toast.dismiss(toastId)}
            className="cursor-pointer text-white"
        />
    )
}

export default ToastAction
