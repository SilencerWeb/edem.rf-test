import { fakerRU as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

function generateItems(amount) {
  return Array.from({ length: amount }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    city: faker.location.city(),
    date: faker.date.anytime(),
    types: faker.helpers.arrayElements([
      "Личные вещи",
      "Стройматериалы",
      "Техника и оборудование",
      "Мебель и бытовая техника",
      "Животные",
      "Металлопрокат",
      "Продукты питания",
      "Транспорт",
      "Сыпучие грузы",
      "Другое",
    ]),
    price: faker.number.int({ min: 500, max: 2000 }),
  }));
}

export const handlers = [
  http.get("/items", () => {
    return HttpResponse.json({
      amount: 30,
      items: generateItems(30),
    });
  }),
];
