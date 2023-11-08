import {FC, useState} from "react";
import {Button, ButtonThemes, Modal} from "@/shared/ui";
import CreateNewsForm from "@/shared/ui/News/CreateNewsForm";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {News} from "@/enteties/News/model/types/module";


interface Props {
}

const CreateNews: FC<Props> = () => {
    const utils = trpc.useContext();

    const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);

    const createNews = trpc.news.addNews.useMutation({
        async onSuccess() {
            await utils.news.getNews.invalidate();
        }
    });

    const session = useSession();
    const openModalCreateCourseHandler = () => {
        setCreateCourseModalOpen(prev => !prev);
    };

    const createCourseHandler = async (data: News) => {
        await createNews.mutate({
            title: data.title,
            creation_date: new Date().toISOString(),
            author_id: session.data?.user.id || "",
            description: data.description
        });
    };

    return (
        <div className={"w-full"}>
            <Button
                theme={ButtonThemes.OUTLINED}
                onClick={openModalCreateCourseHandler}
                className={"w-full whitespace-nowrap"}
            >
                Create News
            </Button>
            <Modal
                isOpen={createCourseModalOpen}
                setIsOpen={openModalCreateCourseHandler}
            >
                <div className={"w-full max-w-[500px]"}>
                    <CreateNewsForm onSubmit={createCourseHandler}/>
                </div>
            </Modal>
        </div>
    );
};

export default CreateNews;