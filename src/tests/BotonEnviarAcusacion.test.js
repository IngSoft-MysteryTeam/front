import { hacerAcusacion } from "../services";
import { screen, render, fireEvent } from "@testing-library/react";
import BotonEnviarAcusacion from "../component/BotonEnviarAcusacion";

jest.mock("../services/index");

test("al clickear en enviar sospecha, se llama a la funcion hacerSospecha y setSospecha con los argumentos adecuados", () => {
    hacerAcusacion.mockResolvedValue(Promise.resolve(true));

    const setSospecha = jest.fn();

    const data = {
        victima: "CONDESA",
        monstruo: "FRANKENSTEIN",
        recinto: "BIBLIOTECA",
        id_partida: 1,
        id_jugador: 2,
    };

    render(<BotonEnviarAcusacion setSospecha={setSospecha} data={data} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(hacerAcusacion).toHaveBeenCalledWith(data);
    expect(setSospecha).toHaveBeenCalledWith(null);
});
