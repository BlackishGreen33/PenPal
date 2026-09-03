'use client';

import { DayPicker } from '@daypicker/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { buttonVariants } from '@/common/components/ui/button';
import { cn } from '@/common/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('relative p-3', className)}
      classNames={{
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'space-y-4',
        month_caption: 'flex items-center justify-center pt-1',
        caption_label: 'text-sm font-medium',
        nav: 'absolute inset-x-3 top-3 flex items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'mt-2 flex w-full',
        day: 'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal'
        ),
        range_start: 'day-range-start [&.day-range-start>button]:rounded-l-md',
        range_end: 'day-range-end [&.day-range-end>button]:rounded-r-md',
        selected:
          '[&:not(.day-range-middle):not(.day-outside)>button]:bg-primary [&:not(.day-range-middle):not(.day-outside)>button]:text-primary-foreground [&:not(.day-range-middle):not(.day-outside)>button:hover]:bg-primary [&:not(.day-range-middle):not(.day-outside)>button:hover]:text-primary-foreground [&:not(.day-range-middle):not(.day-outside)>button:focus]:bg-primary [&:not(.day-range-middle):not(.day-outside)>button:focus]:text-primary-foreground',
        today:
          '[&:not([data-selected=true])>button]:bg-accent [&:not([data-selected=true])>button]:text-accent-foreground',
        outside:
          'day-outside [&>button]:text-muted-foreground [&[data-selected=true]>button]:bg-accent/50 [&[data-selected=true]>button]:text-muted-foreground',
        disabled: '[&>button]:text-muted-foreground [&>button]:opacity-50',
        range_middle:
          'day-range-middle [&.day-range-middle>button]:rounded-none [&.day-range-middle>button]:bg-accent [&.day-range-middle>button]:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
