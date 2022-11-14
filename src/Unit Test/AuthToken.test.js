import { render,screen } from "@testing-library/react"
import AuthToken from "../Components/AuthToken";

test('Initial render 7',() => {
    render(<AuthToken/>)

    screen.debug();
})