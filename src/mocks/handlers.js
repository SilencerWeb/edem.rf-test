import { http, delay, HttpResponse } from "msw";
import { fakerRU as faker } from "@faker-js/faker";

function generateItems(amount) {
  return Array.from({ length: amount }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
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

let currentCount = 0;
export const handlers = [
  http.get("/items", async ({ request }) => {
    const url = new URL(request.url);
    const amount = currentCount === 100 ? 3 : +url.searchParams.get("amount");

    if (amount === 30) currentCount = 0;
    currentCount += amount;

    await delay(1500);

    return HttpResponse.json({
      items: generateItems(amount),
      count: 103,
    });
  }),
];
