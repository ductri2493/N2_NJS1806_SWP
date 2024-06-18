import React from 'react'
import { render, screen, fireEvent, waitFor, prettyDOM } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login' 

describe('Login Form Validation', () => {
  it('shows error message when username field is empty (T1)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Submit the form without entering username
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      // Adjust the query to be more specific and avoid multiple matches
      const errorMessage = screen.getByText(/Username is required/i)

      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('shows error message for disallowed characters in username (T2)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Modify the username field to contain special characters
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user@name' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      // Adjust the query to be more specific and avoid multiple matches
      const errorMessage = screen.getByText(/Special characters are not allowed/i)

      expect(errorMessage).toBeInTheDocument()
    })
  })

  test('shows error message for disallowed characters in username (T3)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    // Simulate entering a username with disallowed characters
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'user@name' },
    });
  
    // Wait for the Login button to appear and then click it
    const loginButton = await waitFor(() => screen.getByRole('button', { name: 'Login' }));
    fireEvent.click(loginButton);
  
    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText(/Special characters are not allowed/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
  

  test('shows error message when username starts with a space (T3.1)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    // Simulate entering a username that starts with a space
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, {
      target: { value: ' username' },
    });
  
    // Debugging: Log the input element
    console.log(prettyDOM(usernameInput));
  
    // Find the Login button and click it
    const loginButton = await waitFor(() => screen.getByRole('button', { name: /login/i }));
    
    // Debugging: Log the login button element
    console.log(prettyDOM(loginButton));
  
    fireEvent.click(loginButton);
  
    // Debugging: Log the document body after click
    console.log(prettyDOM(document.body));
  
    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        return content.includes('first character') && content.includes('cannot be a space');
      });
      expect(errorMessage).toBeInTheDocument();
    });
  
    // Debugging: Log the error message element
    const errorMessageElement = screen.getByText((content, element) => {
      return content.includes('first character') && content.includes('cannot be a space');
    });
    console.log(prettyDOM(errorMessageElement));
  });
  

  it('shows error message when password field is empty (T4)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Simulate valid username and empty password field
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        // Use content.includes() to match partial text
        return content.includes('Password is required')
      })

      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('shows error message when password does not contain at least one special character (T5)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Simulate valid username and invalid password without a special character
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password1' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        // Use content.includes() to match partial text
        return content.includes('Password must contain at least one special character')
      })

      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('shows error message when password does not contain at least one number (T6)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Simulate valid username and invalid password without a number
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password!' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        // Use content.includes() to match partial text
        return content.includes('Password must contain at least one number')
      })

      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('shows error message when password does not contain at least one uppercase letter (T7)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Simulate valid username and invalid password without an uppercase letter
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1!' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        // Use content.includes() to match partial text
        return content.includes('Password must contain at least one uppercase letter')
      })

      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('shows error message when password is less than 8 characters (T8)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Simulate valid username and invalid short password
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Pass1!' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        // Use content.includes() to match partial text
        return content.includes('Password must be at least 8 characters long')
      })

      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('shows error message when the first character of the password is a space (T9)', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    // Simulate valid username and invalid password with leading space
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'validusername' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: ' Password1!' } })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    // Wait for the error message to appear
    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        // Use content.includes() to match partial text
        return content.includes('The first character of the password cannot be a space')
      })

      expect(errorMessage).toBeInTheDocument()
    })
  })
})
