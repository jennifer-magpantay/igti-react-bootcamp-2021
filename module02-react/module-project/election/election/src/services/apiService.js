import { get } from "./httpServices";

const BASE_URL = "  http://localhost:3001";

export async function apiGetCities() {
    const citiesData = await get(`${BASE_URL}/cities`);
    return citiesData;
}

export async function apiGetCandidates() {
    const candidatesData = await get(`${BASE_URL}/candidates`);
    return candidatesData;
}

export async function apiGetElection() {
    const electionData = await get(`${BASE_URL}/election`);
    return electionData;
}