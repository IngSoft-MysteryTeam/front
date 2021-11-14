import { screen, render, fireEvent } from "@testing-library/react";
import Acusar from "../component/BotonAcusar";

test("al hacer click en Acusar, se llama a la funcion setAcusar con el argumento adecuado", () => {
    const acusando = jest.fn();

    render(<Acusar acusando={acusando} eligoacusar={false} />);

    const boton = screen.getByRole("button");

    fireEvent.click(boton);

    expect(acusando).toHaveBeenCalledWith(true);
});

test("cuando se está sospechando, el botón Acusar dice Cancelar sospecha", () => {
    const acusando = jest.fn();

    render(<Acusar acusando={acusando} eligoacusar={true} />);

    const boton = screen.getByRole("button");

    expect(boton).toHaveTextContent("Cancelar acusacion");
});
