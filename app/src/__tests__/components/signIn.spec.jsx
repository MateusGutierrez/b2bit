import { render, screen, } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import "@testing-library/jest-dom"
import { SignInPage } from '../../pages/signIn';

describe('Sign In Page', () => {
  it('renders the SignInPage component', () => {
    render(<SignInPage />)
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  })
})