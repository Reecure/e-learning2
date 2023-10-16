import {type FC} from "react";
import {trpc} from "@/shared/utils/trpc";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {Loader} from "@/shared/ui";

type Props = {
    moduleId: string;
    lessonCanEdit: boolean;
    isUserLessons: boolean;
};

const CourseLessons: FC<Props> = ({
	moduleId,
	lessonCanEdit,
	isUserLessons,
}) => {
	const lessonsQuery = trpc.getModuleById.useQuery({
		module_id: moduleId,
	});

	if (lessonsQuery.isLoading) {
		return <Loader/>;
	}

	return (
		<div className={"mt-5"}>
			<DragAndDrop
				items={lessonsQuery?.data?.lessons}
				canEdit={lessonCanEdit}
				isModule={false}
				refetch={lessonsQuery.refetch}
				isUserAuthor={isUserLessons}
			/>
		</div>
	);
};

export default CourseLessons;
