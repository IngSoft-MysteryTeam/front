import { screen, render, fireEvent } from "@testing-library/react";
import BotonUnirse from "../component/BotonUnirse";

test("al clickear en Unirse, se llama a la funcion Unirsepartida con los argumentos adecuados", () => {
    const partida = {
        nombre: "Test",
        anfitrion: "David",
        cantidad_jugadores: 2,
    };

    const unirse = jest.fn();

    render(<BotonUnirse partida={partida} unirse={unirse} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(unirse).toHaveBeenLastCalledWith(partida);
});
