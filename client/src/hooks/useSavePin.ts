import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { saveUnsavePin } from "@/lib/store/thunks/save-thunk";
import { toast } from "sonner";

export const useSavePin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSavePin = async (pinId: string) => {
    try {
      const response = await dispatch(saveUnsavePin({ pinId })).unwrap();
      toast(response.message);
    } catch (error) {
      toast.error(
        (error as { message: string }).message || "Pin already saved"
      );
    }
  };

  return handleSavePin;
};
