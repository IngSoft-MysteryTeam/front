import { screen, render, fireEvent } from "@testing-library/react";
import Sospechar from "../component/BotonSospechar";

test("al hacer click en Sospechar, se llama a la funcion setSospechar con el argumento adecuado", () => {
    const setSospechar = jest.fn();

    render(<Sospechar sospechando={setSospechar} eligosospechar={false} />);

    const boton = screen.getByRole("button");

    fireEvent.click(boton);

    expect(setSospechar).toHaveBeenCalledWith(true);
});
