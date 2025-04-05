import { useTranslation } from "react-i18next";

type Lng = {
  lng: string,
  toLng: string
}
export default function useLng(lng: Lng) {
  const { t, i18n } = useTranslation();
  return t(lng.lng, lng.toLng)

}
