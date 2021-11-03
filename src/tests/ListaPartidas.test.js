import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListaPartidas from "../componentes/ListaPartidas";
import App from "../App";
import { traerPartidas, unirJugador, nuevoJugador } from "../services";

jest.mock('../services/index')
// escondo el boton crear asi no se queja de que uso <Link> fuera de un <Router>
jest.mock('../componentes/BotonCrear', () => 'a') 

test('si no hay partidas, se muestra en la tabla un mensaje indicandolo', async () => {
  traerPartidas.mockResolvedValue(Promise.resolve({data: []}))
  
  render(<ListaPartidas/>)

  await waitFor(() => expect(screen.getByText('No hay partidas')))
})

test('la tabla muestra los datos correctamente', async () => {
  traerPartidas.mockResolvedValue(Promise.resolve({data: [{
    nombre: "Test",
    anfitrion: "Santi",
    cantidad_jugadores: 3
  }]}))

  unirJugador.mockResolvedValue(Promise.resolve({status: 200, data: {
    id_jugador: 4,
    id_partida: 1,
    anfitrion: "Santi",
    jugadores: [
      {nombre: "Santi"},
      {nombre: "Fran"},
      {nombre: "Dani"},
      {Nombre: "David"}
    ]
  }}))

  render(<ListaPartidas/>)

  await waitFor(() => expect(screen.getByText('Test')))
  await waitFor(() => expect(screen.getByText('Santi')))
  await waitFor(() => expect(screen.getByText('3/6')))
})

test('al clickear ingresar, te redirige al lobby de la partida', async () => {
  render(<App />);
  
  let input = screen.getByRole('textbox')
  let submit = screen.getByRole('button')

  nuevoJugador.mockResolvedValue(Promise.resolve({status: 200, data: null}))
  traerPartidas.mockResolvedValue(Promise.resolve({data: [{
    nombre: "Test",
    anfitrion: "Santi",
    cantidad_jugadores: 1
  }]}))

  userEvent.type(input, 'David')
  userEvent.click(submit)

  unirJugador.mockResolvedValue(Promise.resolve({status: 200, data: {
    id_jugador: 2,
    id_partida: 1,
    anfitrion: "Santi",
    jugadores: [
      {nombre: "Santi"},
      {nombre: "David"}
    ]
  }}))

  const unirse = await screen.findByRole('button', {name: 'Unirse'})

  userEvent.click(unirse)

  expect(await screen.findByText('David'))
})
