import {type ReactElement, useState} from "react";
import { useSession} from "next-auth/react";
import AuthForm from "@/pages/auth/ui/AuthForm";
import Layout from "@/pages/layout";
import SignInForm from "@/shared/ui/Auth/SignInForm";
import SignUpForm from "@/shared/ui/Auth/SignUpForm";


enum Tabs {
    SIGNIN = "signin",
    SIGNUP= "signup"
}


function SignInPage() {

    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.SIGNIN);

    const session = useSession();

    if (session.status === "authenticated") {
        return (
            <div className={"w-full h-full flex justify-center items-center"}>
                <p className={"text-2xl"}>You are an authenticated</p>
            </div>
        );
    }

    return (
        <AuthForm>
            <div>
                <h3 className={"text-center text-2xl mb-5"}>Welcome to E-learning</h3>
                <div className={"w-[320px] shadow-inner shadow-black/40 mb-5 text-md px-3 py-2 flex justify-between bg-dark-primary-main rounded-full relative z-[1]"}>
                    <span
                        className={
                            `w-[140px] h-[52px] absolute top-[2px] ${currentTab === Tabs.SIGNIN ? "left-1" : "left-44"} rounded-full bg-light-gray dark:bg-dark-primary-container transition-all duration-700`
                        }
                    ></span>
                    <div className={"dark:text-dark-primary-hover-second w-[140px] text-center py-2 rounded-full cursor-pointer"}
                        onClick={() => setCurrentTab(Tabs.SIGNIN)}
                    >Login</div>
                    <div className={"dark:text-dark-primary-hover-second w-[140px] text-center py-2 rounded-full cursor-pointer"}
                        onClick={() => setCurrentTab(Tabs.SIGNUP)}
                    >Register</div>
                </div>
                {
                    currentTab ===Tabs.SIGNIN ?  <SignInForm /> : <SignUpForm />
                }
            </div>
        </AuthForm>
    );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default SignInPage;
