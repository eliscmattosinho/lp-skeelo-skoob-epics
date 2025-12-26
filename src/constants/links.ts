interface ContextLink {
    readonly label: string;
    readonly url: string;
    readonly className: string;
}

export const contextLinks: readonly ContextLink[] = [
    {
        label: "Skoob",
        url: "https://www.skoob.com.br/",
        className: "btn-skoob",
    },
    {
        label: "Skeelo",
        url: "https://skeelo.com/pt/",
        className: "btn-skeelo",
    },
    {
        label: "PublishNews",
        url: "https://www.publishnews.com.br/materias/2024/08/20/skeelo-completa-a-aquisicao-do-skoob-e-quer-atualizar-o-ambiente-da-rede-social",
        className: "btn-publishnews",
    },
];
