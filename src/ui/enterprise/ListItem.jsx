import React from "react";
import { useTranslation } from "react-i18next";

export default function ListItem({ itemData }) {
  const { t } = useTranslation();
  return <li>{t(itemData)}</li>;
}
