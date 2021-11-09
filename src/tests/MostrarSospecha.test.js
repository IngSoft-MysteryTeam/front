import { screen, render } from "@testing-library/react";
import MostrarSospecha from "../component/MostrarSospecha";

test("se muestran el nombre del jugador que sospecha y las cartas correspondientes a la misma correctamente", () => {
    const sospecha = {
        nombre: "David",
        cartas: ["ALCOBA", "COCHERA", "BIBLIOTECA"],
    };

    render(<MostrarSospecha sospecha={sospecha} />);

    expect(screen.getByText("David sospechó")).toBeInTheDocument();

    sospecha.cartas.forEach((e, i) => {
        let img = screen.getAllByRole("img")[i];
        expect(img).toHaveAttribute("src", `/cartas/${e}.png`);
    });
});
