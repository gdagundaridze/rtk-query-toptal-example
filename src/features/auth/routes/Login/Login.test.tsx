import { act, render, screen } from '@testing-library/react';
import React from 'react';
import Login from './Login';

describe('Route/Login', () => {
  it('should have oauth link', () => {
    act(() => {
      render(<Login />);
    });

    const githubLoginLink = screen.getByRole('link', { name: /login/i});
    expect(githubLoginLink).toBeDefined();
    expect(githubLoginLink.getAttribute('href')).toMatch(/(?=.*?\bgithub\b)(?=.*?\boauth\b)(?=(.*?\bclient_id\b))^.*$/);
  });
});
