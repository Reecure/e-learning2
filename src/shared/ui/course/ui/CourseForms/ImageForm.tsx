import {type FC, useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {Button, ButtonThemes, Label} from "@/shared/ui";
import {UploadButton} from "@/shared/utils/uploadthing";
import Image from "next/image";
import {AiOutlineClose} from "react-icons/ai";

const ImageForm: FC<{ index: number }> = ({index}) => {
    const [imgSrc, setImgSrc] = useState("");
    const {register, setValue, getValues,} = useFormContext();

    useEffect(() => {
        setImgSrc(getValues(`blocks.${index}.src`));
    }, [setValue]);

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. Image Block</h5>
            <Label htmlFor={`blocks.${index}.title`}
                labelText={"Title"}
                textColor={"!text-light-primary-main dark:!text-dark-primary-main"}
            >
                <input
                    className={"inputField"}
                    {...register(`blocks.${index}.title`)}
                />
            </Label>
            <div className={"flex justify-between max-w-[400px]"}>
                <UploadButton
                    appearance={{
                        button:
                            "bg-dark-primary-hover-second hover:opacity-70 duration-300",
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={res => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        setValue(`blocks.${index}.src`, res[0].fileUrl);
                        setImgSrc(getValues(`blocks.${index}.src`));
                    }}
                    onUploadError={(error: Error) => {
                    }}
                />
                <div>
                    {
                        imgSrc !== "" &&
                        <div className={"flex items-start gap-2 justify-start"}>
                            <Image src={imgSrc} alt={""} width={100} height={30} quality={100}
                                className={"object-cover"}/>
                            <Button theme={ButtonThemes.TEXT} onClick={
                                () => {
                                    setImgSrc("");
                                    setValue(`blocks.${index}.src`, "");
                                }
                            } className={"rounded-md !p-1"}><AiOutlineClose/> </Button>

                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default ImageForm;
