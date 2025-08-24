import { addUser } from '../store/registeredUsersSlice';

it('dispatches addUser with correct payload', () => {
  const user = {
    photo: 'mock',
    name: 'Alice',
    country: 'Canada',
    age: '30',
    gender: 'Female',
    email: 'alice@test.com',
    password: 'Secret123!',
    confirmPassword: 'Secret123!',
    terms: true,
  };

  const dispatch = vi.fn();
  dispatch(addUser(user));
  expect(dispatch).toHaveBeenCalledWith(addUser(user));
});
