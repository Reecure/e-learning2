import React from "react";
import {screen} from "@testing-library/react";
import {ComponentRender} from "@/shared/config/test/test-utils";
import {ErrorWidget} from "@/widgets/ErrorWidget";


describe("Error Widget", () => {
    test("renders Error Widget", () => {
        ComponentRender(<ErrorWidget/>);

        const errorWidgetComponent = screen.getByTestId("error-widget");

        expect(errorWidgetComponent).toBeInTheDocument();

        const errorText = screen.getByText("Server Error");
        expect(errorText).toBeInTheDocument();
    });
});