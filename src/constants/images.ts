interface ContextImage {
  readonly src: string;
  readonly className: string;
  readonly alt: string;
}

import skoobLogo from "@/assets/img/skoob/skoob-logo.svg";
import skeeloLogo from "@/assets/img/skeelo/skeelo-logo.svg";
import pokemonSurprise from "@/assets/img/pokemon-surprise.jpg";

export const contextImages: readonly ContextImage[] = [
  {
    src: skoobLogo,
    className: "skoob",
    alt: "Logotipo do Skoob: ilustração de uma coruja azul segurando um livro em um fundo branco.",
  },
  {
    src: skeeloLogo,
    className: "skeelo",
    alt: "Logotipo do Skeelo: ilustração de perfil lateral de um esquilo em um fundo verde.",
  },
  {
    src: pokemonSurprise,
    className: "pokemon",
    alt: "Imagem de Pokémon Surprise.",
  },
];
