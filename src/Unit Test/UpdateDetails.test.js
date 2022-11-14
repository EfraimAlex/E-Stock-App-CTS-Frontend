import { render,screen } from "@testing-library/react"
import UpdateDetails from "../Components/UpdateDetails";

test('Initial render 6',() => {
    render(<UpdateDetails/>)

    screen.debug();
})