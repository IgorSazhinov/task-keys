import React, { useState, useEffect } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [sorting, setSorting] = useState<'ASC' | 'DESC'>(props.sorting);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');
    const handleStartEditing = (id: number, name: string) => {
        setEditingId(id);
        setEditValue(name);
    };

    const sortedItems = [...items].sort((a, b) => {
        return sorting === 'DESC' ? a.id - b.id : b.id - a.id;
    });

    const toggleSorting = () => {
        setSorting((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    };

    const handleSave = (id: number) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, name: editValue } : item,
            ),
        );
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
        if (e.key === 'Enter') {
            handleSave(id);
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    useEffect(() => {
        toggleSorting();
        setItems(sortedItems);
    }, [props.sorting]);

    return (
        <div>
            <ul>
                {sortedItems.map((item) => (
                    <li key={item.id}>
                        {editingId === item.id ? (
                            <input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                    handleKeyDown(e, item.id);
                                }}
                                autoFocus
                            />
                        ) : (
                            <span
                                onClick={() =>
                                    handleStartEditing(item.id, item.name)
                                }
                            >
                                {item.name}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
