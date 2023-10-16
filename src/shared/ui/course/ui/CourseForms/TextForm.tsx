import {type FC} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import {Button, ButtonThemes, Label} from "@/shared/ui";
import {ITextBlock} from "@/enteties/Lesson";

type Props = Record<string, unknown>;

const TextForm: FC<{ index: number; initFields?: ITextBlock }> = ({index}) => {
	const {register, control} = useFormContext();
	const {
		fields,
		remove,
		append: appendParagraph,
	} = useFieldArray({
		control,
		name: `blocks.${index}.paragraphs`,
	});

	const appendEmptyParagraph = () => {
		appendParagraph({id: uuidv4(), text: ""});
	};

	return (
		<div className={"flex flex-col gap-5 w-full"}>
			<Label htmlFor={`blocks.${index}.title`} labelText={"Title"}>
				<input
					className={"inputField"}
					{...register(`blocks.${index}.title`)}
				/>
			</Label>
			{fields.map((field, paragraphIndex) => (
				<div key={field.id} className={"flex gap-2 items-start"}>
					<textarea
						className={"inputField"}
						{...register(`blocks.${index}.paragraphs.${paragraphIndex}.text`)}
					/>
					<Button
						theme={ButtonThemes.TEXT}
						className={"!px-2 !py-0 rounded-md"}
						type='button'
						onClick={() => {
							remove(paragraphIndex);
						}}
					>
                        x
					</Button>
				</div>
			))}
			<Button theme={ButtonThemes.FILLED} onClick={appendEmptyParagraph}>
                Add paragraph
			</Button>
		</div>
	);
};

export default TextForm;
