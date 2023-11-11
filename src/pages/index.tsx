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

        <>
            <div className={"flex flex-col items-center xs:hidden"}>
                <Hero/>
                <div className={"w-[150px] h-[250px]"}>
                    <Image src={create} alt={"create"}
                        className={"object-cover rounded-md w-[150px] h-[150px] mb-4"}
                        quality={100}/>
                    <h4 className={"text-lg font-bold"}>Create</h4>
                    <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr
                        rtsda</p>
                </div>
                <div className={"w-[150px] h-[250px]"}>
                    <Image src={statistic} alt={"statistic"}
                        className={"object-cover rounded-md w-[150px] h-[150px] mb-4"}
                        quality={100}/>
                    <h4 className={"text-lg font-bold"}>Statistic</h4>
                    <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr
                        rtsda</p>
                </div>
                <div className={"w-[150px] h-[250px]"}>
                    <Image src={study} alt={"study"}
                        className={"object-cover rounded-md w-[150px] h-[150px] mb-4"}
                        quality={100}/>
                    <h4 className={"text-lg font-bold"}>Play</h4>
                    <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr
                        rtsda</p>
                </div>
                <div className={"w-[150px] h-[250px]"}>
                    <Image src={study2} alt={"study"}
                        className={"object-cover rounded-md w-[150px]  h-[150px] mb-4"}
                        quality={100}/>
                    <h4 className={"text-lg font-bold"}>Study</h4>
                    <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba fadyr
                        rtsda</p>
                </div>
            </div>
            <div className={"hidden xs:block bg-light-background dark:bg-dark-background"}>
                <Parallax pages={5} className={"bg-light-background dark:bg-dark-background"}>
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
                        <div
                            className={"relative -top-40 ml-[5%] xs:ml-[10%] sm:ml-[8%] md:ml-[13%] md:w-[180px] lg:top-0 lg:ml-[13%] xl:ml-[15%] xl:w-[200px] w-[150px] h-[250px]"}>
                            <Image src={create} alt={"create"}
                                className={"object-cover rounded-md w-[150px]  h-[150px] sm:h-[200px] sm:w-[200px] mb-4"}
                                quality={100}/>
                            <h4 className={"text-lg sm:text-xl font-bold"}>Create</h4>
                            <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba
                                fadyr rtsda</p>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer sticky={{start: 2, end: 4}} speed={0.8} className={"flex items-center"}>
                        <div
                            className={"relative -top-40 ml-[50%] xs:ml-[57%] sm:ml-[58%] md:ml-[60%] md:w-[180px] lg:top-0 lg:ml-[31%] xl:ml-[35%] xl:w-[200px] w-[150px] h-[250px]"}>
                            <Image src={statistic} alt={"statistic"}
                                className={"object-cover rounded-md  w-[150px]  h-[150px] sm:h-[200px] sm:w-[200px] mb-4"}
                                quality={100}/>
                            <h4 className={"text-lg sm:text-xl font-bold"}>Statistic</h4>
                            <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba
                                fadyr rtsda</p>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer sticky={{start: 3, end: 4}} speed={1} className={"flex items-center"}>
                        <div
                            className={"relative top-40 ml-[5%] xs:ml-[10%] sm:ml-[8%] md:ml-[13%] md:w-[180px] lg:top-0 lg:ml-[49%] xl:ml-[55%] xl:w-[200px] w-[150px] h-[250px]"}>
                            <Image src={study} alt={"study"}
                                className={"object-cover rounded-md  w-[150px] h-[150px] sm:h-[200px] sm:w-[200px]  mb-4"}
                                quality={100}/>
                            <h4 className={"text-lg sm:text-xl font-bold"}>Play</h4>
                            <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba
                                fadyr rtsda</p>
                        </div>
                    </ParallaxLayer>

                    <ParallaxLayer sticky={{start: 4, end: 5}} speed={1} className={"flex items-center"}>
                        <div
                            className={"relative top-40 ml-[50%] xs:ml-[57%] sm:ml-[58%] md:ml-[60%] md:w-[180px] lg:top-0 lg:ml-[67%] xl:ml-[75%] xl:w-[200px] w-[150px] h-[250px]"}>
                            <Image src={study2} alt={"study"}
                                className={"object-cover rounded-md  w-[150px]  h-[150px] sm:h-[200px] sm:w-[200px] mb-4"}
                                quality={100}/>
                            <h4 className={"text-lg sm:text-xl font-bold"}>Study</h4>
                            <p className={"text-sm"}>Create your own project with our tools.And lorem ipsum sdkfj asriba
                                fadyr rtsda</p>
                        </div>
                    </ParallaxLayer>
                </ Parallax>
            </div>
        </>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;