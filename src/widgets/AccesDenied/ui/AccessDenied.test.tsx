import React from "react";
import {screen} from "@testing-library/react";
import {ComponentRender} from "@/shared/config/test/test-utils";
import AccessDenied from "./AccesDenied";


describe("Access denied", () => {
    test("renders Access denied", () => {
        ComponentRender(<AccessDenied/>);

        const accessDeniedComponent = screen.getByTestId("access-denied");

        expect(accessDeniedComponent).toBeInTheDocument();

        const text = screen.getByText("Access denied");
        expect(text).toBeInTheDocument();
    });
});