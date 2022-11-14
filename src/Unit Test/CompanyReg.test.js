import { render,screen } from "@testing-library/react"
import CompanyReg from "../Components/CompanyReg"

test('Initial render',() => {
    render(<CompanyReg/>)

    screen.debug();
})