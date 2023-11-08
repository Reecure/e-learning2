import Layout from "@/pages/layout";
import {ReactElement} from "react";
import {Hero} from "@/shared/ui";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import bg from "@/shared/assets/DarkMainBg.svg";
import Image from "next/image";
import create from "@/shared/assets/create.png";
import statistic from "@/shared/assets/statistic.png";
import study from "@/shared/assets/study.png";
import study2 from "@/shared/assets/study2.png";

const Home = () => {
    return (
        <div className={"bg-dark-background"}>

            <Parallax pages={5} className={"bg-dark-background"}>
                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={3}
                    style={{
                        backgroundImage: `url(${bg.src})`,
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                    }}
                />
                <ParallaxLayer style={{pointerEvents: "none"}}>
                    <Hero/>
                </ParallaxLayer>
                <ParallaxLayer sticky={{start: 1, end: 4}} speed={-0.3} className={"flex items-center"}>
                    <div className={"block ml-[13%] w-[200px] h-[300px]"}>
                        <Image src={create} alt={"create"}
                            className={"object-cover rounded-md w-[200px] h-[200px] mb-4"} quality={100}/>
                        <h4>Create</h4>
                        <p>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr rtsda</p>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer sticky={{start: 2, end: 4}} speed={0.8} className={"flex items-center"}>
                    <div className={"block ml-[32%] w-[200px] h-[300px]"}>
                        <Image src={statistic} alt={"statistic"}
                            className={"object-cover rounded-md w-[200px] h-[200px] mb-4"} quality={100}/>
                        <h4>Statistic</h4>
                        <p>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr rtsda</p>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer sticky={{start: 3, end: 4}} speed={1} className={"flex items-center"}>
                    <div className={"block ml-[52%] w-[200px] h-[300px]"}>
                        <Image src={study} alt={"study"} className={"object-cover rounded-md w-[200px] h-[200px] mb-4"}
                            quality={100}/>
                        <h4>Play</h4>
                        <p>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr rtsda</p>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer sticky={{start: 4, end: 5}} speed={1} className={"flex items-center"}>
                    <div className={"block ml-[73%] w-[200px] h-[300px]"}>
                        <Image src={study2} alt={"study"} className={"object-cover rounded-md w-[200px] h-[200px] mb-4"}
                            quality={100}/>
                        <h4>Study</h4>
                        <p>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr rtsda</p>
                    </div>
                </ParallaxLayer>
            </ Parallax>
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;