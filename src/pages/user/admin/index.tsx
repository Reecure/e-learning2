import {Fragment, type ReactElement} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {Loader, UserRaw} from "@/shared/ui";
import {User, UserRoles} from "@/enteties/User";
import AccesDenied from "@/widgets/AccesDenied/ui/AccesDenied";
import {trpc} from "@/shared/utils/trpc";
import {ErrorWidget} from "@/widgets/ErrorWidget";

const rows = ["", "Firstname", "Lastname", "Email", "Role", ];

const UserAdmin = () => {
    const session = useSession();

    const usersQuery = trpc.user.all.useInfiniteQuery({
        limit: 17
    },
    {
        getPreviousPageParam(lastPage){
            return lastPage.nextCursor;
        }
    });
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
        <table className={"min-w-full border-2 border-light-primary-main"}>
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
                    return <Fragment key={page.users[0]?.id || index}>
                        {
                            page.users.map((user, i) => {
                                return <UserRaw user={user as User} index={i} key={user.id} />;
                            })
                        }
                    </Fragment>;
                })}
            </tbody>
        </table>
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
