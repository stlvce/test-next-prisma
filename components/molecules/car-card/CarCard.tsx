import styles from "./styles.module.scss";
import { ICar } from "@/types";

export default function CarCard({
  id,
  name,
  price,
  description,
  technical_characteristics,
}: ICar) {
  return (
    <div className={styles.card}>
      <p>ID: {id}</p>
      <p>Название: {name}</p>
      <p>Описание: {description}</p>
      <p>Год выпуска: {technical_characteristics?.productionYear ?? "-"}</p>
      <p>Пробег: {technical_characteristics?.mileage}</p>
      <p>Цена: {price}</p>
      <p>Марка: {technical_characteristics?.brand ?? "-"}</p>
      <p>Модель: {technical_characteristics?.model ?? "-"}</p>
    </div>
  );
}
