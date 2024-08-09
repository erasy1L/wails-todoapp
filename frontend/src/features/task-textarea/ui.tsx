import { MAX_DESCRIPTION_LENGTH } from "@/shared/helpers/constants";
import Textarea from "@/shared/ui/textarea";
import { ChangeEvent } from "react";
import { task } from "wailsjs/go/models";

type TaskTextareaProps = {
    description: string;
    setFormData: React.Dispatch<React.SetStateAction<task.Request>>;
};
export default function TaskTextarea({
    description,
    setFormData,
}: TaskTextareaProps) {
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (
            e.target instanceof HTMLTextAreaElement &&
            e.target.value.length <= MAX_DESCRIPTION_LENGTH
        )
            setFormData((state) => ({ ...state, description: e.target.value }));
    };

    return (
        <Textarea
            value={description}
            placeholder="Description..."
            onChange={onChange}
        />
    );
}
