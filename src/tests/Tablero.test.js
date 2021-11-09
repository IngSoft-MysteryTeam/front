import { screen, render } from "@testing-library/react";
import Tablero from "../component/Tablero";

test("el tablero muestra todos los casilleros", () => {
    render(<Tablero jugadores={[]} posPosibles={[]} />);

    let casilleros = screen.getAllByTestId("casillero");

    expect(casilleros).toHaveLength(20 + 20 + 18 + 18);
});

test("el tablero muestra todos los recintos", () => {
    render(<Tablero jugadores={[]} posPosibles={[]} />);

    let recintos = screen.getAllByRole("img");

    expect(recintos).toHaveLength(9); // 8 recintos y el logo de misterio en el medio
});
