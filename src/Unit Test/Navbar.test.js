import { render,screen } from "@testing-library/react"
import Navbar from "../Components/Navbar";

test('Initial render 9',() => {
    render(<Navbar/>)

    screen.debug();
})