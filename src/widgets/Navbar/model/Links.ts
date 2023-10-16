import {Routes} from "@/shared/config/routes";

export const Links = [{
	name: "Main",
	link: Routes.MAIN,
	protected: false
}, {
	name: "Courses",
	link: Routes.COURSES,
	protected: false
}, {
	name: "Blog",
	link: Routes.BLOG,
	protected: true
}];
