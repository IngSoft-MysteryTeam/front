import { screen, render } from "@testing-library/react";
import ListaJugadores from "../component/ListaJugadores";

test("la lista muestra los nombres de los jugadores correctamente", () => {
    const jugadores = [
        {
            nombre: "David",
            color: "red",
        },
        {
            nombre: "Santi",
            color: "blue",
        },
        {
            nombre: "fran",
            color: "yellow",
        },
    ];

    render(<ListaJugadores jugadores={jugadores} />);

    jugadores.forEach((e) =>
        expect(screen.getByText(e.nombre)).toBeInTheDocument()
    );
});

test("la lista muestra los lugares vacios correctamente", () => {
    const jugadores = [
        {
            nombre: "David",
            color: "red",
        },
        {
            nombre: "Santi",
            color: "blue",
        },
        {
            nombre: "fran",
            color: "yellow",
        },
    ];

    render(<ListaJugadores jugadores={jugadores} />);

    expect(screen.getAllByText("Vacío")).toHaveLength(6 - jugadores.length);
});
