import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login' // Đảm bảo đường dẫn này đúng với cấu trúc dự án của bạn

describe('Login Form Validation', () => {
  test('Username is required (T1)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: '' } }) // Simulate empty username
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' })) // Using getByRole to target the button

    // Adjust the query to be more specific and avoid multiple matches
    const errorMessage = screen.getByText(/Username is required \(T1\)/i) // Using regex for case insensitivity

    expect(errorMessage).toBeInTheDocument()
  });

  test('Special characters are not allowed in the username (T2)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user@name' } }); // Simulate invalid username
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' })); // Submit the form

    // Adjust the query to be more flexible to account for potential variations
    const errorMessage = screen.getByText(/Special characters are not allowed \(T2\)/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('shows error message for disallowed characters in username (T3)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'username@123' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      const errorMessage = screen.getByText(/Special characters are not allowed \(T2\)/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });


  test('The first character cannot be a space (T3.1)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: ' username' } })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('First character cannot be a space (T3.1)')).toBeInTheDocument()
  })

  test('Password is required (T4)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(screen.getByText('Password is required (T4)')).toBeInTheDocument()
  })

  test('Password must contain at least one special character (T5)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(
      screen.getByText('Password must contain at least one special character (T5)'),
    ).toBeInTheDocument()
  })

  test('Password must contain at least one number (T6)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Password must contain at least one number (T6)')).toBeInTheDocument()
  })

  test('Password must contain at least one uppercase letter (T7)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(
      screen.getByText('Password must contain at least one uppercase letter (T7)'),
    ).toBeInTheDocument()
  })

  test('Password must be at least 8 characters long (T8)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pass1!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Password must be at least 8 characters long (T8)')).toBeInTheDocument()
  })

  test('The first character of the password cannot be a space (T9)', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: ' Password1!' } })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('First character cannot be a space (T9)')).toBeInTheDocument()
  })
})
