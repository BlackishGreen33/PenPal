import { memo } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';

interface UserTypeSelectorParams {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  onClickHandler?: (value: string) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorParams> = memo(
  ({ userType, setUserType, onClickHandler }) => {
    const accessChangeHandler = (type: UserType) => {
      setUserType(type);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onClickHandler && onClickHandler(type);
    };

    return (
      <Select
        value={userType}
        onValueChange={(type: UserType) => accessChangeHandler(type)}
      >
        <SelectTrigger className="shad-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-none bg-dark-200">
          <SelectItem value="viewer" className="shad-select-item">
            can view
          </SelectItem>
          <SelectItem value="editor" className="shad-select-item">
            can edit
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }
);

export default UserTypeSelector;
