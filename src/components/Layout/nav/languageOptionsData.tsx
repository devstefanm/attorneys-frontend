import usFlag from '../../../assets/icons/flags/us-flag.svg';
import rsFlag from '../../../assets/icons/flags/rs-flag.svg';

interface ILanguageOption {
  id: number;
  displayName: string;
  name: string;
  icon: JSX.Element;
}

export const languageOptionsData: ILanguageOption[] = [
  {
    id: 1,
    displayName: 'English',
    name: 'us',
    icon: <img className="rounded" src={usFlag} />,
  },
  {
    id: 2,
    displayName: 'Srpski',
    name: 'sr-RS',
    icon: <img className="rounded" src={rsFlag} />,
  },
];
