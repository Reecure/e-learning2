import Layout from "@/pages/layout";
import {ReactElement} from "react";
import {Hero} from "@/shared/ui";

const Home = () => {
    return (
        <div>
            <Hero/>
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;