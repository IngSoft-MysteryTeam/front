import { fireEvent, render, screen } from "@testing-library/react";
import { nuevoJugador, traerPartidas, unirJugador } from "../services/index";
import App from "../App";

jest.mock("../services/index");

test("al entrar con un nombre valido, buscar una partida, elegir color y clickear ingresar, te redirige al lobby de la partida", async () => {
    render(<App />);

    let input = screen.getByRole("textbox");
    let submit = screen.getByRole("button");

    nuevoJugador.mockResolvedValue(
        Promise.resolve({ status: 200, data: null })
    );
    traerPartidas.mockResolvedValue(
        Promise.resolve({
            data: [
                {
                    nombre: "Test",
                    anfitrion: "Santi",
                    cantidad_jugadores: 1,
                    colores: ["red"],
                },
            ],
        })
    );

    fireEvent.change(input, { target: { value: "David " } });
    fireEvent.click(submit);

    expect(await screen.findByText("Unirse a una partida")).toBeInTheDocument();

    unirJugador.mockResolvedValue(
        Promise.resolve({
            status: 200,
            data: {
                id_jugador: 2,
                id_partida: 1,
                anfitrion: "Santi",
                jugadores: [{ nombre: "Santi" }, { nombre: "David" }],
            },
        })
    );

    const unirse = await screen.findByRole("button", { name: "Unirse" });

    fireEvent.click(unirse);

    const color = screen.getByRole("radio");

    fireEvent.click(color);

    const unirse2 = screen.getAllByRole("button", { name: "Unirse" })[0];

    fireEvent.click(unirse2);

    expect(await screen.findByText("David"));
});
