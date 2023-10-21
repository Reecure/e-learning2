import Layout from "@/pages/layout";
import {ReactElement} from "react";

const Home = () => {

    return (
        <div>

        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;