import { useAppSelector } from '@/lib/hooks';
import { getTranslation, Language } from '@/lib/translations';

export const useTranslations = () => {
  const { currentLanguage } = useAppSelector(state => state.language);

  const t = (key: string): string => {
    return getTranslation(currentLanguage as Language, key);
  };

  return { t, currentLanguage: currentLanguage as Language };
};
