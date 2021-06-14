import { get } from "./httpServices";

const URL = "http://localhost:3301/flashcards";

export async function apiGetData() {
    const cardsData = await get(URL);
    return cardsData;
}