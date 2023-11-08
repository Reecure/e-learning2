import {type ReactElement} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {UserProfileComponent} from "@/shared/ui/profile";
import {useCurrentUser} from "@/shared/hooks";
import {ErrorWidget} from "@/widgets/ErrorWidget";
import {Loader} from "@/shared/ui";
import {User} from "@/enteties/User";

const UserProfile = () => {
    const currentUser = useCurrentUser();

    const user = trpc.user.userById.useQuery({
        id: currentUser || ""
    });

    if (user.error) {
        return (
            <ErrorWidget/>
        );
    }

    if (user.isLoading) {
        return <Loader />;
    }

    return <UserProfileComponent user={user.data as User} />;
};

UserProfile.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>
    );
};

export default UserProfile;
