import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListadeCartas from "../component/ListadecartasSospecha";

test("el boton Enviar Sospecha solo aparece si seleccionamos monstruo y victima", async () => {
    render(<ListadeCartas />);

    const inputVictimas = screen.getAllByRole("combobox")[0];
    const inputMonstruos = screen.getAllByRole("combobox")[1];

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    userEvent.selectOptions(inputVictimas, "CONDESA");

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    userEvent.selectOptions(inputMonstruos, "DRACULA");

    expect(await screen.findByRole("button")).toBeInTheDocument();
});
