'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/common/components/ui/button';
import { Calendar } from '@/common/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/common/components/ui/popover';
import { cn } from '@/common/utils';

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className,
  placeholder = '选择日期',
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        size="lg"
        className={cn(
          'w-full justify-start px-3 text-left font-normal',
          !value && 'text-muted-foreground',
          className
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, 'PPP') : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={value}
        onSelect={(date) => onChange(date as Date)}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

export default DatePicker;
