import { FunctionComponent, ReactNode } from "react";

export interface Column<T> {
    id: string;
    header: string;
    className?: string;
    cell: (row: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
}

function DataTable<T>({ columns, data, emptyMessage = "No data available" }: DataTableProps<T>) {
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <i className="fa-solid fa-inbox text-2xl text-slate-400" />
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 ${column.className || ""}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="transition-colors hover:bg-slate-50"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.id}
                                        className={`px-6 py-4 text-sm ${column.className || ""}`}
                                    >
                                        {column.cell(row, rowIndex)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable ;
