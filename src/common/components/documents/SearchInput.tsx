'use client';

import { SearchIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { useSearchParam } from '@/common/hooks';

const SearchInput: React.FC = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    setSearch('');
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className="relative w-full max-w-[720px]">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="搜寻文档"
          className="h-[48px] w-full rounded-full border-none bg-[#F0F4F8] px-14 shadow-md placeholder:text-neutral-800 focus-visible:ring-0 md:text-base"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full [&_svg]:size-5"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
