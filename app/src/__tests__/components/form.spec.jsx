import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProfileForm from '../../packages/form/index';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UserContext } from '../../providers/index';

const mockNavigate = vi.fn();
const mockAxios = new MockAdapter(axios);

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLoginSubmit = async (data) => {
  const response = { data: { user: { is_active: true }, tokens: { access: 'token_access', refresh: 'token_refresh' } } };
  mockAxios.onPost('auth/login/').reply(200, response);

  const { user, tokens } = response.data;
  localStorage.setItem("@token_access", tokens.access);
  localStorage.setItem("@token_refresh", tokens.refresh);

  if (!user.is_active) {
    localStorage.clear();
    setTimeout(() => {
      mockNavigate('/');
    }, 2500);
  } else {
    setTimeout(() => {
      mockNavigate('/profile');
    }, 2500);
  }
};

describe('ProfileForm', () => {
  it('renders the ProfileForm component', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loginSubmit: mockLoginSubmit }}>
          <ProfileForm />
        </UserContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("****************")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it('should call navigate when submit form = 200 OK!', async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loginSubmit: mockLoginSubmit }}>
          <ProfileForm />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText("@gmail.com");
    const passwordInput = screen.getByPlaceholderText("****************");
    const submitButton = screen.getByText("Sign In");

    await userEvent.type(emailInput, 'cliente@youdrive.com');
    await userEvent.type(passwordInput, 'password');
    fireEvent.click(submitButton);


    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});
