import {type FC} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/shared/ui";

type Props = Record<string, unknown>;

const VideoForm: FC<{ index: number }> = ({index}) => {
    const {register} = useFormContext();

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. Video Block</h5>
            <Label htmlFor={`blocks.${index}.url`}
                labelText={"Video URL"}
                textColor={"!text-light-primary-main dark:!text-dark-primary-main"}
            >
                <input className={"inputField"} {...register(`blocks.${index}.url`, {
                    required: {value: true, message: "Question is required"},
                    pattern: {
                        value: /^https:\/\/www\.youtube\.com\/watch\?v=/,
                        message: "https://www.youtube.com/watch?v=your_video_id_here"
                    },
                })} />
            </Label>
        </div>
    );
};

export default VideoForm;
