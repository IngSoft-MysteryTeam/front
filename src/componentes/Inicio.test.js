import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { nuevoJugador, traerPartidas } from '../services/index';

jest.mock('../services/index')

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