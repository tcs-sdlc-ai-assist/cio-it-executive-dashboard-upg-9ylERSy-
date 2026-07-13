import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DataTable } from './DataTable';

const mockColumns = [
  { key: 'name', label: 'Name', sortable: true, align: 'left' },
  { key: 'spend', label: 'Spend', sortable: true, align: 'right' },
  { key: 'status', label: 'Status', sortable: true, align: 'center' },
  { key: 'notes', label: 'Notes', sortable: false, align: 'left' },
];

const mockData = [
  { id: '1', name: 'Infosys', spend: 3500000, status: 'active', notes: 'Top vendor' },
  { id: '2', name: 'TCS', spend: 2800000, status: 'active', notes: 'Key partner' },
  { id: '3', name: 'Wipro', spend: 1200000, status: 'expiring', notes: 'Review needed' },
  { id: '4', name: 'AWS', spend: 1800000, status: 'active', notes: 'Cloud provider' },
  { id: '5', name: 'Oracle', spend: 1100000, status: 'expired', notes: 'Legacy system' },
];

describe('DataTable', () => {
  describe('rendering', () => {
    it('renders table with correct column headers', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Spend')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    it('renders all data rows', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByText('Infosys')).toBeInTheDocument();
      expect(screen.getByText('TCS')).toBeInTheDocument();
      expect(screen.getByText('Wipro')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
      expect(screen.getByText('Oracle')).toBeInTheDocument();
    });

    it('renders cell values as strings when no render function is provided', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByText('3500000')).toBeInTheDocument();
      expect(screen.getByText('active')).toBeInTheDocument();
      expect(screen.getByText('Top vendor')).toBeInTheDocument();
    });

    it('renders custom cell content using render function', () => {
      const columnsWithRender = [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'spend',
          label: 'Spend',
          sortable: true,
          render: (value) => `₹${(value / 1000000).toFixed(1)}M`,
        },
      ];

      render(<DataTable columns={columnsWithRender} data={mockData} />);

      expect(screen.getByText('₹3.5M')).toBeInTheDocument();
      expect(screen.getByText('₹2.8M')).toBeInTheDocument();
    });

    it('renders empty message when data is empty', () => {
      render(<DataTable columns={mockColumns} data={[]} />);

      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('renders custom empty message', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={[]}
          emptyMessage="No vendors match the selected filter."
        />
      );

      expect(screen.getByText('No vendors match the selected filter.')).toBeInTheDocument();
    });

    it('renders dash for null or undefined cell values', () => {
      const dataWithNulls = [
        { id: '1', name: 'Test', spend: null, status: undefined, notes: 'Note' },
      ];

      render(<DataTable columns={mockColumns} data={dataWithNulls} />);

      const cells = screen.getAllByRole('cell');
      const dashCells = cells.filter((cell) => cell.textContent === '—');
      expect(dashCells.length).toBe(2);
    });

    it('renders caption as sr-only when provided', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          caption="Vendor spend details"
        />
      );

      const caption = screen.getByText('Vendor spend details');
      expect(caption).toBeInTheDocument();
      expect(caption.tagName.toLowerCase()).toBe('caption');
      expect(caption.className).toContain('sr-only');
    });

    it('renders error message when columns is empty', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(<DataTable columns={[]} data={mockData} />);

      expect(screen.getByText('Table configuration error: no columns defined.')).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe('accessible table roles', () => {
    it('has role="table" on the table element', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('has role="row" on header and data rows', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const rows = screen.getAllByRole('row');
      // 1 header row + 5 data rows
      expect(rows.length).toBe(6);
    });

    it('has role="columnheader" on header cells', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const columnHeaders = screen.getAllByRole('columnheader');
      expect(columnHeaders.length).toBe(4);
    });

    it('has role="cell" on data cells', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const cells = screen.getAllByRole('cell');
      // 5 rows * 4 columns = 20 cells
      expect(cells.length).toBe(20);
    });

    it('has aria-sort="none" on sortable columns by default', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');
    });

    it('does not have aria-sort on non-sortable columns', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const notesHeader = screen.getByRole('columnheader', { name: /Notes/i });
      expect(notesHeader).not.toHaveAttribute('aria-sort');
    });

    it('sortable column headers have tabIndex 0', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      expect(nameHeader).toHaveAttribute('tabindex', '0');
    });

    it('non-sortable column headers do not have tabIndex', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const notesHeader = screen.getByRole('columnheader', { name: /Notes/i });
      expect(notesHeader).not.toHaveAttribute('tabindex');
    });
  });

  describe('column sorting', () => {
    it('sorts ascending on first click of a sortable column header', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      await user.click(nameHeader);

      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

      const rows = screen.getAllByRole('row');
      // Skip header row (index 0)
      const firstDataRow = rows[1];
      const firstCell = within(firstDataRow).getAllByRole('cell')[0];
      expect(firstCell).toHaveTextContent('AWS');
    });

    it('sorts descending on second click of the same column header', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      await user.click(nameHeader);
      await user.click(nameHeader);

      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      const firstCell = within(firstDataRow).getAllByRole('cell')[0];
      expect(firstCell).toHaveTextContent('Wipro');
    });

    it('toggles back to ascending on third click', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      await user.click(nameHeader);
      await user.click(nameHeader);
      await user.click(nameHeader);

      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('sorts numeric values correctly', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const spendHeader = screen.getByRole('columnheader', { name: /Spend/i });
      await user.click(spendHeader);

      expect(spendHeader).toHaveAttribute('aria-sort', 'ascending');

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      const spendCell = within(firstDataRow).getAllByRole('cell')[1];
      expect(spendCell).toHaveTextContent('1100000');
    });

    it('sorts numeric values descending correctly', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const spendHeader = screen.getByRole('columnheader', { name: /Spend/i });
      await user.click(spendHeader);
      await user.click(spendHeader);

      expect(spendHeader).toHaveAttribute('aria-sort', 'descending');

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      const spendCell = within(firstDataRow).getAllByRole('cell')[1];
      expect(spendCell).toHaveTextContent('3500000');
    });

    it('resets sort direction when clicking a different column', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      const spendHeader = screen.getByRole('columnheader', { name: /Spend/i });

      await user.click(nameHeader);
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

      await user.click(spendHeader);
      expect(spendHeader).toHaveAttribute('aria-sort', 'ascending');
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');
    });

    it('does not sort when clicking a non-sortable column', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const notesHeader = screen.getByRole('columnheader', { name: /Notes/i });
      await user.click(notesHeader);

      expect(notesHeader).not.toHaveAttribute('aria-sort');

      // Data order should remain unchanged
      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      const firstCell = within(firstDataRow).getAllByRole('cell')[0];
      expect(firstCell).toHaveTextContent('Infosys');
    });

    it('applies default sort key and direction on initial render', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          defaultSortKey="spend"
          defaultSortDirection="desc"
        />
      );

      const spendHeader = screen.getByRole('columnheader', { name: /Spend/i });
      expect(spendHeader).toHaveAttribute('aria-sort', 'descending');

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      const spendCell = within(firstDataRow).getAllByRole('cell')[1];
      expect(spendCell).toHaveTextContent('3500000');
    });
  });

  describe('keyboard navigation', () => {
    it('sorts column when Enter key is pressed on sortable header', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      nameHeader.focus();
      await user.keyboard('{Enter}');

      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      const firstCell = within(firstDataRow).getAllByRole('cell')[0];
      expect(firstCell).toHaveTextContent('AWS');
    });

    it('sorts column when Space key is pressed on sortable header', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const spendHeader = screen.getByRole('columnheader', { name: /Spend/i });
      spendHeader.focus();
      await user.keyboard(' ');

      expect(spendHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('does not sort when Enter is pressed on non-sortable header', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const notesHeader = screen.getByRole('columnheader', { name: /Notes/i });
      notesHeader.focus();
      await user.keyboard('{Enter}');

      expect(notesHeader).not.toHaveAttribute('aria-sort');
    });

    it('calls onRowClick when Enter is pressed on a clickable row', async () => {
      const user = userEvent.setup();
      const handleRowClick = vi.fn();

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          onRowClick={handleRowClick}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      firstDataRow.focus();
      await user.keyboard('{Enter}');

      expect(handleRowClick).toHaveBeenCalledTimes(1);
      expect(handleRowClick).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Infosys' }),
        0
      );
    });

    it('calls onRowClick when Space is pressed on a clickable row', async () => {
      const user = userEvent.setup();
      const handleRowClick = vi.fn();

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          onRowClick={handleRowClick}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      const firstDataRow = rows[1];
      firstDataRow.focus();
      await user.keyboard(' ');

      expect(handleRowClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('row interaction', () => {
    it('calls onRowClick when a row is clicked', async () => {
      const user = userEvent.setup();
      const handleRowClick = vi.fn();

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          onRowClick={handleRowClick}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      const secondDataRow = rows[2];
      await user.click(secondDataRow);

      expect(handleRowClick).toHaveBeenCalledTimes(1);
      expect(handleRowClick).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'TCS' }),
        1
      );
    });

    it('clickable rows have tabIndex 0', () => {
      const handleRowClick = vi.fn();

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          onRowClick={handleRowClick}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      // Data rows should have tabIndex
      for (let i = 1; i <= 5; i++) {
        expect(rows[i]).toHaveAttribute('tabindex', '0');
      }
    });

    it('non-clickable rows do not have tabIndex', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      for (let i = 1; i <= 5; i++) {
        expect(rows[i]).not.toHaveAttribute('tabindex');
      }
    });
  });

  describe('styling variants', () => {
    it('applies striped row styling when striped is true', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          striped
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      // Second data row (index 2, rowIndex 1) should have bg-gray-50
      expect(rows[2].className).toContain('bg-gray-50');
      // First data row (index 1, rowIndex 0) should have bg-canon-white
      expect(rows[1].className).toContain('bg-canon-white');
    });

    it('applies hover styling when hoverable is true', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          hoverable
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      expect(rows[1].className).toContain('hover:bg-gray-100');
    });

    it('does not apply hover styling when hoverable is false', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          hoverable={false}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      expect(rows[1].className).not.toContain('hover:bg-gray-100');
    });

    it('applies sm size classes', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          size="sm"
          rowKeyField="id"
        />
      );

      const cells = screen.getAllByRole('cell');
      expect(cells[0].className).toContain('text-xs');
    });

    it('applies lg size classes', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          size="lg"
          rowKeyField="id"
        />
      );

      const cells = screen.getAllByRole('cell');
      expect(cells[0].className).toContain('text-base');
    });

    it('applies additional className when provided', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          className="custom-table-class"
        />
      );

      const table = screen.getByRole('table');
      expect(table.className).toContain('custom-table-class');
    });
  });

  describe('edge cases', () => {
    it('handles data with null values during sorting', async () => {
      const user = userEvent.setup();
      const dataWithNulls = [
        { id: '1', name: 'Alpha', spend: 100 },
        { id: '2', name: null, spend: 200 },
        { id: '3', name: 'Beta', spend: null },
      ];

      const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'spend', label: 'Spend', sortable: true },
      ];

      render(<DataTable columns={columns} data={dataWithNulls} rowKeyField="id" />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      await user.click(nameHeader);

      // Should not throw, null values sorted to end
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(4); // 1 header + 3 data
    });

    it('uses rowKeyField for unique row keys when provided', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          rowKeyField="id"
        />
      );

      const rows = screen.getAllByRole('row');
      // Should render without key warnings - 1 header + 5 data rows
      expect(rows.length).toBe(6);
    });

    it('falls back to md size when invalid size is provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          size="xl"
        />
      );

      const cells = screen.getAllByRole('cell');
      expect(cells[0].className).toContain('text-sm');

      consoleSpy.mockRestore();
    });

    it('warns when data prop is not an array', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <DataTable
          columns={mockColumns}
          data="not-an-array"
        />
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[DataTable] data prop must be an array.')
      );

      consoleSpy.mockRestore();
    });

    it('renders sort indicator icons on sortable columns', () => {
      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      // Should contain the default sort icon ↕
      expect(nameHeader.textContent).toContain('↕');
    });

    it('shows ascending sort icon after sorting ascending', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      await user.click(nameHeader);

      expect(nameHeader.textContent).toContain('↑');
    });

    it('shows descending sort icon after sorting descending', async () => {
      const user = userEvent.setup();

      render(<DataTable columns={mockColumns} data={mockData} />);

      const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
      await user.click(nameHeader);
      await user.click(nameHeader);

      expect(nameHeader.textContent).toContain('↓');
    });
  });
});