import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListadeCartas from "../component/ListadecartasAcusacion";

test("el boton Enviar Sospecha solo aparece si seleccionamos monstruo y victima", async () => {
    render(<ListadeCartas />);

    const inputVictimas = screen.getAllByRole("combobox")[0];
    const inputMonstruos = screen.getAllByRole("combobox")[1];
    const inputRecintos = screen.getAllByRole("combobox")[2];

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    userEvent.selectOptions(inputVictimas, "CONDESA");

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    userEvent.selectOptions(inputMonstruos, "DRACULA");

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    userEvent.selectOptions(inputRecintos, "BIBLIOTECA")

    expect(await screen.findByRole("button")).toBeInTheDocument();
});
