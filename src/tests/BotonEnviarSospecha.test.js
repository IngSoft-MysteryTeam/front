import { hacerSospecha } from "../services";
import { screen, render, fireEvent } from "@testing-library/react";
import BotonEnviarsospecha from "../component/BotonEnviarsospecha";

jest.mock("../services/index");

test("al clickear en enviar sospecha, se llama a la funcion hacerSospecha con los argumentos adecuados", () => {
    hacerSospecha.mockResolvedValue(Promise.resolve(true));

    const sospechando = jest.fn();

    const data = {
        victima: "CONDESA",
        monstruo: "FRANKENSTEIN",
        id_partida: 1,
        id_jugador: 2,
    };

    render(<BotonEnviarsospecha sospechando={sospechando} data={data} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(hacerSospecha).toHaveBeenCalledWith(data);
});
