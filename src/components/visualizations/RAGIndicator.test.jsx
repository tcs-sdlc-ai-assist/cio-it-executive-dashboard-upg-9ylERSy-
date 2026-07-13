import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RAGIndicator } from './RAGIndicator';

describe('RAGIndicator', () => {
  describe('rendering with each status', () => {
    it('renders green status with default label "On Track"', () => {
      render(<RAGIndicator status="green" />);

      const indicator = screen.getByRole('status');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveAttribute('aria-label', 'On Track');
      expect(screen.getByText('On Track')).toBeInTheDocument();
    });

    it('renders amber status with default label "Needs Attention"', () => {
      render(<RAGIndicator status="amber" />);

      const indicator = screen.getByRole('status');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveAttribute('aria-label', 'Needs Attention');
      expect(screen.getByText('Needs Attention')).toBeInTheDocument();
    });

    it('renders red status with default label "At Risk"', () => {
      render(<RAGIndicator status="red" />);

      const indicator = screen.getByRole('status');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveAttribute('aria-label', 'At Risk');
      expect(screen.getByText('At Risk')).toBeInTheDocument();
    });
  });

  describe('accessible labels', () => {
    it('uses custom label for aria-label when provided', () => {
      render(<RAGIndicator status="green" label="All Systems Go" />);

      const indicator = screen.getByRole('status');
      expect(indicator).toHaveAttribute('aria-label', 'All Systems Go');
      expect(screen.getByText('All Systems Go')).toBeInTheDocument();
    });

    it('provides sr-only text when showLabel is false', () => {
      render(<RAGIndicator status="red" showLabel={false} />);

      const indicator = screen.getByRole('status');
      expect(indicator).toHaveAttribute('aria-label', 'At Risk');

      const srOnly = indicator.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent('At Risk');
    });

    it('has role="status" for assistive technology', () => {
      render(<RAGIndicator status="amber" />);

      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('icon rendering', () => {
    it('renders check icon for green status', () => {
      render(<RAGIndicator status="green" showIcon />);

      const indicator = screen.getByRole('status');
      const iconElements = indicator.querySelectorAll('[aria-hidden="true"]');
      const icons = Array.from(iconElements).map((el) => el.textContent);
      expect(icons).toContain('✓');
    });

    it('renders warning icon for amber status', () => {
      render(<RAGIndicator status="amber" showIcon />);

      const indicator = screen.getByRole('status');
      const iconElements = indicator.querySelectorAll('[aria-hidden="true"]');
      const icons = Array.from(iconElements).map((el) => el.textContent);
      expect(icons).toContain('⚠');
    });

    it('renders cross icon for red status', () => {
      render(<RAGIndicator status="red" showIcon />);

      const indicator = screen.getByRole('status');
      const iconElements = indicator.querySelectorAll('[aria-hidden="true"]');
      const icons = Array.from(iconElements).map((el) => el.textContent);
      expect(icons).toContain('✕');
    });

    it('does not render icon when showIcon is false', () => {
      render(<RAGIndicator status="green" showIcon={false} />);

      const indicator = screen.getByRole('status');
      const iconElements = indicator.querySelectorAll('[aria-hidden="true"]');
      const icons = Array.from(iconElements).map((el) => el.textContent);
      expect(icons).not.toContain('✓');
    });
  });

  describe('non-colour indicators', () => {
    it('renders coloured dot when showDot is true', () => {
      render(<RAGIndicator status="green" showDot />);

      const indicator = screen.getByRole('status');
      const dot = indicator.querySelector('.rounded-full.bg-success');
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not render dot when showDot is false', () => {
      render(<RAGIndicator status="green" showDot={false} />);

      const indicator = screen.getByRole('status');
      const dot = indicator.querySelector('.rounded-full.bg-success');
      expect(dot).not.toBeInTheDocument();
    });

    it('renders text label alongside icon for non-colour-only indication', () => {
      render(<RAGIndicator status="red" showIcon showDot showLabel />);

      const indicator = screen.getByRole('status');
      expect(screen.getByText('At Risk')).toBeInTheDocument();

      const iconElements = indicator.querySelectorAll('[aria-hidden="true"]');
      const icons = Array.from(iconElements).map((el) => el.textContent);
      expect(icons).toContain('✕');
    });

    it('icons are marked aria-hidden to avoid redundancy with text label', () => {
      render(<RAGIndicator status="amber" showIcon showDot showLabel />);

      const indicator = screen.getByRole('status');
      const ariaHiddenElements = indicator.querySelectorAll('[aria-hidden="true"]');
      expect(ariaHiddenElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('size variants', () => {
    it('renders with sm size classes', () => {
      render(<RAGIndicator status="green" size="sm" />);

      const indicator = screen.getByRole('status');
      expect(indicator.className).toContain('px-2');
      expect(indicator.className).toContain('text-xs');
    });

    it('renders with md size classes', () => {
      render(<RAGIndicator status="green" size="md" />);

      const indicator = screen.getByRole('status');
      expect(indicator.className).toContain('px-2.5');
      expect(indicator.className).toContain('text-sm');
    });

    it('renders with lg size classes', () => {
      render(<RAGIndicator status="green" size="lg" />);

      const indicator = screen.getByRole('status');
      expect(indicator.className).toContain('px-3');
      expect(indicator.className).toContain('text-base');
    });
  });

  describe('edge cases', () => {
    it('defaults to green status when no status is provided', () => {
      render(<RAGIndicator />);

      const indicator = screen.getByRole('status');
      expect(indicator).toHaveAttribute('aria-label', 'On Track');
    });

    it('falls back to green when invalid status is provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<RAGIndicator status="invalid" />);

      const indicator = screen.getByRole('status');
      expect(indicator).toHaveAttribute('aria-label', 'On Track');

      consoleSpy.mockRestore();
    });

    it('falls back to md when invalid size is provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<RAGIndicator status="green" size="xl" />);

      const indicator = screen.getByRole('status');
      expect(indicator.className).toContain('px-2.5');

      consoleSpy.mockRestore();
    });

    it('applies additional className when provided', () => {
      render(<RAGIndicator status="green" className="custom-class" />);

      const indicator = screen.getByRole('status');
      expect(indicator.className).toContain('custom-class');
    });
  });
});