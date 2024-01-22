import "./App.css";
import DrinkList from "./bricks/DrinkList";
import Headline from "./bricks/Headline";
import "bootstrap/dist/css/bootstrap.min.css";

const drinkList = [
  {
    author: "Vlado Gurčo",
    name: "Bloody Marry",
    description:
      "Tenndus anmremainnining sker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4l23",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fdq9f3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tand scramblep publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5emb4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09y3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09n3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3fte2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd0ef3f5e2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3fae2b4324",
  },
  {
    author: "Slender Man",
    name: "Bloody Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b2324",
  },
  {
    author: "Vlado Gurčo",
    name: "Great Marry",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4322",
  },
  {
    author: "Vlado Gurčo",
    name: "Great Marradith",
    description:
      "Tento recept pochází z daléke Indieem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4321",
  },
  {
    author: "Vlado Gurčo",
    name: "Flex Marradith",
    description:
      "Tento recept pochází z daléke Indie em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4326",
  },

  {
    author: "Vlado Gurčo",
    name: "Bloody Susan",
    description:
      "Tento recept pochází od mé babičky Johanky em Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4327",
  },
  {
    author: "Vlado Gurčo",
    name: "Rainy day",
    description:
      "Tento recept pochází z daléke Andaluzieem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    id: "8fd09f3f5e2b4320",
  },
];

function App() {
  return (
    <div className="App">
      <Headline />
      <DrinkList drinkList={drinkList} />
    </div>
  );
}

export default App;
