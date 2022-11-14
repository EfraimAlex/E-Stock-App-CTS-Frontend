import { render,screen } from "@testing-library/react"
import Login from "../Components/Login";

test('Initial render 5',() => {
    render(<Login/>)

    screen.debug();
})