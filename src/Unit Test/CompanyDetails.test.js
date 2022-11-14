import { render,screen } from "@testing-library/react"
import CompanyDetails from "../Components/CompanyDetails";

test('Initial render 2',() => {
    render(<CompanyDetails/>)

    screen.debug();
})