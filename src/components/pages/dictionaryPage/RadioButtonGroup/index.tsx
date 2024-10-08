import { radioButtonGroupStyle } from '@components/pages/dictionaryPage/RadioButtonGroup/style.ts';

type RadioButtonGroupPropsType<T> = {
  name: string;
  list: T[];
  value: T;
  // eslint-disable-next-line no-unused-vars
  setter: (data: T) => void;
};
const RadioButtonGroup = <T extends string>({ name, list, value, setter }: RadioButtonGroupPropsType<T>) => {
  const handleClick = (data: T) => {
    setter(data);
  };

  return (
    <div className="radio-button-container" css={radioButtonGroupStyle}>
      <h5>{name}</h5>
      <div className="radio-button-area">
        {list.map((data: T) => (
          <div className="radio-button-wrapper" key={data} onClick={() => handleClick(data)}>
            <div className={`${data === value ? 'active' : ''} radio-button-checkbox`} />
            <span className="radio-button-text">{data}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
