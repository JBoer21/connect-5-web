import { json } from "@remix-run/node";
import { Data } from "~/types/player2Types";
import data from "~/data/players2.json";

export function setGame() {
  const typedData: Data = data.solutions as Data;
  console.log(typedData);
}
