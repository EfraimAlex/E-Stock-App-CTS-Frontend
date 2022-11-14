import { render,screen } from "@testing-library/react"
import SignUp from "../Components/SignUp"

test('Initial render 3',() => {
    render(<SignUp/>)

    screen.debug();
})