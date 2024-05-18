import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import { Profile } from '../../pages/profile/index';
import { UserContext } from '../../providers';


const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
});

const mockLogout = () => {
    localStorage.clear()
    mockNavigate('/')
}

describe('Logout', () => {
    it('renders the logout button', () => {
      render(<Profile />)
      expect(screen.getByRole('button', {name: 'Logout'})).toBeInTheDocument();
    })
    it('should logout and navigate to sign In page', () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ logoutUser: mockLogout }}>
                    <Profile />
                </UserContext.Provider>
            </BrowserRouter>
        );
        const logoutButton = screen.getByRole('button', {name: 'Logout'})

        fireEvent.click(logoutButton)
        
        expect(mockNavigate).toHaveBeenCalled()
    })
  })