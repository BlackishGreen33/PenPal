import { parseAsString, useQueryState } from 'nuqs';

const useSearchParam = () => {
  return useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true })
  );
};

export default useSearchParam;
