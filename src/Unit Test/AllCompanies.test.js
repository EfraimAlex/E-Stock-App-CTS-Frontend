import { render,screen } from "@testing-library/react"
import AllCompanies from "../Components/AllCompanies"

test('Initial render 4',() => {
    render(<AllCompanies/>)

    screen.debug();
})