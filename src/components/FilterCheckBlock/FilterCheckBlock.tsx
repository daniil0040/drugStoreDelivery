import { useSearchParamsState } from '@/hooks';
import Checkmark from '../../assets/images/checkmark.svg?react';
import { StyledFilterBlock } from './FilterCheckBlock.styled';
import { ChangeEvent } from 'react';

type Props = {
  title: string;
  data: string[];
};

export const FilterCheckBlock = ({ title, data }: Props) => {
  const [paramState, updateSearchParamsState] = useSearchParamsState(title, []);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Array.isArray(paramState) && paramState.includes(e.target.value)) {
      updateSearchParamsState(
        paramState.filter(item => item !== e.target.value),
      );
      return;
    }
    updateSearchParamsState([...paramState, e.target.value]);
  };
  return (
    <StyledFilterBlock>
      <h3 className="filtersBlockTitle">{title}</h3>
      <div className="labelsContainer">
        {data.map(item => (
          <label className="label" key={item}>
            <input
              type="checkbox"
              className="checkbox"
              value={item}
              onChange={onChange}
              checked={paramState.includes(item)}
            />
            <span className="fake">
              <Checkmark className="checkmark" />
            </span>
            <span>{item}</span>
          </label>
        ))}
      </div>
    </StyledFilterBlock>
  );
};
