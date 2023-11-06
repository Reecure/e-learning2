import {type ReactElement, useEffect, useState} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {Loader, UserRaw} from "@/shared/ui";
import {User, UserRoles} from "@/enteties/User";
import AccesDenied from "@/widgets/AccesDenied/ui/AccesDenied";
import {trpc} from "@/shared/utils/trpc";
import {ErrorWidget} from "@/widgets/ErrorWidget";
import {useInfiniteScroll} from "@/shared/hooks/useInfiniteScroll/useInfiniteScroll";

const rows = ["", "Firstname", "Lastname", "Email", "Role", ];

const UserAdmin = () => {
    const [page, setPage] = useState(0);

    const [containerRef, isVisible] = useInfiniteScroll({
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    });

    const session = useSession();

    useEffect(() => {
        if (isVisible) {
            handleFetchNextPage();
        }
    }, [isVisible]);

    const usersQuery = trpc.user.all.useInfiniteQuery({
        limit: 10
    },
    {
        getNextPageParam(lastPage) {
            return lastPage.nextCursor;
        }
    });

    const handleFetchNextPage = async () => {
        await usersQuery.fetchNextPage();
        setPage((prev) => prev + 1);
    };


    if (usersQuery.isLoading) {
        return <Loader />;
    }

    if (usersQuery.error) {
        return <ErrorWidget />;
    }

    if (session.data?.user.role !== UserRoles.ADMIN) {
        return <AccesDenied />;
    }

    return (
        <>
            <table className={"min-w-full border-2 border-light-primary-main rounded-md mb-3"}>
                <thead>
                    <tr className={"border-b-2 border-light-primary-main text-2xl"}>
                        {
                            rows.map((item,i) => {
                                return <td
                                    key={i}
                                    className={
                                        "p-3  text-center border-light-primary-main  border-r-2"
                                    }
                                >{item}</td>;
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {usersQuery.data?.pages.map((page, index) => {
                        const indexNum = index * 10;
                        return page.users.map((user, i) => {
                            return <UserRaw user={user as User} index={indexNum + i} key={user.id}/>;
                        });
                    })}
                </tbody>
            </table>
            <div className={"flex justify-end"} ref={containerRef}>
            </div>
        </>
    );
};

UserAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>
    );
};

export default UserAdmin;
