//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import { css } from '@emotion/react';
import {
  Button,
  createTableColumn,
  Field,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumnDefinition,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableSelectionCell,
  Text,
  useTableFeatures,
  useTableSelection
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useTheme } from '../providers/ThemeProvider';
import { EventHandler } from '../types/Event';
import { ToDoItem } from '../types/Store';
import { today } from '../utils/Date';

interface ListItemProps {
  items?: ToDoItem[],
  onAppendItem?: EventHandler<ToDoItem>,
  onRemoveItem?: EventHandler<ToDoItem>
}

function ListPanel(props: Readonly<ListItemProps>) {

  const {
    items,
    onAppendItem,
    onRemoveItem
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();
  const form = useForm<ToDoItem>({
    defaultValues: {
      due: today()
    }
  });

  const columns: TableColumnDefinition<ToDoItem>[] = [
    createTableColumn<ToDoItem>({
      columnId: 'name'
    }),
    createTableColumn<ToDoItem>({
      columnId: 'due'
    })
  ];
  const {
    getRows,
    selection: {
      allRowsSelected,
      clearRows,
      isRowSelected,
      someRowsSelected,
      toggleAllRows,
      toggleRow
    }
  } = useTableFeatures(
    {
      columns: columns,
      items: items ?? []
    },
    [
      useTableSelection({
        selectionMode: 'multiselect'
      })
    ]
  );

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      appearance: selected ? ('brand' as const) : ('none' as const),
      selected,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      }
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [
      toggleAllRows
    ]
  );

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 4rem 1fr;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
        background-color: ${theme.colorNeutralBackground3};
      `}>
      <form
        css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 1fr auto;
            gap: 1rem;
        `}
        onSubmit={form.handleSubmit((formState) => onAppendItem?.({}, formState))}>
        <div
          css={css`
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 1fr auto;
            gap: 1rem;
            align-items: end;
            justify-content: center;
          `}>
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field label="名前">
                <Input {...field} />
              </Field>
            )} />
          <Controller
            control={form.control}
            name="due"
            render={({ field }) => (
              <Field label="期限">
                <DatePicker
                  value={field.value}
                  formatDate={(date) =>
                    date ? intl.formatDate(
                      date,
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }
                    ) : ''
                  }
                  onBlur={field.onBlur}
                  onSelectDate={(date) => field.onChange(date)} />
              </Field>
            )} />
        </div>
        <div
          css={css`
            display: flex;
            gap: 0.5rem;
            align-items: end;
            justify-content: center;
          `}>
          <Button
            appearance="primary"
            type="submit">
            追加
          </Button>
          <Button
            appearance="primary"
            disabled={!someRowsSelected}
            type="button"
            onClick={(e) => {
              rows.filter((row) => row.selected)
                .map((row) => row.item)
                .forEach((item) => onRemoveItem?.(e, item));
              clearRows(e);
            }}>
            削除
          </Button>
        </div>
      </form>
      {
        items != null && items.length > 0 ? (
          <div
            css={css`
              max-height: calc(100vh - 10rem);
              overflow-y: auto;
            `}>
            <Table
              css={css`
                background-color: ${theme.colorNeutralBackground1};
                border: 1px solid ${theme.colorNeutralStroke1};
              `}>
              <TableHeader>
                <TableRow>
                  <TableSelectionCell
                    checked={
                      (() => {
                        if (allRowsSelected) {
                          return true;
                        }
                        if (someRowsSelected) {
                          return 'mixed';
                        }
                        return false;
                      })()
                    }
                    onClick={toggleAllRows}
                    onKeyDown={toggleAllKeydown} />
                  <TableHeaderCell>名前</TableHeaderCell>
                  <TableHeaderCell>期限</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  rows.map(({ appearance, item, selected, onClick, onKeyDown }) => (
                    <TableRow
                      appearance={appearance}
                      key={item.id}>
                      <TableSelectionCell
                        checked={selected}
                        onClick={onClick}
                        onKeyDown={onKeyDown} />
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {
                          item.due ? intl.formatDate(
                            item.due,
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }) : ''
                        }</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        ) : (
          <Text>アイテムがありません。</Text>
        )
      }
    </div>
  );

}

export default React.memo(ListPanel);
