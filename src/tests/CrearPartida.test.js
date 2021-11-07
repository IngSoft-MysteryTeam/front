import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreaPartida from "../component/CrearPartida";
import { nuevaPartida, obtNombrejugador } from "../services/index";

jest.mock("../services/index");

test("el campo nombre es requerido", () => {
    render(<CreaPartida />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("required");
});

test("al ingresar un nombre y hacer click en Crear, se llama la funcion nuevaPartida", () => {
    nuevaPartida.mockResolvedValue(Promise.resolve(true));

    render(<CreaPartida />);

    const button = screen.getByRole("button");

    const input = screen.getByRole("textbox");

    obtNombrejugador.mockImplementation(() => "David");

    userEvent.type(input, "test");

    fireEvent.click(button);

    expect(nuevaPartida).toHaveBeenCalledWith({
        nombre: "test",
        anfitrion: "David",
    });
});
