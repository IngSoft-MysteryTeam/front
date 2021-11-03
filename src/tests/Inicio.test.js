import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';
import { nuevoJugador, traerPartidas } from '../services/index';

jest.mock('../services/index')

test('si el input está vacío, no avanza a la lista de partidas', async () => {
  render(<App />);

  let input = screen.getByRole('textbox')
    
  fireEvent.click(input)
  fireEvent.keyDown(input, {key: 'Enter'})

  await waitFor(() => expect(screen.queryByText('Unirse a una partida')).toBeNull())
})

test('al ingresar un nombre ya existente, salta una alerta', async () => {
  render(<App />)

  const alertMock = jest.spyOn(global, 'alert').mockImplementation()

  let submit = screen.getByRole('button')

  nuevoJugador.mockResolvedValue(Promise.resolve({status: 404}))

  fireEvent.click(submit);

  await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1))
})

test('el input no deja ingresar mas de 20 caracteres', async () => {
  render(<App />);
  
  let input = screen.getByRole('textbox')

  nuevoJugador.mockResolvedValue(Promise.resolve({status: 200, data: null}))
  traerPartidas.mockResolvedValue(Promise.resolve({data: []}))
  
  userEvent.type(input, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

  expect(input.value.length).toBe(20);
})

test('al ingresar un nombre válido y enviarlo, redirecciona a la lista de partidas', async () => {
  render(<App />);
  
  let input = screen.getByRole('textbox')
  let submit = screen.getByRole('button')
  
  nuevoJugador.mockResolvedValue(Promise.resolve({status: 200, data: null}))
  traerPartidas.mockResolvedValue(Promise.resolve({data: []}))
  
  fireEvent.change(input, {target: {value: 'David'}})
  fireEvent.click(submit);
  
  await waitFor(() => expect(screen.getByText('Unirse a una partida')))
})
